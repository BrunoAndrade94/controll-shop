import { Injectable } from '@nestjs/common';
import { Buy, BuyProducts } from 'core';
import { PrismaProvider } from 'src/db/prisma.provider';

@Injectable()
export class BuyService {
  constructor(readonly prisma: PrismaProvider) {}

  async prNewBuy(data: {
    localId: string;
    products: { productId: string; unitPrice: number; amount: number }[];
  }) {
    const { localId, products } = data;

    const totalValueBuy = products.reduce(
      (acc, item) => +(acc + item.amount * item.unitPrice).toFixed(2),
      0,
    );

    const countProducts = products.length;

    return this.prisma.buy.create({
      data: {
        // TODO: TIRAR ESSE NEW DATE()
        buyDate: new Date(),
        totalValue: totalValueBuy,
        countProducts: countProducts,
        localId: localId,
        products: {
          create: products.map((product) => ({
            productId: product.productId,
            amount: +product.amount.toFixed(2),
            unitPrice: +product.unitPrice.toFixed(2),
            totalPrice: +(product.amount * product.unitPrice).toFixed(2),
          })),
        },
      },
      include: {
        products: true,
      },
    });
  }

  async prGetBuyProducts(): Promise<BuyProducts[]> {
    return (await this.prisma.buyProducts.findMany()) as any;
  }

  async prGetAllBuys(): Promise<Buy[]> {
    return this.prisma.buy.findMany() as any;
  }

  async prGetIdBuy(id: string): Promise<Buy | null> {
    return this.prisma.buy.findUnique({
      where: { id: id },
      include: { products: true },
    }) as any;
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
