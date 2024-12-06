import { Id, Product } from "core";

export default function ComplementProduct(
  partialProduct: Partial<Product>
): Product {
  // const errors = ValidateProduct(partialProduct);

  // if (errors.length) {
  //   throw new Error(errors.join("\n"));
  // }

  const product: Product = {
    // pode vazio
    id: partialProduct.id || Id.new(),
    createDate: partialProduct.createDate || new Date(),
    active: true,

    // nao pode vazio
    codeBar: partialProduct.codeBar,
    description: partialProduct.description.toUpperCase(),
    lastPrice: partialProduct.lastPrice,
    markId: partialProduct.markId,
  } as Product;

  return product;
}
