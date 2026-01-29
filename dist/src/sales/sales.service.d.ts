import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { Prisma } from '@prisma/client';
export declare class SalesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSale(userId: string, saleData: CreateSaleDto): Promise<({
        items: ({
            product: {
                name: string;
                id: string;
                sku: string;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            price: Prisma.Decimal;
            saleId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        totalAmount: Prisma.Decimal;
    }) | null>;
    getAllSales(page?: number, limit?: number): Promise<{
        data: ({
            items: ({
                product: {
                    name: string;
                    id: string;
                    sku: string;
                };
            } & {
                id: string;
                productId: string;
                quantity: number;
                price: Prisma.Decimal;
                saleId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            totalAmount: Prisma.Decimal;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getSaleById(id: string): Promise<{
        items: ({
            product: {
                name: string;
                id: string;
                sku: string;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            price: Prisma.Decimal;
            saleId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        totalAmount: Prisma.Decimal;
    }>;
}
