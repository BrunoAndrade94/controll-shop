import React, { useState, useEffect } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Product } from "core"; // Tipo do produto
import useProduct from "@/data/hooks/use-product";
import MyModal from "../lists/my-modal";

const ProductList = () => {
  const { getProduct, updateProduct, product, setProduct } = useProduct(); // Acessando o contexto do produto
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a abertura do modal
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  ); // ID do produto selecionado
  const [editedProduct, setEditedProduct] = useState<Product | null>(null); // Produto sendo editado

  // Função para abrir o modal de edição
  const handleEditProduct = (id: number) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
    // Preencher o produto com os dados do produto selecionado
    const productToEdit = getProduct(id);
    setEditedProduct(productToEdit); // Atualizando o estado do produto editado
  };

  // Função para salvar as alterações no produto
  const handleSaveProduct = () => {
    if (editedProduct) {
      // Atualiza o produto utilizando o método do contexto
      updateProduct(editedProduct);
      setIsModalOpen(false); // Fecha o modal após salvar
    }
  };

  // Função para lidar com mudanças nos campos do produto
  const handleChange = (field: string, value: string) => {
    if (editedProduct) {
      setEditedProduct({
        ...editedProduct,
        [field]: value, // Atualiza o campo modificado
      });
    }
  };

  return (
    <div>
      {/* Tabela de produtos */}
      <div className="overflow-auto max-h-[22rem] rounded-lg bg-zinc-800/40">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {/* Cabeçalhos da tabela */}
              {columns.map(({ label }, index) => (
                <th
                  key={index}
                  className="border-b px-4 py-2 text-left select-none sticky top-0 bg-purple-200 z-10"
                >
                  {label}
                </th>
              ))}
              <th className="border-b px-4 py-2 text-left select-none sticky top-0 bg-purple-200 z-10">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  {columns.map(({ key, formatter }, colIndex) => (
                    <td
                      key={colIndex}
                      className="border-b px-3 py-1 text-white select-none xs:text-sm"
                    >
                      {formatter
                        ? formatter(item[key as keyof T])
                        : String(item[key as keyof T])}
                    </td>
                  ))}
                  <td className="border-b py-1">
                    <div className="flex justify-between space-x-2 px-1">
                      <button
                        title="Compras"
                        type="button"
                        className="bg-blue-400 p-1 rounded-full"
                        onClick={() => handleRowClick(item)}
                      >
                        <VisibilityIcon />
                      </button>
                      <button
                        title="Editar"
                        type="button"
                        className="bg-yellow-400 p-1 rounded-full"
                        onClick={() => handleEditProduct(item.id)} // Abre o modal de edição
                      >
                        <EditIcon />
                      </button>
                      <button
                        title="Excluir"
                        type="button"
                        className="bg-red-400 p-1 rounded-full"
                        onClick={() => {}}
                      >
                        <DeleteForeverIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center px-4 py-2 text-white"
                >
                  Nenhum item encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para editar o produto */}
      <MyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Editar Produto"
      >
        {editedProduct && (
          <div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm text-white">
                Descrição
              </label>
              <input
                type="text"
                id="description"
                value={editedProduct.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full p-2 rounded-lg text-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="brand" className="block text-sm text-white">
                Marca
              </label>
              <input
                type="text"
                id="brand"
                value={editedProduct.mark?.description || ""}
                onChange={(e) => handleChange("brand", e.target.value)}
                className="w-full p-2 rounded-lg text-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="barcode" className="block text-sm text-white">
                Código de Barras
              </label>
              <input
                type="text"
                id="barcode"
                value={editedProduct.codeBar || ""}
                onChange={(e) => handleChange("barcode", e.target.value)}
                className="w-full p-2 rounded-lg text-black"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white p-2 rounded-lg"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={handleSaveProduct}
                className="bg-blue-500 text-white p-2 rounded-lg"
              >
                Salvar
              </button>
            </div>
          </div>
        )}
      </MyModal>
    </div>
  );
};

export default ProductList;
