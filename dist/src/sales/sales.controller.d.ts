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
                name: string;
                id: string;
                sku: string;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            saleId: string;
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
                    name: string;
                    id: string;
                    sku: string;
                };
            } & {
                id: string;
                productId: string;
                quantity: number;
                price: import("@prisma/client-runtime-utils").Decimal;
                saleId: string;
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
                name: string;
                id: string;
                sku: string;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            saleId: string;
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
