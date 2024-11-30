// "use client";

// import useProduct from "@/data/contexts/use-product";
// import { FormatMoney, FormatStringMoney, Mark } from "core";
// import { useEffect, useState } from "react";
// import MyInput from "../shared/My-Input";
// import Steps from "../shared/Steps";

// export default function FormProduct() {
//   const [filteredMarks, setFilteredMarks] = useState<Partial<Mark>[]>([]);

//   const [query, setQuery] = useState(""); // Texto digitado no input

//   const { product, saveProduct, updateProduct, descriptionInUse, fetchMarks } =
//     useProduct();
//   const [showList, setShowList] = useState(false); // Controla a visibilidade da lista
//   const labels = ["Descrição", "Valor Inicial", "Código de Barras", "Marca"];

//   const authNextStep: boolean[] = [
//     !!product.description && !descriptionInUse,
//     !!product.lastPrice,
//     !!product.codeBar,
//     !!product.markId,
//   ];

//   // Filtra as marcas com base no texto digitado
//   useEffect(() => {
//     if (query.length > 0 && fetchMarks.length) {
//       console.log("Query digitada:", query);
//       console.log("Lista de marcas:", fetchMarks);

//       const filtered = fetchMarks.filter((markItem) =>
//         markItem.description?.toUpperCase().includes(query.toUpperCase())
//       );
//       console.log("Marcas filtradas:", filtered);

//       setFilteredMarks(filtered);
//       setShowList(filtered.length > 0);
//     } else {
//       setFilteredMarks([]);
//       setShowList(false);
//     }
//   }, [query, fetchMarks]);

//   const handleSelectMark = (markId: string, description: string) => {
//     updateProduct({ ...product, markId }); // Atualiza o produto com o ID da marca
//     setQuery(description); // Define o nome da marca selecionada no campo
//     setShowList(false); // Esconde a lista após selecionar
//   };

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
//             value={product.description ?? ""}
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
//             value={product.codeBar!}
//             onChange={(event) => {
//               updateProduct({ ...product, codeBar: event.target.value });
//             }}
//           />
//         </div>
//         <div className="flex flex-col gap-5 relative">
//           <MyInput
//             label="Marca"
//             description="Informe a Marca do produto"
//             value={query} // Mostra a descrição da marca no input
//             onChange={(event) => setQuery(event.target.value)} // Atualiza a query conforme o usuário digita
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
