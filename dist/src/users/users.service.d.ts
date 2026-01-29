import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findOne(email: string): Promise<{
        email: string;
        name: string;
        password: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findById(id: string): Promise<{
        email: string;
        name: string;
        password: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    create(data: CreateUserDto): Promise<{
        email: string;
        name: string;
        password: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
