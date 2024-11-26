import { Buy } from "../../models";
import { Id } from "../../shared";

export default function CreateEmptyBuy(): Partial<Buy> {
  return {
    id: Id.new(),
    buyDate: new Date(),
    localId: "",
    products: [],
    countProducts: 0,
    totalValue: 0.0,
  };
}
