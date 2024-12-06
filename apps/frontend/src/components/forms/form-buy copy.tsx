// "use client";

// import useBuy from "@/data/hooks/use-buy";
// import useLocal from "@/data/hooks/use-local";
// import useMessage from "@/data/hooks/use-message";
// import useProduct from "@/data/hooks/use-product";
// import { BuyProducts, Local, Product } from "core";
// import { useEffect, useState } from "react";
// import MyInput from "../shared/My-Input";
// import Steps from "../shared/Steps";

// export default function FormBuy() {
//   const { msgSucess } = useMessage();
//   const [queryLocals, setQueryLocals] = useState("");
//   const [queryProducts, setQueryProducts] = useState("");
//   // PADRÃO
//   const { buy, saveBuy, updateBuy } = useBuy();
//   const labels = ["Onde vamos comprar?", "Produtos", "Fechar Compra"];
//   // VERIFICADO
//   const [showList, setShowList] = useState(false);
//   const { local, localsLocal } = useLocal(); // Pega local do contexto
//   const { product, productsLocal } = useProduct(); // Pega produto do contexto
//   const [productsList, setProductsList] = useState<Partial<Product>[]>([]); // Lista de produtos adicionados
//   const [filteredLocals, setFilteredLocals] = useState<Partial<Local>[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Partial<Product>[]>(
//     []
//   );

//   const handleSelectLocal = (localId: string, description: string) => {
//     updateBuy({ ...buy, localId }); // Atualiza a marca no produto com o id da marca
//     setQueryLocals(description); // Define o texto no input
//     setShowList(false); // Fecha a lista de sugestões após a seleção
//     msgSucess("Item selelcionado com sucesso.");
//   };

//   const handleSelectProduct = (products: Partial<Product>[]) => {
//     updateBuy({ ...buy, products }); // Atualiza a marca no produto com o id da marca
//     setQueryProducts(description); // Define o texto no input
//     setShowList(false); // Fecha a lista de sugestões após a seleção
//     msgSucess("Item selelcionado com sucesso.");
//   };

//   useEffect(() => {
//     if (queryLocals.length > 0) {
//       const filtered = localsLocal.filter(
//         (local) =>
//           local.description?.toUpperCase().includes(queryLocals.toUpperCase()) // Filtra as marcas conforme o texto
//       );
//       setFilteredLocals(filtered);
//       setShowList(!!filtered);
//     } else {
//       setFilteredLocals([]);
//       setShowList(false); // Esconde a lista quando não há texto no input
//     }
//     if (queryProducts.length > 0) {
//       const filtered = productsLocal.filter(
//         (product) =>
//           product.description?.toUpperCase().includes(queryLocals.toUpperCase()) // Filtra as marcas conforme o texto
//       );
//       setFilteredProducts(filtered);
//       setShowList(!!filtered);
//     } else {
//       setFilteredProducts([]);
//       setShowList(false); // Esconde a lista quando não há texto no input
//     }
//   }, [queryLocals, localsLocal, queryProducts, productsLocal]); // Atualiza sempre que a query ou fetchLocals muda

//   const authNextStep: boolean[] = [!!buy.localId, !!buy.products];

//   return (
//     <Steps
//       labels={labels}
//       labelAction="Salvar"
//       actionExec={saveBuy}
//       authNextStep={authNextStep}
//     >
//       <div className="flex flex-col gap-5">
//         <MyInput
//           label="Local"
//           description="Informe o Local"
//           value={queryLocals}
//           onFocus={() => {
//             setShowList(true);
//             setFilteredLocals(localsLocal);
//           }}
//           onChange={(event) => setQueryLocals(event.target.value)}
//         />
//         {!buy.localId && showList ? (
//           <div
//             onMouseDown={(e) => e.preventDefault()}
//             className="relative top-full left-0 w-full bg-white border rounded-xl border-gray-300 shadow-lg max-h-52 overflow-auto"
//           >
//             {filteredLocals.map((local) => (
//               <div
//                 key={local.id}
//                 className="p-2 cursor-pointer hover:bg-gray-200"
//                 onClick={() =>
//                   handleSelectLocal(local.id || "", local.description || "")
//                 }
//               >
//                 {local.description}
//               </div>
//             ))}
//           </div>
//         ) : null}
//       </div>
//       <div className="flex flex-col gap-5">
//         <MyInput
//           label="Produtos"
//           description="Informe os Produtos"
//           value={queryProducts}
//           onFocus={() => {
//             setShowList(true);
//             setFilteredProducts(productsLocal);
//           }}
//           onChange={(event) => setQueryProducts(event.target.value)}
//         />
//         {!buy.products && showList ? (
//           <div className="relative top-full left-0 w-full bg-white border rounded-xl border-gray-300 shadow-lg max-h-52 overflow-auto">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="p-2 cursor-pointer hover:bg-gray-200"
//                 onClick={() =>
//                   handleSelectProduct(
//                     product.id || "",
//                     product.description || ""
//                   )
//                 }
//               >
//                 {product.description}
//               </div>
//             ))}
//           </div>
//         ) : null}
//       </div>
//       <div></div>
//     </Steps>
//   );
// }
