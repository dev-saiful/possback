import { type Request, type Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private authService;
    private configService;
    private readonly isProduction;
    constructor(authService: AuthService, configService: ConfigService);
    private setAuthCookies;
    private clearAuthCookies;
    signIn(signInDto: SignInDto, res: Response): Promise<{
        message: string;
    }>;
    signUp(signUpDto: SignUpDto, res: Response): Promise<{
        message: string;
    }>;
    logout(res: Response, req: Request): Promise<{
        message: string;
    }>;
    refresh(req: Request, res: Response): Promise<{
        message: string;
    }>;
    getProfile(req: Request): Promise<{
        id: string;
        email: string;
        createdAt: Date;
    }>;
}
