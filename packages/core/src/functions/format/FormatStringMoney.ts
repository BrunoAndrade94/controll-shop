export default function FormartMoney(valor: string): number {
  return parseFloat(valor.replace(/[^\d]/g, "").replace(",", "."));
}
