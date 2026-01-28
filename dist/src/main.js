"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const validation_pipe_1 = require("@nestjs/common/pipes/validation.pipe");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.use((0, cookie_parser_1.default)());
    app.enableCors({
        origin: configService.get('FRONTEND_URL') || 'http://localhost:5173',
        credentials: true,
    });
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const port = configService.get('PORT') || 3000;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map