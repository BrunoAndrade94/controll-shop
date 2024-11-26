import Buy from "../../models/base/Buy";

export default function ValidadeBuy(buy: Partial<Buy>): string[] {
  const errors: string[] = [];

  if (!buy.product) errors.push("Produto obrigatório");

  return errors;
}
