import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createProduct(createProductDto: CreateProductDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        stockQuantity: number;
    }>;
    getAllProducts(page?: number, limit?: number): Promise<{
        data: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            sku: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            stockQuantity: number;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getProductById(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        stockQuantity: number;
    }>;
    updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        stockQuantity: number;
    }>;
    deleteProduct(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        stockQuantity: number;
    }>;
}
