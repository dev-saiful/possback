import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(createProductDto: CreateProductDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        stockQuantity: number;
    }>;
    getAllProducts(page?: string, limit?: string): Promise<{
        data: {
            id: string;
            name: string;
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
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        stockQuantity: number;
    }>;
    updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        stockQuantity: number;
    }>;
    deleteProduct(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        stockQuantity: number;
    }>;
}
