import { Buy } from "core"; // Ajuste conforme o seu caminho de importação
// import { useState } from "react";

interface PageProps {
  buysData: {
    buys: Buy[];
  };
}

export default function Page({ buysData }: PageProps) {
  // const [selectedBuy, setSelectedBuy] = useState<string | null>(null);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          Lista de Compras
        </h1>

        <ul className="bg-white shadow-md rounded-lg">
          {buysData.buys.map((buy) => (
            <li
              key={buy.id}
              className="flex flex-col border-b last:border-none px-6 py-4"
            >
              {/* Informações da Compra */}
              <div className="mb-4">
                <p>
                  <strong>Data da Compra:</strong>{" "}
                  {new Date(buy.buyDate).toLocaleDateString("pt-BR")}
                </p>
                <p>
                  <strong>Quantidade de Produtos:</strong> {buy.countProducts}
                </p>
                <p>
                  <strong>Valor Total:</strong>{" "}
                  {buy.totalValue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
