import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/redis/redis.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
export interface TokenPayload {
    sub: string;
    email: string;
}
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}
export declare class AuthService {
    private readonly usersService;
    private jwtService;
    private configService;
    private redisService;
    private readonly accessExpirySeconds;
    private readonly refreshExpirySeconds;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService, redisService: RedisService);
    private parseExpiryToSeconds;
    signIn(signInDto: SignInDto): Promise<AuthTokens>;
    signUp(signUpDto: SignUpDto): Promise<AuthTokens>;
    logout(userId: string): Promise<void>;
    getProfile(userId: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
    }>;
    generateTokens(payload: TokenPayload): Promise<AuthTokens>;
    refreshTokens(refreshToken: string): Promise<AuthTokens>;
    revokeRefreshToken(refreshToken: string): Promise<void>;
}
