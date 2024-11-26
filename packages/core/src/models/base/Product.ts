import { Mark } from "core";

export default interface Product {
  id: string;
  description: string;
  markId: string;
  mark?: Mark;
  codeBar: string;
  lastPrice: number;
  active: boolean;
  createDate: Date;

  // amountStore: number // CAMPO PARA ARMENAR O SALDO DO PRODUTO EM ESTOQUE
  // unit: string; // FORA POR ENQUANTO
}
