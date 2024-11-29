"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ComplementLocal: () => ComplementLocal,
  ComplementProduct: () => ComplementProduct,
  CreateEmptyMark: () => CreateEmptyMark,
  CreateEmptyProduct: () => CreateEmptyProduct,
  Data: () => Data,
  FormatMoney: () => FormartMoney,
  FormatStringMoney: () => FormartMoney2,
  Id: () => Id,
  LocalRoute: () => local_routes_default,
  ProductRoute: () => product_routes_default,
  TotalValue: () => TotalValue,
  UpdateProduct: () => UpdateProduct,
  constBuys: () => buys_default,
  constLocals: () => locals_default,
  constMarks: () => marks_default,
  constProducts: () => products_default
});
module.exports = __toCommonJS(src_exports);

// src/constants/buys.ts
var buys = [
  {
    id: "1",
    buyDate: /* @__PURE__ */ new Date(),
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
        totalPrice: 3 * 14.9
      }
    ]
  },
  {
    id: "2",
    buyDate: /* @__PURE__ */ new Date(),
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
        totalPrice: 2 * 14.9
      },
      {
        id: "3",
        buyId: "2",
        productId: "1",
        amount: 2,
        unitPrice: 14.9,
        totalPrice: 2 * 14.9
      }
    ]
  }
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
var buys_default = buys;

// src/constants/locals.ts
var locals = [
  {
    id: "1",
    description: "Akki",
    createDate: /* @__PURE__ */ new Date(),
    active: true
  },
  {
    id: "2",
    description: "A\xE7ai",
    createDate: /* @__PURE__ */ new Date(),
    active: true
  },
  {
    id: "3",
    description: "Atacad\xE3o",
    createDate: /* @__PURE__ */ new Date(),
    active: true
  }
  // {
  //   id: Id.new(),
  //   description: "Leco",
  //   createDate: new Date(),
  // },
  // {
  //   id: Id.new(),
  //   description: "Requeijão",
  //   createDate: new Date(),
  // },
  // {
  //   id: Id.new(),
  //   description: "Pepisco",
  //   createDate: new Date(),
  // },
];
var locals_default = locals;

// src/constants/marks.ts
var marks = [
  {
    id: "1",
    description: "Tio J\xE3o",
    createDate: /* @__PURE__ */ new Date(),
    active: true
  },
  {
    id: "2",
    description: "Hortifruti",
    createDate: /* @__PURE__ */ new Date(),
    active: true
  },
  {
    id: "3",
    description: "Tirolez",
    createDate: /* @__PURE__ */ new Date(),
    active: true
  }
  // {
  //   id: Id.new(),
  //   description: "Leco",
  //   createDate: new Date(),
  // },
  // {
  //   id: Id.new(),
  //   description: "Requeijão",
  //   createDate: new Date(),
  // },
  // {
  //   id: Id.new(),
  //   description: "Pepisco",
  //   createDate: new Date(),
  // },
];
var marks_default = marks;

// src/constants/products.ts
var products = [
  {
    id: "1",
    description: "Arroz",
    codeBar: "9839218321",
    markId: "1",
    lastPrice: 12.9,
    active: true,
    createDate: /* @__PURE__ */ new Date()
  },
  {
    id: "2",
    description: "Pera",
    codeBar: "9839218321",
    markId: "1",
    lastPrice: 12.9,
    active: true,
    createDate: /* @__PURE__ */ new Date()
  },
  {
    id: "3",
    description: "Macarr\xE4o",
    codeBar: "9839218321",
    markId: "1",
    lastPrice: 12.9,
    active: true,
    createDate: /* @__PURE__ */ new Date()
  }
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
var products_default = products;

// src/shared/Data.ts
var Data = class {
  static format(data) {
    const pad = (n) => n.toString().padStart(2, "0");
    const d = data ?? /* @__PURE__ */ new Date();
    const ano = d.getFullYear();
    const mes = pad(d.getMonth() + 1);
    const dia = pad(d.getDate());
    const hora = pad(d.getHours());
    const minuto = pad(d.getMinutes());
    return `${ano}-${mes}-${dia}T${hora}:${minuto}`;
  }
  static unformat(data) {
    const [ano, mes, dia] = data.split("T")[0].split("-");
    const [hora, minuto] = data.split("T")[1].split(":");
    return new Date(
      parseInt(ano),
      parseInt(mes) - 1,
      parseInt(dia),
      parseInt(hora),
      parseInt(minuto)
    );
  }
};

// src/shared/Id.ts
var import_uuid = require("uuid");
var Id = class {
  static new() {
    return (0, import_uuid.v4)();
  }
  static validadeId(id) {
    return (0, import_uuid.validate)(id);
  }
};

// src/shared/TotalValue.ts
var TotalValue = class {
  static calculateTotalValue(product) {
    return product.amount * product.unitPrice;
  }
  static calculateTotalValue2(amout, unitPrice) {
    return amout * unitPrice;
  }
};

// src/shared/api/local/local-routes.ts
var rota = "http://172.17.10.134:4000/locals";
var GetLocalAll = `${rota}/get`;
var GetLocalDescription = `${rota}/get/?search=`;
var local_routes_default = {
  GetLocalAll,
  GetLocalDescription
};

// src/shared/api/product/product-routes.ts
var rota2 = "http://172.17.10.134:4000/products";
var GetProductAll = `${rota2}/get`;
var GetProductDescription = `${rota2}/get/?search=`;
var product_routes_default = {
  GetProductAll,
  GetProductDescription
};

// src/functions/create/CreateEmptyMark.ts
function CreateEmptyMark() {
  return {
    id: Id.new(),
    createDate: /* @__PURE__ */ new Date(),
    description: "",
    active: true
  };
}

// src/functions/create/CreateEmptyProduct.ts
function CreateEmptyProduct() {
  return {
    id: Id.new(),
    createDate: /* @__PURE__ */ new Date(),
    description: "",
    markId: "",
    codeBar: "",
    lastPrice: 0,
    active: true
  };
}

// src/functions/complement/ComplementLocal.ts
function ComplementLocal(partialLocal) {
  const Local = {
    id: partialLocal.id,
    createDate: partialLocal.createDate,
    description: partialLocal.description.toUpperCase(),
    active: true
  };
  return Local;
}

// src/functions/complement/ComplementProduct.ts
function ComplementProduct(partialProduct) {
  const product = {
    // pode vazio
    id: partialProduct.id,
    createDate: partialProduct.createDate,
    active: true,
    // nao pode vazio
    codeBar: partialProduct.codeBar,
    description: partialProduct.description.toUpperCase(),
    lastPrice: partialProduct.lastPrice,
    markId: partialProduct.markId
  };
  return product;
}

// src/functions/format/FormatMoney.ts
function FormartMoney(valor) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    // Exibir sempre 2 casas decimais
    maximumFractionDigits: 2
    // Limitar a 2 casas decimais
  }).format(valor);
}

// src/functions/format/FormatStringMoney.ts
function FormartMoney2(valor) {
  return parseFloat(valor.replace(/[^\d]/g, "").replace(",", "."));
}

// src/functions/update/update-product.ts
function UpdateProduct(product) {
  return {
    description: product.description.toUpperCase(),
    codeBar: product.codeBar
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ComplementLocal,
  ComplementProduct,
  CreateEmptyMark,
  CreateEmptyProduct,
  Data,
  FormatMoney,
  FormatStringMoney,
  Id,
  LocalRoute,
  ProductRoute,
  TotalValue,
  UpdateProduct,
  constBuys,
  constLocals,
  constMarks,
  constProducts
});
