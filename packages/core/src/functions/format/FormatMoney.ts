export default function FormartMoney(valor: number): string {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2, // Exibir sempre 2 casas decimais
    maximumFractionDigits: 2, // Limitar a 2 casas decimais
  }).format(valor);
}

// const formatCurrency = (value: number) => {
//   return new Intl.NumberFormat("pt-BR", {
//     style: "currency",
//     currency: "BRL",
//   }).format(value);
// };
