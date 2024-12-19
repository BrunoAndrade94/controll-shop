import { Injectable } from '@nestjs/common';
import { Product } from 'core';
import { PrismaProvider } from 'src/db/prisma.provider';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaProvider) {}

  async seProductGetDescription(description: string): Promise<Product | null> {
    return (await this.prisma.product.findUnique({
      where: {
        active: true,
        description: description.toUpperCase(),
      },
      select: {
        description: true,
      },
    })) as any;
  }

  async seProductId(id: string) {
    try {
      return await this.prisma.product.findUnique({
        where: {
          id: id,
          active: true,
        },
        select: {
          id: true,
          description: true,
          lastPrice: true,
          codeBar: true,
          mark: {
            select: {
              id: true,
              description: true,
            },
          },
        },
      });
    } catch (error) {
      console.error('Erro ao buscar o produto', error.message);
      throw error;
    }
  }

  async seProductsAll() {
    try {
      const productsAll = await this.prisma.product.findMany({
        where: { active: true },
        select: {
          id: true,
          description: true,
          codeBar: true,
          lastPrice: true,
          markId: true,
          mark: {
            select: {
              id: true,
              description: true,
            },
          },
        },
        orderBy: { description: 'asc' },
      });
      return productsAll;
    } catch (error) {
      console.error('Erro ao buscar o produto', error.message);
      throw error;
    }
  }

  async seProductNew(product: Product) {
    try {
      const newProduct = await this.prisma.product.create({
        data: {
          id: product.id,
          description: product.description,
          codeBar: product.codeBar,
          lastPrice: +product.lastPrice.toFixed(2),
          markId: product.markId,
          createDate: product.createDate,
          active: product.active,
        },
      });
      return newProduct;
    } catch (error) {
      console.error('Erro ao criar produto:', error.message);
      throw error;
    }
  }

  async seProductDelete(id: string) {
    try {
      const deletedProduct = await this.prisma.product.update({
        where: { id: id },
        data: {
          active: false,
        },
        select: {
          description: true,
        },
      });
      return deletedProduct;
    } catch (error) {
      console.error('Erro ao deletar produto:', error.message);
      throw error;
    }
  }

  async seProductUpdate(id: string, productData: Partial<Product>) {
    try {
      const productUpdate = await this.prisma.product.update({
        where: { id: id },
        data: {
          description: productData.description,
          codeBar: productData.codeBar,
          mark: {
            connect: {
              id: productData.markId,
            },
          },
        },
      });

      return productUpdate;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error.message);
      throw error;
    }
  }
}
