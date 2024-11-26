"use client";

import { useEffect, useState } from "react";

// Função para formatar a data no formato brasileiro
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
};

const PurchaseList = () => {
  const [buysData, setBuysData] = useState<{ buys: any[] }>({ buys: [] });
  const [loading, setLoading] = useState(true);
  const [selectedBuy, setSelectedBuy] = useState<string | null>(null);

  // Função para buscar os dados da API
  useEffect(() => {
    const fetchBuys = async () => {
      try {
        const res = await fetch("http://localhost:4000/buys");
        const data = await res.json();
        setBuysData(data); // Certifique-se que o formato está correto
      } catch (error) {
        console.error("Erro ao buscar compras:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuys();
  }, []);

  // Se os dados ainda estiverem carregando, exibe uma mensagem de "Carregando"
  if (loading) return <p>Carregando...</p>;

  // Se não houver compras, exibe uma mensagem de "Nenhuma compra encontrada"
  if (!buysData.buys || buysData.buys.length === 0) {
    return <p>Nenhuma compra encontrada.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Lista de Compras</h1>
      <ul className="bg-white shadow-md rounded-lg">
        {buysData.buys.map((buy: any) => (
          <li
            key={buy.id}
            className="flex justify-between items-center border-b last:border-none px-6 py-4"
          >
            {/* Data da compra */}
            <span>Data: {formatDate(buy.purchaseDate)}</span>

            {/* Botão para abrir a lista suspensa com o número de produtos */}
            <button
              type="button"
              onClick={() =>
                setSelectedBuy((prev) => (prev === buy.id ? null : buy.id))
              }
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {buy.countProducts} produto(s)
            </button>

            {/* Modal com os detalhes dos produtos */}
            {selectedBuy === buy.id && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
                  <button
                    type="button"
                    onClick={() => setSelectedBuy(null)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                  >
                    &times;
                  </button>
                  <h2 className="text-xl font-semibold mb-4">
                    Detalhes da Compra
                  </h2>

                  {/* Lista de produtos */}
                  <ul className="divide-y">
                    {buy.products.map((buyProduct: any) => (
                      <li key={buyProduct.id} className="py-2">
                        <div>
                          <span className="font-semibold">Descrição:</span>{" "}
                          {buyProduct.products.description}
                        </div>
                        <div>
                          <span className="font-semibold">Quantidade:</span>{" "}
                          {buyProduct.amount}
                        </div>
                        <div>
                          <span className="font-semibold">Preço Unitário:</span>{" "}
                          R$ {buyProduct.unitPrice.toFixed(2)}
                        </div>
                        <div>
                          <span className="font-semibold">Valor Total:</span> R${" "}
                          {buyProduct.totalPrice.toFixed(2)}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseList;
