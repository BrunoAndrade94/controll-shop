export default function CalcTotalPrice(amount: number, price: number): number {
  return +(amount * price).toFixed(2);
}
