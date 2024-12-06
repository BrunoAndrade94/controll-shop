import { BuyProducts, Id, Product } from "core";

export default function ComplementBuy(
  productsBuy: Partial<BuyProducts>,
  product: Partial<Product>
) {
  // const errors = ValidadeBuy(buyPartial);

  // if (errors.length) {
  //   throw new Error(errors.join("\n"));
  // }

  return {
    id: productsBuy.id ?? Id.new(),
    purchaseDate: new Date(),
    product: [product.id],
    totalValue: +(productsBuy.amount * productsBuy.unitPrice).toFixed(2),
  };
}
