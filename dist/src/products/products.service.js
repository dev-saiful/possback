"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createProduct(createProductDto) {
        const existing = await this.prisma.product.findUnique({
            where: { sku: createProductDto.sku },
        });
        if (existing) {
            throw new common_1.ConflictException(`Product with SKU ${createProductDto.sku} already exists`);
        }
        return await this.prisma.product.create({
            data: createProductDto,
        });
    }
    async getAllProducts(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.product.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.product.count(),
        ]);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getProductById(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async updateProduct(id, updateProductDto) {
        await this.getProductById(id);
        if (updateProductDto.sku) {
            const existing = await this.prisma.product.findUnique({
                where: { sku: updateProductDto.sku },
            });
            if (existing && existing.id !== id) {
                throw new common_1.ConflictException(`Product with SKU ${updateProductDto.sku} already exists`);
            }
        }
        return await this.prisma.product.update({
            where: { id },
            data: updateProductDto,
        });
    }
    async deleteProduct(id) {
        await this.getProductById(id);
        try {
            return await this.prisma.product.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error.code === 'P2003') {
                throw new common_1.ConflictException('Cannot delete product. It is referenced in existing sales.');
            }
            throw error;
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map