import { Product } from "../../models";

export default function ValidateProduct(product: Partial<Product>): string[] {
  const errors: string[] = [];

  if (!product.description) errors.push("Descrição obrigatória");
  if (!product.codeBar) errors.push("Código de Barras obrigatória");
  if (!product.lastPrice) errors.push("Preço inicial obrigatória");
  if (!+product.lastPrice) errors.push("Preço incorreto");
  if (!product.markId) errors.push("Marca é obrigatória");

  return errors;
}
