import { BuyProducts } from "..";

export default interface Buy {
  id: string;
  buyDate: Date;
  localId: string;
  products: BuyProducts[];
  countProducts: number;
  totalValue: number;
}
