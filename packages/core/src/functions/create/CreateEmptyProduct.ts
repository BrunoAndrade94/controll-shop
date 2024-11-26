import { Product } from "../../models";
import { Id } from "../../shared";

export default function CreateEmptyProduct(): Partial<Product> {
  return {
    id: Id.new(),
    createDate: new Date(),
    description: "",
    markId: "",
    codeBar: "",
    lastPrice: 0.0,
    active: true,
  };
}
