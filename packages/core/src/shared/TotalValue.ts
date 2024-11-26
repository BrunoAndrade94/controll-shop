import { BuyProducts } from "../models";

export default class TotalValue {
  static calculateTotalValue(product: BuyProducts): number {
    return product.amount * product.unitPrice;
  }

  static calculateTotalValue2(amout: number, unitPrice: number): number {
    return amout * unitPrice;
  }
}
