import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class SchedulerService implements OnModuleInit, OnModuleDestroy {
    private readonly configService;
    private readonly logger;
    private intervals;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    onModuleDestroy(): void;
    private startHealthCheckScheduler;
    private callURL;
    addScheduledTask(name: string, callback: () => void, intervalMs: number): void;
}
