import Buy from "../models/base/Buy";

const buys: Buy[] = [
  {
    id: "1",
    buyDate: new Date(),
    countProducts: 1,
    localId: "1",
    totalValue: 3 * 14.9,
    products: [
      {
        id: "1",
        buyId: "1",
        productId: "1",
        amount: 3,
        unitPrice: 14.9,
        totalPrice: 3 * 14.9,
      },
    ],
  },
  {
    id: "2",
    buyDate: new Date(),
    countProducts: 1,
    localId: "2",
    totalValue: 2 * 14.9,
    products: [
      {
        id: "2",
        buyId: "2",
        productId: "2",
        amount: 2,
        unitPrice: 14.9,
        totalPrice: 2 * 14.9,
      },
      {
        id: "3",
        buyId: "2",
        productId: "1",
        amount: 2,
        unitPrice: 14.9,
        totalPrice: 2 * 14.9,
      },
    ],
  },
  // {
  //   id: "3",
  //   buyDate: new Date(),
  //   countProducts: 2,
  //   localId: "3",
  //   totalValue: 100.01,
  //   products: [
  //     {
  //       id: "3",
  //       buyId: "3",
  //       productId: "3",
  //       amount: 3,
  //       unitPrice: 14.9,
  //       totalPrice: 3 * 14.9,
  //     },
  //   ],
  // },
  // {
  //   id: Id.new(),
  //   purchaseDate: new Date(),
  //   product: [
  //     {
  //       id: products[5].id,
  //       description: products[5].description,
  //       mark: [
  //         {
  //           id: products[5].mark[5].id,
  //           description: products[5].mark[5].description,
  //           createDate: products[5].mark[5].createDate,
  //         },
  //       ],
  //       amount: products[5].amount,
  //       unitPrice: products[5].unitPrice,
  //       totalPrice: products[5].totalPrice,
  //     },
  //     {
  //       id: products[6].id,
  //       description: products[6].description,
  //       mark: [
  //         {
  //           id: products[6].mark[6].id,
  //           description: products[6].mark[6].description,
  //           createDate: products[6].mark[6].createDate,
  //         },
  //       ],
  //       amount: products[6].amount,
  //       unitPrice: products[6].unitPrice,
  //       totalPrice: products[6].totalPrice,
  //     },
  //   ],
  //   totalValue: 100.01,
  // },
];

export default buys;
