type Item = {
  amount: number;
  unitPrice: number;
}[];

export default function CalcTotalValueBuy(items: any): number {
  return items.reduce(
    (acc: any, item: any) => +(acc + item.amount * item.unitPrice).toFixed(2),
    0
  );
}
