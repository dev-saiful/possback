"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const argon2 = __importStar(require("argon2"));
const uuid_1 = require("uuid");
const config_1 = require("@nestjs/config");
const redis_service_1 = require("../redis/redis.service");
let AuthService = class AuthService {
    usersService;
    jwtService;
    configService;
    redisService;
    accessExpirySeconds;
    refreshExpirySeconds;
    constructor(usersService, jwtService, configService, redisService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.redisService = redisService;
        const accessExpiry = this.configService.get('JWT_ACCESS_EXPIRY') || '15m';
        this.accessExpirySeconds = this.parseExpiryToSeconds(accessExpiry);
        const refreshExpiry = this.configService.get('JWT_REFRESH_EXPIRY') || '7d';
        this.refreshExpirySeconds = this.parseExpiryToSeconds(refreshExpiry);
    }
    parseExpiryToSeconds(expiry) {
        const match = expiry.match(/^(\d+)([smhd])$/);
        if (!match)
            return 7 * 24 * 60 * 60;
        const value = parseInt(match[1], 10);
        const unit = match[2];
        switch (unit) {
            case 's':
                return value;
            case 'm':
                return value * 60;
            case 'h':
                return value * 60 * 60;
            case 'd':
                return value * 24 * 60 * 60;
            default:
                return 7 * 24 * 60 * 60;
        }
    }
    async signIn(signInDto) {
        const user = await this.usersService.findOne(signInDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const checkPassword = await argon2.verify(user.password, signInDto.password);
        if (!checkPassword) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, email: user.email };
        return this.generateTokens(payload);
    }
    async signUp(signUpDto) {
        const existingUser = await this.usersService.findOne(signUpDto.email);
        if (existingUser) {
            throw new common_1.ConflictException('User already exists');
        }
        const hashedPassword = await argon2.hash(signUpDto.password);
        const user = await this.usersService.create({
            email: signUpDto.email,
            name: signUpDto.name,
            password: hashedPassword,
        });
        const payload = { sub: user.id, email: user.email };
        return this.generateTokens(payload);
    }
    async logout(userId) {
    }
    async getProfile(userId) {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
        };
    }
    async generateTokens(payload) {
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: this.accessExpirySeconds,
        });
        const refreshToken = (0, uuid_1.v4)();
        const redisKey = `refresh:${refreshToken}`;
        await this.redisService.set(redisKey, JSON.stringify({ userId: payload.sub, email: payload.email }), this.refreshExpirySeconds);
        return { accessToken, refreshToken };
    }
    async refreshTokens(refreshToken) {
        const redisKey = `refresh:${refreshToken}`;
        const storedData = await this.redisService.get(redisKey);
        if (!storedData) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        await this.redisService.del(redisKey);
        const { userId, email } = JSON.parse(storedData);
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return this.generateTokens({ sub: userId, email });
    }
    async revokeRefreshToken(refreshToken) {
        const redisKey = `refresh:${refreshToken}`;
        await this.redisService.del(redisKey);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService,
        redis_service_1.RedisService])
], AuthService);
//# sourceMappingURL=auth.service.js.map