import { Product } from "../../models";

export default function UpdateProduct(
  product: Partial<Product>
): Partial<Product> {
  return {
    description: product.description.toUpperCase(),
    codeBar: product.codeBar,
  };
}
