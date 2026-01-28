import { Request } from 'express';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
interface AuthenticatedRequest extends Request {
    user: {
        sub: string;
        email: string;
    };
}
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    createSale(req: AuthenticatedRequest, createSaleDto: CreateSaleDto): Promise<({
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
    getAllSales(page?: string, limit?: string): Promise<{
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
export {};
