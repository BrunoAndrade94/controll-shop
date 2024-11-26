// import { Injectable } from '@nestjs/common';
// import { Buy } from 'core';
// import { PrismaProvider } from 'src/db/prisma.provider';

// @Injectable()
// export class BuyPrisma {
//   constructor(readonly prisma: PrismaProvider) {}

//   async prNewBuy(data: {
//     products: { id: string; unitPrice: number; amount: number }[];
//   }) {
//     const { products } = data;

//     const totalValueBuy = products.reduce(
//       (acc, item) => acc + item.amount * item.unitPrice,
//       0,
//     );

//     const toUpdateProducts = products.map(async (product) => {
//       const { id, unitPrice, amount } = product;

//       // Mapeia os produtos para a tabela de junção
//       const productsToCreate = products.map((product) => ({
//         productId: product.id,
//         amount: product.amount,
//         unitPrice: product.unitPrice,
//         totalPrice: +(product.amount * product.unitPrice).toFixed(2),
//       }));
//     });

//     const resolvedProducts = await Promise.all(toUpdateProducts);

//     return await this.prisma.client.buy.create({
//       data: {
//         purchaseDate: new Date(),
//         totalValue: totalValueBuy,
//         products: {
//           create: resolvedProducts,
//         },
//       },
//       include: {
//         products: true,
//       },
//     });
//   }

//   async prGetAllBuys(): Promise<Buy[]> {
//     return this.prisma.buy.findMany() as any;
//   }

//   async prGetIdBuy(id: string): Promise<Buy | null> {
//     return this.prisma.buy.findUnique({
//       where: { id: id },
//       include: { products: true },
//     }) as any;
//   }

//   // async findDescriptionProduct(id: string): Promise<Product | null> {}
// }
