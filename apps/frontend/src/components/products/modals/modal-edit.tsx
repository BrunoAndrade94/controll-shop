"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  description: string;
  brand: string;
  barcode: string;
}

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number | null; // O ID do produto a ser editado
  onSave: (product: Product) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  productId,
  onSave,
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isConfirming, setIsConfirming] = useState(false); // Estado para confirmação de salvamento
  const [isValid, setIsValid] = useState(true); // Estado para validação

  useEffect(() => {
    if (productId) {
      // Aqui você faria uma requisição para buscar o produto pelo ID
      // Exemplo:
      // fetch(`api/products/${productId}`)
      //   .then(response => response.json())
      //   .then(data => setProduct(data));
      setProduct({
        id: productId,
        description: "Produto exemplo", // Substitua com dados reais
        brand: "Marca exemplo",
        barcode: "123456789",
      });
    }
  }, [productId]);

  const handleSave = () => {
    if (product && isValid) {
      // Chama a função de salvar após a confirmação
      onSave(product);
      onClose(); // Fecha o modal
    }
  };

  const handleConfirmSave = () => {
    setIsConfirming(true); // Mostra a confirmação
  };

  const handleCancelSave = () => {
    setIsConfirming(false); // Cancela a confirmação
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (product) {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-purple-300 rounded-lg shadow-lg w-full max-w-md mx-auto xs:w-2/3 m-3 p-4 flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Editar Produto</h2>
        </div>
        <div className="mt-4">
          {/* Formulário de Edição */}
          <div className="mb-4">
            <label className="block text-sm">Descrição:</label>
            <input
              title="DESCRICAO"
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 rounded-lg bg-purple-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm">Marca:</label>
            <input
              title="OLHAR"
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 rounded-lg bg-purple-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm">Código de Barras:</label>
            <input
              title="VER"
              type="text"
              name="barcode"
              value={product.barcode}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 rounded-lg bg-purple-100"
            />
          </div>

          {isConfirming ? (
            <div className="flex flex-col items-center">
              <p className="text-sm mb-4">
                Tem certeza que deseja salvar as alterações?
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-green-500 px-4 py-2 rounded-lg text-white"
                >
                  Sim
                </button>
                <button
                  type="button"
                  onClick={handleCancelSave}
                  className="bg-red-500 px-4 py-2 rounded-lg text-white"
                >
                  Não
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleConfirmSave}
                className="bg-blue-500 px-4 py-2 rounded-lg text-white"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 px-4 py-2 rounded-lg text-white"
              >
                Voltar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
