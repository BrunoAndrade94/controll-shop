import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  const local1 = await prisma.local.create({
    data: {
      description: 'AKKI',
      createDate: new Date(),
      active: true,
    },
  });

  const local2 = await prisma.local.create({
    data: {
      description: 'ROSSI',
      createDate: new Date(),
      active: true,
    },
  });

  // Criação de exemplos de Mark
  const mark1 = await prisma.mark.create({
    data: {
      description: 'TRES MARIAS',
      createDate: new Date(),
      active: true,
    },
  });

  const mark2 = await prisma.mark.create({
    data: {
      description: 'TIROLEZ',
      createDate: new Date(),
      active: true,
    },
  });

  const product1 = await prisma.product.create({
    data: {
      description: 'MACONHA',
      codeBar: '9839218321',
      markId: mark1.id,
      lastPrice: 12.9,
      active: true,
      createDate: new Date(),
    },
  });

  const product2 = await prisma.product.create({
    data: {
      description: 'ICE DO BOM',
      codeBar: '9839218321',
      markId: mark2.id,
      lastPrice: 12.9,
      active: true,
      createDate: new Date(),
    },
  });

  // Criação da primeira compra (1 item)
  const buy1 = await prisma.buy.create({
    data: {
      buyDate: new Date(),
      countProducts: 1,
      localId: local1.id,
      totalValue: 3 * 14.9,
      products: {
        create: [
          {
            productId: product1.id, // Conecta ao Produto A
            amount: 2, // Quantidade comprada
            unitPrice: 20.0, // Preço unitário
            totalPrice: 40.0, // Quantidade * Preço unitário
          },
        ],
      },
    },
  });

  // Criação da segunda compra (2 itens)
  const buy2 = await prisma.buy.create({
    data: {
      buyDate: new Date(),
      countProducts: 2,
      localId: local2.id,
      totalValue: 3 * 14.9,
      products: {
        create: [
          {
            productId: product1.id, // Conecta ao Produto A
            amount: 2, // Quantidade comprada
            unitPrice: 20.0, // Preço unitário
            totalPrice: 40.0, // Quantidade * Preço unitário
          },
          {
            productId: product2.id, // Conecta ao Produto B
            amount: 3, // Quantidade comprada
            unitPrice: 15.0, // Preço unitário
            totalPrice: 45.0, // Quantidade * Preço unitário
          },
        ],
      },
    },
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
