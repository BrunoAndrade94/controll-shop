// "use client";

// import useMark from "@/data/contexts/use-mark";
// import useProduct from "@/data/contexts/use-product";
// import { FormatMoney, FormatStringMoney, Mark } from "core";
// import { useEffect, useState } from "react";
// import MyInput from "../shared/My-Input";
// import Steps from "../shared/Steps";

// export default function FormProduct() {
//   const { mark, loadingMark, updateMark, marksLocal } = useMark(); // Pega as marcas do contexto
//   const [query, setQuery] = useState(""); // Texto digitado no input
//   const [filteredMarks, setFilteredMarks] = useState<Partial<Mark>[]>([]);
//   const [showList, setShowList] = useState(false);
//   const { product, saveProduct, updateProduct, descriptionInUse } =
//     useProduct();
//   const labels = ["Descrição", "Valor Inicial", "Código de Barras", "Marca"];

//   const handleSelectMark = (id: string, description: string) => {
//     updateMark({ ...mark, id }); // Atualiza a marca no produto com o id da marca
//     setQuery(description); // Define o texto no input
//     setShowList(false); // Fecha a lista de sugestões após a seleção
//   };

//   useEffect(() => {
//     if (query.length > 0) {
//       const filtered = marksLocal.filter(
//         (mark) => mark.description?.includes(query) // Filtra as marcas conforme o texto
//       );
//       setFilteredMarks(filtered);
//       setShowList(filtered.length > 0); // Exibe a lista se houver marcas filtradas
//     } else {
//       setFilteredMarks([]);
//       setShowList(false); // Esconde a lista quando não há texto no input
//     }
//   }, [query, marksLocal]); // Atualiza sempre que a query ou fetchMarks muda

//   const authNextStep: boolean[] = [
//     !!product.description && !descriptionInUse,
//     !!product.lastPrice,
//     !!product.codeBar,
//     !!product.mark?.description,
//   ];

//   return (
//     <div>
//       <Steps
//         labels={labels}
//         labelAction="Salvar"
//         actionExec={saveProduct}
//         authNextStep={authNextStep}
//       >
//         <div className="flex flex-col gap-5">
//           <MyInput
//             label="Descrição"
//             description="Informe o produto"
//             value={product?.description ?? ""}
//             onChange={(event) =>
//               updateProduct({ ...product, description: event.target.value })
//             }
//             error={descriptionInUse ? "Produto informado já está em uso." : ""}
//           />
//         </div>
//         <div className="flex flex-col gap-5">
//           <MyInput
//             label="Valor"
//             description="Informe o valor do produto"
//             value={
//               product.lastPrice! > 0
//                 ? `R$ ${FormatMoney(product.lastPrice!)}`
//                 : "R$ 0,00"
//             }
//             onChange={(event) => {
//               const formatString = FormatStringMoney(event.target.value);
//               updateProduct({ ...product, lastPrice: formatString });
//             }}
//           />
//         </div>
//         <div className="flex flex-col gap-5">
//           <MyInput
//             label="Código de Barras"
//             description="Informe o código de barras do produto"
//             value={product?.codeBar ?? ""}
//             onChange={(event) => {
//               updateProduct({ ...product, codeBar: event.target.value });
//             }}
//           />
//         </div>
//         <div className="flex flex-col gap-5">
//           <MyInput
//             label="Descrição"
//             description="Informe a Marca"
//             observation={`${(product.mark?.description?.length || 0) > 0 ? "Marca liberada para uso." : "Informe a marca para verificar se já existe."}`}
//             value={query} // Mostra a marca no input enquanto o usuário digita
//             onChange={(event) => setQuery(event.target.value)} // Atualiza o texto digitado
//             error={descriptionInUse ? "Marca já está em uso." : ""}
//           />

//           {/* Lista de Marcas filtradas */}
//           {showList && (
//             <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 shadow-lg max-h-60 overflow-auto z-10">
//               {filteredMarks.map((markItem) => (
//                 <div
//                   key={markItem.id}
//                   className="p-2 cursor-pointer hover:bg-gray-200"
//                   onClick={() =>
//                     handleSelectMark(markItem.id!, markItem.description ?? "")
//                   }
//                 >
//                   {markItem.description}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </Steps>
//     </div>
//   );
// }
