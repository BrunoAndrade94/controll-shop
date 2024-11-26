"use client";
import { useState } from "react";
import { GetProductDescription } from "../../../hook/product/get-products-description";

export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const { products, loading } = GetProductDescription(searchTerm);
  const [showListProducts, setShowListProducts] = useState(false);
  const [product, setProduct] = useState({
    description: "",
    lastPrice: 0.0,
    mark: {
      description: "",
    },
  });

  const reset = () => {
    setSearchTerm("");
    setProduct({
      description: "",
      lastPrice: 0,
      mark: { description: "" },
    });
    setShowListProducts(false);
  };

  const handleProductSelect = (selectedProduct: any) => {
    setProduct({
      description: selectedProduct.description,
      mark: {
        description: selectedProduct.mark.description,
      },
      lastPrice: selectedProduct.lastPrice,
    });
    setSearchTerm(selectedProduct.description);
    setShowListProducts(false); // Oculta a lista após a seleção
  };

  const handleInputChange = (e: any) => {
    setSearchTerm(e.target.value);
    setShowListProducts(true); // Mostra a lista quando o usuário digita
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-2 p-8 bg-zinc-900 bg-opacity-40 rounded-3xl">
      <h1 className="text-2xl font-bold text-center mb-2 select-none">
        Buscar Produtos
      </h1>

      <input
        type="text"
        placeholder="Produto"
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full text-black border px-3 py-2 rounded shadow"
      />

      <div className="flex flex-row space-x-2 text-black">
        <div>
          <input
            type="number"
            value={product.lastPrice}
            placeholder="Valor"
            className="w-full text-black border px-3 py-2 rounded shadow"
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Quantidade"
            className="w-full text-black border px-3 py-2 rounded shadow"
          />
        </div>
      </div>
      <div className="flex flex-row space-x-2">
        <div>
          <input
            type="text"
            value={product.mark.description}
            readOnly
            placeholder="Marca"
            className="text-black border px-3 py-2 rounded shadow bg-zinc-300"
          />
        </div>
        <div>
          <input
            type="number"
            readOnly
            placeholder="Valor Total"
            className="w-full text-black border px-3 py-2 rounded shadow bg-zinc-300"
          />
        </div>
      </div>

      {loading && (
        <p className="text-center text-gray-500 opacity-95 mt-2">
          Carregando...
        </p>
      )}

      {!loading && products.length > 0 && (
        <ul className="bg-zinc-300 border rounded mt-2 shadow-md max-h-48 overflow-y-auto">
          {products.map((product) => (
            <li
              key={product.id}
              className="p-3 hover:bg-gray-100 cursor-pointer border border-red-800"
              onClick={() => handleProductSelect(product.description)}
            >
              <div className="text-sm font-medium text-gray-800">
                {product.description}
              </div>
              <div className="text-xs text-gray-900">
                {product.mark.description}
              </div>
            </li>
          ))}
        </ul>
      )}

      {!loading && products.length === 0 && searchTerm && (
        <p className="text-center select-none text-gray-100 p-5">
          Nenhum produto encontrado.
        </p>
      )}

      {/* Botões */}
      <div className="flex justify-between space-x-2">
        <button
          type="reset"
          className="w-full bg-red-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
          onClick={reset}
        >
          Limpar
        </button>
        <button
          type="button"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Incluir Produto
        </button>
      </div>
    </div>
  );
}
