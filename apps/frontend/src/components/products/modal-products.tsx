// "use client";

// import { useState } from "react";
// import AdjustableLine from "../shared/Adjustable-Line";
// import MyInput from "../shared/My-Input";
// import MyModal from "../lists/my-modal";

// const ModalProduto = ({ isOpen, onClose, produto, onSave }) => {
//   // Estado interno para edição do produto
//   const [editedProduct, setEditedProduct] = useState(produto);

//   // Função para atualizar valores do produto durante a edição
//   const handleChange = (field, value) => {
//     setEditedProduct((prev) => ({ ...prev, [field]: value }));
//   };

//   // Função para salvar o produto após edição
//   const handleSave = () => {
//     onSave(editedProduct); // Passa o produto editado para a função de salvamento externa
//     onClose(); // Fecha o modal
//   };

//   return (
//     <MyModal isOpen={isOpen} onClose={onClose} title="Editar Produto">
//       {editedProduct && (
//         <div>
//           {/* Campo: Descrição do Produto */}
//           <div className="mb-4">
//             <label htmlFor="description" className="block text-sm text-white">
//               Descrição
//             </label>
//             <MyInput
//               id="description"
//               value={editedProduct.description || ""}
//               onChange={(e) => handleChange("description", e.target.value)}
//             />
//           </div>

//           {/* Campo: Marca do Produto */}
//           <div className="mb-4">
//             <label htmlFor="brand" className="block text-sm text-white">
//               Marca
//             </label>
//             <MyInput
//               id="brand"
//               value={editedProduct.mark?.description || ""}
//               onChange={(e) =>
//                 setEditedProduct((prev) => ({
//                   ...prev,
//                   mark: { ...prev.mark, description: e.target.value },
//                 }))
//               }
//             />
//           </div>

//           {/* Campo: Código de Barras */}
//           <div className="mb-4">
//             <label htmlFor="barcode" className="block text-sm text-white">
//               Código de Barras
//             </label>
//             <MyInput
//               id="barcode"
//               value={editedProduct.codeBar || ""}
//               onChange={(e) => handleChange("codeBar", e.target.value)}
//             />
//           </div>

//           {/* Linha ajustável (estética) */}
//           <AdjustableLine />

//           {/* Botões de ação */}
//           <div className="flex justify-end space-x-2 mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-400 text-white p-2 rounded-lg"
//             >
//               Voltar
//             </button>
//             <button
//               type="button"
//               onClick={handleSave}
//               className="bg-blue-500 text-white p-2 rounded-lg"
//             >
//               Salvar
//             </button>
//           </div>
//         </div>
//       )}
//     </MyModal>
//   );
// };

// export default ModalProduto;
