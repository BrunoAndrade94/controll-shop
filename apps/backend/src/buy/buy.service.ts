import { Injectable } from '@nestjs/common';
import { Buy, BuyProducts, CalcTotalPrice, FormatToFixed } from 'core';
import { PrismaProvider } from 'src/db/prisma.provider';

@Injectable()
export class BuyService {
  constructor(readonly prisma: PrismaProvider) {}

  async seGetBuysByProductId(productId: string) {
    return await this.prisma.buy.findMany({
      where: {
        products: {
          some: {
            productId: productId, // Filtra pela associação com o produto
          },
        },
      },
      select: {
        id: true,
        buyDate: true,
        local: {
          select: {
            description: true, // Nome do local
          },
        },
        products: {
          where: {
            productId: productId,
          },
          select: {
            unitPrice: true, // Valor do produto na compra
            products: {
              select: {
                description: true, // Nome do produto
                lastPrice: true, // Último preço do produto
                mark: {
                  select: {
                    description: true, // Nome da marca
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        buyDate: 'desc',
      },
    });
  }

  async seNewBuy(data: { localId: string; products: Partial<BuyProducts>[] }) {
    try {
      const { localId, products } = data;

      const countProducts = products.length;

      const totalValue = products.reduce(
        (acc, item) => +(acc + item.amount * item.unitPrice).toFixed(2),
        0,
      );

      await this.prisma.buy.create({
        data: {
          // TODO: TIRAR ESSE NEW DATE()
          buyDate: new Date(),
          totalValue: totalValue,
          countProducts: countProducts,
          localId: localId,
          products: {
            create: products.map((product) => ({
              productId: product.productId,
              amount: FormatToFixed(product.amount),
              unitPrice: FormatToFixed(product.unitPrice),
              totalPrice: CalcTotalPrice(product.amount, product.unitPrice),
            })),
          },
        },
        include: {
          products: true,
        },
      });

      products.map(async (product) => {
        await this.prisma.product.update({
          where: { id: product.productId },
          data: {
            lastPrice: product.unitPrice,
          },
        });
      });
    } catch (error) {
      console.error('erro ao atualizar', error.message);
      throw error;
    }
  }

  async seGetBuyProducts(): Promise<BuyProducts[]> {
    return (await this.prisma.buyProducts.findMany({
      orderBy: {
        buys: {
          buyDate: 'desc',
        },
      },
    })) as any;
  }

  async seGetAllBuys(): Promise<Buy[]> {
    return (await this.prisma.buy.findMany({
      include: {
        local: {
          select: {
            id: true,
            description: true,
          },
        },
        products: {
          include: {
            products: {
              include: {
                mark: {
                  select: {
                    id: true,
                    description: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        buyDate: 'desc',
      },
    })) as any;
  }

  async seGetIdBuy(id: string): Promise<Buy | null> {
    return (await this.prisma.buy.findUnique({
      where: { id: id },
      include: { products: true },
    })) as any;
  }

  // async findDescriptionProduct(id: string): Promise<Product | null> {}

  // private serialize(date: Date): string {
  //   return Data.format(date);
  // }

  // private serialize(buy: Buy) {
  //   return {
  //     ...buy,
  //     purchaseDate: Data.format(buy.purchaseDate),
  //   };
  // }

  // private deserialize(date: string): Date {
  //   return Data.unformat(date);
  // }
}
