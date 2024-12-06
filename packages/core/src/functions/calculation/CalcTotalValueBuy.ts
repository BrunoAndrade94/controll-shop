type Items = {
  amount: number;
  unitPrice: number;
}[];

export default function CalcTotalValueBuy(items: Items): number {
  return items.reduce(
    (acc, item) => +(acc + item.amount * item.unitPrice).toFixed(2),
    0
  );
}
