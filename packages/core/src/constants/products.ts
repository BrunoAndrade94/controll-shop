import Product from "../models/base/Product";

const products: Product[] = [
  {
    id: "1",
    description: "Arroz",
    codeBar: "9839218321",
    markId: "1",
    lastPrice: 12.9,
    active: true,
    createDate: new Date(),
  },
  {
    id: "2",
    description: "Pera",
    codeBar: "9839218321",
    markId: "1",
    lastPrice: 12.9,
    active: true,
    createDate: new Date(),
  },
  {
    id: "3",
    description: "Macarräo",
    codeBar: "9839218321",
    markId: "1",
    lastPrice: 12.9,
    active: true,
    createDate: new Date(),
  },
  // {
  //
  //   description: "Leite Integral",
  //   mark: [
  //     {
  //       id: marks[4].id,
  //       description: marks[4].description,
  //       createDate: marks[4].createDate,
  //     },
  //   ],
  //   amount: 0.48,
  //   unitPrice: 12.9,
  //   totalPrice: 10.0,
  // },
  // {
  //   id: Id.new(),
  //   description: "Manteriga",
  //   mark: [
  //     {
  //       id: marks[5].id,
  //       description: marks[5].description,
  //       createDate: marks[5].createDate,
  //     },
  //   ],
  //   amount: 1,
  //   unitPrice: 12.9,
  //   totalPrice: 10.0,
  // },
  // {
  //   id: Id.new(),
  //   description: "Queijo",
  //   mark: [
  //     {
  //       id: marks[6].id,
  //       description: marks[6].description,
  //       createDate: marks[6].createDate,
  //     },
  //   ],
  //   amount: 1,
  //   unitPrice: 12.9,
  //   totalPrice: 10.0,
  // },
];

export default products;
