"use client";
import { useState } from "react";

interface Product {
  id: string;
  description: string;
}

export default function New() {
  const [search, setSearch] = useState<string>(""); // Termo de busca
  const [products, setProducts] = useState<Product[]>([]); // Produtos encontrados
  const [selectedProduct, setSelectedProduct] = useState<string>(""); // Produto selecionado

  // Função para buscar os produtos
  const fetchProducts = async (term: string) => {
    if (term.length === 0) {
      setProducts([]);
      return;
    }

    try {
      const res = await fetch(`/api/products?search=${term}`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  // Função executada ao digitar no campo
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    fetchProducts(value); // Faz a busca a cada caractere
  };

  // Função para selecionar um produto
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product.description); // Preenche o campo com a descrição do produto
    setSearch(""); // Limpa a busca
    setProducts([]); // Oculta a lista de produtos
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md bg-zinc-300 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-zinc-600">
          Nova Compra
        </h1>
        <form className="space-y-4">
          {/* Campo de busca de produto */}
          <div className="relative">
            <input
              type="text"
              value={selectedProduct || search}
              onChange={handleSearchChange}
              placeholder="Produto"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Lista de resultados */}
            {products.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                {products.map((product) => (
                  <li
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  >
                    {product.description}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Outros campos */}
          <input
            type="number"
            placeholder="Valor"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Marca"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Botões */}
          <div className="flex justify-between space-x-4">
            <button
              type="button"
              className="w-full bg-red-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
            >
              Limpar
            </button>
            <button
              type="button"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
