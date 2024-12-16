export default function FormartStringMoney(valor: string): number {
  const valorSlice = valor.slice(0, 11);
  const valorReplace = +valorSlice.replace(/[^\d]/g, "") / 100;

  return valorReplace;
}
