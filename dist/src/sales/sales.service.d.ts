import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';
export declare class SalesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSale(userId: string, saleData: CreateSaleDto): Promise<({
        items: ({
            product: {
                id: string;
                name: string;
                sku: string;
            };
        } & {
            id: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            saleId: string;
            productId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
    }) | null>;
    getAllSales(page?: number, limit?: number): Promise<{
        data: ({
            items: ({
                product: {
                    id: string;
                    name: string;
                    sku: string;
                };
            } & {
                id: string;
                price: import("@prisma/client-runtime-utils").Decimal;
                saleId: string;
                productId: string;
                quantity: number;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
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
                id: string;
                name: string;
                sku: string;
            };
        } & {
            id: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            saleId: string;
            productId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
    }>;
}
