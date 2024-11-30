export default function FormartStringMoney(valor: string): number {
  const valorLimitado = valor.slice(0, 9);

  return (
    parseFloat(valorLimitado.replace(/[^\d]/g, "").replace(",", ".")) / 100
  );
}
