"use client";
import { GetLocalDescription } from "@/app/hook/local/get-local-description";
import { GetProductDescription } from "@/app/hook/product/get-products-description";
import ButtonHome from "@/components/shared/Button-Home";
import { FormatMoney, FormatStringMoney } from "core";
import { useState } from "react";

export default function ProductSearch() {
  const [showList, setShowList] = useState(false); // Controla exibição da lista de busca
  const [showListLocal, setShowListLocal] = useState(false); // Controla exibição da lista de busca
  // -------------
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocal, setSearchLocal] = useState("");
  const [productsList, setProductsList] = useState<any[]>([]); // Lista de produtos adicionados
  const [showOverlay, setShowOverlay] = useState(false); // Controla exibição da sobreposição

  const [product, setProduct] = useState({
    searchProduct: "",
    local: "",
    description: "",
    lastPrice: 0.0,
    amount: 0,
    mark: {
      description: "",
    },
  });

  const { locals } = GetLocalDescription(searchLocal);
  const { products, loading } = GetProductDescription(searchTerm);

  const resProduct = () => {
    setSearchTerm("");
    setProduct({
      searchProduct: "",
      local: "",
      description: "",
      lastPrice: 0.0,
      amount: 0,
      mark: {
        description: "",
      },
    });
  };

  const handleAddProduct = () => {
    const { description, lastPrice, amount } = product;

    if (product.description && amount > 0) {
      const totalValue = amount * product.lastPrice;
      setProductsList([
        ...productsList,
        {
          description: description,
          amount,
          unitPrice: lastPrice,
          totalValue,
        },
      ]);
      resProduct();
    }
  };

  const handleProductSelect = (selectedProduct: any) => {
    setProduct({
      searchProduct: selectedProduct.searchProduct,
      local: selectedProduct.local,
      description: selectedProduct.description,
      mark: {
        description: selectedProduct.mark.description,
      },
      lastPrice: selectedProduct.lastPrice,
      amount: selectedProduct.amount,
    });
    setSearchTerm(selectedProduct.description);
    setShowList(false); // Oculta a lista após a seleção
  };

  const handleInputChange = (e: any) => {
    setSearchTerm(e.target.value);
    setShowList(true); // Mostra a lista quando o usuário digita
  };

  const handleLocationSelect = (selectedLocation: any) => {
    setSearchLocal(selectedLocation.description); // Define o nome do local selecionado
    setShowListLocal(false); // Fecha a lista após a seleção
  };

  const handleLocationInputChange = (e: any) => {
    setSearchLocal(e.target.value);
    setShowListLocal(true); // Mostra a lista de locais ao digitar
  };

  const handleClearPurchase = () => {
    setProductsList([]);
    setSearchLocal("");
    setShowOverlay(false);
  };

  const clean = () => {
    resProduct();
    setShowList(false);
  };

  const calculateTotalPurchase = () =>
    productsList.reduce((acc, item) => acc + item.totalValue, 0);

  return (
    <div className="lg:w-full max-w-lg mx-auto space-y-2 p-6 pt-4 bg-red-100 bg-opacity-20 rounded-3xl">
      <div className="flex justify-between items-center p-2 space-x-3">
        <h1 className="text-2xl font-bold text-center select-none">
          Nova Compra
        </h1>

        <div className="relative w-full sm:w-1/3">
          <input
            disabled={productsList.length > 0}
            title={`${productsList.length < 1 ? "Selecione o local de compra" : "Local ja informado"}`}
            type="text"
            placeholder="Local"
            value={searchLocal}
            onChange={handleLocationInputChange}
            className={`w-full text-black border px-3 py-2 rounded shadow ${productsList.length > 0 ? "cursor-not-allowed select-none" : ""}`}
          />

          {/* Lista de locais */}
          {!loading && showListLocal && searchLocal && (
            <ul className="absolute z-50 bg-zinc-300 border rounded mt-2 shadow-md max-h-48 overflow-y-auto">
              {locals.map((location) => (
                <li
                  key={location.id}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLocationSelect(location)}
                >
                  <div className="text-sm font-medium text-gray-800">
                    {location.description}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <ButtonHome />
      </div>

      <div className="relative text-center items-center">
        <input
          type="text"
          placeholder="Produto"
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full text-black border px-3 py-2 rounded shadow"
        />
        {!loading && showList && products.length > 0 && (
          <ul className="absolute w-full bg-zinc-300 border rounded mt-2 shadow-md max-h-48 overflow-y-auto">
            {products.map((product) => (
              <li
                key={product.id}
                className="p-3 hover:bg-gray-100 cursor-pointer border border-red-800"
                onClick={() => handleProductSelect(product)}
              >
                <div className="text-sm font-medium text-gray-800 cursor-pointer">
                  {product.description}
                </div>
                <div className="text-xs text-gray-900">
                  {product.mark.description}
                </div>
              </li>
            ))}
          </ul>
        )}

        {!loading && showList && products.length === 0 && searchTerm && (
          <p className="absolute justify-center text-center select-none text-gray-100 p-5">
            Nenhum produto encontrado.
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center sm:items-start sm:space-x-2 w-full space-y-2 sm:space-y-0">
        <div className="w-full sm:w-1/3">
          <input
            type="text"
            value={product.mark.description}
            disabled
            placeholder="Marca"
            className="text-black border w-full px-3 py-2 rounded shadow bg-zinc-300 cursor-not-allowed"
          />
        </div>

        <div className="w-full sm:w-1/3">
          <input
            type="text"
            value={
              product.lastPrice > 0
                ? `R$ ${FormatMoney(product.lastPrice)}`
                : "R$ 0,00"
            }
            placeholder="Valor"
            onChange={(e) => {
              const numericValue = FormatStringMoney(e.target.value);
              setProduct({
                ...product,
                lastPrice: isNaN(numericValue) ? 0 : numericValue / 100,
              });
            }}
            className="w-full text-black border px-3 py-2 rounded shadow"
          />
        </div>

        <div className="w-full sm:w-1/3">
          <input
            type="number"
            min={0}
            value={product.amount > 0 ? product.amount : ""}
            onChange={(e) =>
              setProduct({ ...product, amount: parseInt(e.target.value) })
            }
            placeholder="Quantidade"
            className="w-full text-black border px-3 py-2 rounded shadow"
          />
        </div>
      </div>

      {loading && (
        <p className="text-center text-gray-900 opacity-95 mt-2">
          Carregando...
        </p>
      )}

      {/* Botões */}
      <div className="flex justify-between pt-1 space-x-2">
        <button
          type="reset"
          className="w-full bg-red-300 py-2 px-4 rounded-lg hover:bg-red-400"
          onClick={clean}
        >
          Limpar Produto
        </button>
        <button
          type="button"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          onClick={handleAddProduct}
        >
          Incluir no Carrinho
        </button>
        <button
          type="button"
          title={
            productsList.length < 1
              ? "Inclua ao menos produto para ver o carrinho"
              : "Veja seu carrinho"
          }
          disabled={productsList.length < 1}
          className={`w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 ${productsList.length < 1 ? "cursor-not-allowed select-none bg-zinc-400 hover:bg-zinc-400" : ""}`}
          onClick={() => setShowOverlay(true)}
        >
          Mostrar Carrinho
        </button>
      </div>

      {/* Sobreposição */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 text-black">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Produtos do Carrinho</h2>
            {productsList.map((item, index) => (
              <ul key={index} className="max-h-64 overflow-y-auto">
                <li className="p-2 border-b">
                  <div>
                    <strong># {index + 1}:</strong> {item.description}
                  </div>
                  <div>
                    <div className="flex flex-row justify-between">
                      Unid.: {item.amount}
                      <div>Preço: R$ {FormatMoney(item.unitPrice)}</div>
                      Total: R$ {FormatMoney(item.totalValue)}
                    </div>
                  </div>
                </li>
              </ul>
            ))}
            <div className="mt-4 text-end pr-2">
              <div className="font-bold">
                Valor Total: R$ {FormatMoney(calculateTotalPurchase())}
              </div>
            </div>
            <div className="flex flex-row space-x-2 mt-4">
              <button
                type="button"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                onClick={() => setShowOverlay(false)}
              >
                Continuar Comprando
              </button>
              <button
                type="button"
                className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
                onClick={handleClearPurchase}
              >
                Limpar Carrinho
              </button>
            </div>
            <div className="mt-2">
              <button
                type="button"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                onClick={handleClearPurchase}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
