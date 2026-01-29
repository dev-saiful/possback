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
var SchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const http = __importStar(require("http"));
const https = __importStar(require("https"));
let SchedulerService = SchedulerService_1 = class SchedulerService {
    configService;
    logger = new common_1.Logger(SchedulerService_1.name);
    intervals = [];
    constructor(configService) {
        this.configService = configService;
    }
    onModuleInit() {
        const enabled = this.configService.get('SCHEDULER_ENABLED', true);
        if (!enabled) {
            this.logger.log('Scheduler is disabled');
            return;
        }
        this.logger.log('Initializing scheduler...');
        this.startHealthCheckScheduler();
    }
    onModuleDestroy() {
        this.logger.log('Stopping all scheduled tasks...');
        this.intervals.forEach((interval) => clearInterval(interval));
        this.intervals = [];
    }
    startHealthCheckScheduler() {
        const url = this.configService.get('SCHEDULER_HEALTH_CHECK_URL', 'http://localhost:5000/health');
        console.log(url);
        const intervalMinutes = this.configService.get('SCHEDULER_HEALTH_CHECK_INTERVAL', 14);
        const intervalMs = intervalMinutes * 60 * 1000;
        this.logger.log(`Starting health check scheduler: calling ${url} every ${intervalMinutes} minutes`);
        this.callURL(url);
        const interval = setInterval(() => {
            this.callURL(url);
        }, intervalMs);
        this.intervals.push(interval);
    }
    callURL(url) {
        const client = url.startsWith('https') ? https : http;
        const req = client.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => {
                this.logger.log(`Called ${url} → Status: ${res.statusCode}`);
            });
        });
        req.on('error', (err) => {
            this.logger.error(`Error calling ${url}: ${err.message}`, err.stack);
        });
        req.end();
    }
    addScheduledTask(name, callback, intervalMs) {
        this.logger.log(`Adding scheduled task: ${name} (interval: ${intervalMs}ms)`);
        try {
            callback();
        }
        catch (error) {
            this.logger.error(`Error executing scheduled task ${name}:`, error);
        }
        const interval = setInterval(() => {
            try {
                callback();
            }
            catch (error) {
                this.logger.error(`Error executing scheduled task ${name}:`, error);
            }
        }, intervalMs);
        this.intervals.push(interval);
    }
};
exports.SchedulerService = SchedulerService;
exports.SchedulerService = SchedulerService = SchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SchedulerService);
//# sourceMappingURL=scheduler.service.js.map