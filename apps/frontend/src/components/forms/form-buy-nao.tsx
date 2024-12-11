// "use client";

// // TODO: REFATORAR O CÓDIGO COMPLETO

// import { QrReader } from "react-qr-reader";

// import useBuy from "@/data/hooks/use-buy";
// import useLocal from "@/data/hooks/use-local";
// import useMessage from "@/data/hooks/use-message";
// import useProduct from "@/data/hooks/use-product";
// import { Local, Product } from "core";
// import { useState } from "react";
// import MyInput from "../shared/My-Input";
// import Steps from "../shared/Steps";
// import FormBuyCart from "./form-buy-cart";

// // Tipo para a lista de produtos no contexto de compra
// type BuyProductItem = {
//   productId: string;
//   description: string;
//   mark: string;
//   unitPrice: number;
//   amount: number;
//   totalPrice: number;
// };

// export default function FormBuy() {
//   const [showScanner, setShowScanner] = useState(false);

//   const { buy, saveBuy, updateBuy } = useBuy();
//   const { msgSucess } = useMessage();

//   const [totalValueBuy, setTotalValueBuy] = useState(0);

//   const { productsData, queryProducts, setQueryProducts } = useProduct();
//   const [filteredProducts, setFilteredProducts] = useState<Partial<Product>[]>(
//     []
//   );

//   const { localsData, queryLocals, setQueryLocals, setDescriptionInUse } =
//     useLocal();
//   const [filteredLocals, setFilteredLocals] = useState<Partial<Local>[]>([]);

//   const [showList, setShowList] = useState(false);
//   const [showCart, setShowCart] = useState(false);

//   const [productsList, setProductsList] = useState<BuyProductItem[]>([]);

//   const labels = ["Local de Compra", "Adicionar Produtos"];

//   const authNextStep: boolean[] = [!!buy.localId, productsList.length > 0];

//   function calculateTotalValue(
//     productsList: { amount: number; unitPrice: number }[]
//   ): number {
//     return productsList.reduce(
//       (acc, product) => +(acc + product.amount * product.unitPrice).toFixed(2),
//       0
//     );
//   }

//   const handleAddProduct = (product: any) => {
//     const alreadyExists = productsList.some((p) => p.productId === product.id);
//     if (!alreadyExists) {
//       setProductsList((prev) => {
//         const updatedList = [
//           ...prev,
//           {
//             productId: product.id,
//             description: product.description,
//             mark: product.mark.description,
//             unitPrice: product.lastPrice,
//             amount: 1,
//             totalPrice: product.lastPrice,
//           },
//         ];

//         // Recalcular o valor total
//         setTotalValueBuy(calculateTotalValue(updatedList));
//         // msgSucess(
//         //   `${product.description} incluído. Valor Total: R$ ${totalValueBuy}`
//         // );

//         return updatedList;
//       });
//     }
//     setQueryProducts("");
//     setShowList(false);
//   };

//   const handleSelectLocal = (localId: string, description: string) => {
//     updateBuy({ ...buy, localId }); // Atualiza a marca no produto com o id da marca
//     setQueryLocals(description); // Define o texto no input
//     setShowList(false); // Fecha a lista de sugestões após a seleção
//     msgSucess(`Comprando em ${description}.`);
//   };

//   const handleUpdateProduct = (
//     productId: string,
//     field: string,
//     value: number
//   ) => {
//     setProductsList((prev) => {
//       const updatedList = prev.map((product) =>
//         product.productId === productId
//           ? {
//               ...product,
//               [field]: value,
//               totalPrice:
//                 field === "amount" || field === "unitPrice"
//                   ? (field === "amount" ? value : product.amount) *
//                     (field === "unitPrice" ? value : product.unitPrice)
//                   : product.totalPrice,
//             }
//           : product
//       );

//       // Recalcular o valor total após a atualização
//       setTotalValueBuy(calculateTotalValue(updatedList));

//       return updatedList;
//     });
//   };

//   const handleRemoveProduct = (productId: string) => {
//     setProductsList((prev) => {
//       const updatedList = prev.filter(
//         (product) => product.productId !== productId
//       );

//       // Recalcular o valor total após a remoção
//       setTotalValueBuy(calculateTotalValue(updatedList));
//       return updatedList;
//     });
//   };

//   const handleSaveBuy = () => {
//     const buyData = {
//       ...buy,
//       products: productsList.map((product) => ({
//         productId: product.productId,
//         amount: product.amount,
//         unitPrice: product.unitPrice,
//       })),
//     };
//     saveBuy(buyData);
//     msgSucess("Compra realizada com sucesso.");
//   };

//   const handleOnChangeProduct = (value: string) => {
//     setQueryProducts(value);

//     if (value.length === 0) {
//       setShowList(true);
//       setQueryProducts("");
//       updateBuy({ ...buy, products: [] });
//       return;
//     }
//     // Busca produtos que contenham a string digitada
//     const filteredProducts = productsData.filter(
//       (productData) =>
//         productData.description?.toUpperCase().includes(value.toUpperCase()) ||
//         productData.codeBar?.toUpperCase().includes(value.toUpperCase())
//     );

//     setFilteredProducts(filteredProducts);
//   };

//   const handleOnChangeLocal = (value: string) => {
//     setQueryLocals(value);

//     if (value.length === 0) {
//       setShowList(true);
//       setQueryLocals("");
//       updateBuy({});
//       return;
//     }
//     // Busca produtos que contenham a string digitada
//     const filteredLocals = localsData.filter((localData) =>
//       localData.description?.toUpperCase().includes(value.toUpperCase())
//     );

//     setFilteredLocals(filteredLocals);
//   };

//   const handleErro = (err: any) => {
//     console.error("Erro ao ler o código de barras:", err);
//     setShowScanner(false);
//   };

//   const handleScan = (data: string) => {
//     if (data) {
//       const produtoEncontrado = productsData.find(
//         (product) => product.codeBar === data
//       );

//       if (produtoEncontrado) {
//         handleSelectLocal(produtoEncontrado.id, produtoEncontrado.description);
//         setShowScanner(false); // Fecha o scanner após a leitura
//       } else {
//         alert("Produto não encontrado!");
//       }
//     }
//   };

//   // useEffect(() => {
//   //   cleanAll();
//   // }, [cleanAll]);

//   // useEffect(() => {
//   //   // if (queryLocals) {
//   //   const filtered = localsData.filter((local) =>
//   //     local.description?.toUpperCase().includes(queryLocals.toUpperCase())
//   //   );
//   //   setFilteredLocals(filtered);
//   //   setShowList(!!filtered);
//   //   return;
//   //   // } else {
//   //   //   setFilteredLocals([]);
//   //   //   setShowList(false);
//   //   //   setQueryLocals("");
//   //   //   updateBuy({});
//   //   // }
//   // }, [localsData, queryLocals, setQueryLocals, updateBuy]);

//   // useEffect(() => {
//   //   if (queryProducts) {
//   //     const filtered = productsData.filter((product) =>
//   //       product.description?.toUpperCase().includes(queryProducts.toUpperCase())
//   //     );
//   //     setFilteredProducts(filtered);
//   //     setShowList(!!filtered);
//   //     return;
//   //   } else {
//   //     setFilteredProducts([]);
//   //     setShowList(false);
//   //     setQueryProducts("");
//   //     updateBuy({});
//   //   }
//   // }, [queryProducts, productsData, setQueryProducts, updateBuy]);

//   // TODO: REFATORAR O COMPONENTE INPUT DE LISTA
//   return (
//     <div>
//       <Steps
//         labels={labels}
//         labelAction="Finalizar Compra"
//         actionExec={handleSaveBuy}
//         authNextStep={authNextStep}
//       >
//         <div className="relative flex flex-col">
//           <MyInput
//             label={`${localsData.length === 0 ? "Procurando locais.." : "Selecione um local"}`}
//             value={queryLocals ?? ""}
//             disabled={localsData.length === 0}
//             onBlur={() => {
//               setShowList(false);
//               setFilteredLocals([]);
//             }}
//             onFocus={() => {
//               setShowList(true);
//               setFilteredLocals(localsData);
//             }}
//             onChange={(event) => {
//               handleOnChangeLocal(event.target.value);
//             }}
//             className={`${localsData.length === 0 ? "bg-gray-200 border-dashed border-gray-400 opacity-50 cursor-not-allowed p-2 rounded-md w-full" : ""}`}
//           />

//           {!buy.localId && showList && (
//             <div
//               onMouseDown={(e) => e.preventDefault()}
//               className="absolute top-full mt-1 w-full bg-white border rounded-xl border-gray-300 shadow-lg max-h-48 overflow-auto z-50"
//             >
//               {filteredLocals.map((local) => (
//                 <div
//                   key={local.id}
//                   className="p-2 cursor-pointer hover:bg-gray-200"
//                   onClick={() =>
//                     handleSelectLocal(local.id || "", local.description || "")
//                   }
//                 >
//                   {local.description}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="relative flex flex-col">
//           <div>
//             <MyInput
//               label={`${productsData.length === 0 ? "Procurando produtos.." : "Selecione um produto"}`}
//               value={queryProducts ?? ""}
//               disabled={productsData.length === 0}
//               onBlur={() => {
//                 setShowList(false);
//                 setFilteredProducts([]);
//               }}
//               onFocus={() => {
//                 setShowList(true);
//                 setShowCart(false);
//                 setFilteredProducts(productsData);
//               }}
//               onChange={(event) => handleOnChangeProduct(event.target.value)}
//               className={`${productsData.length === 0 ? "bg-gray-200 border-dashed border-gray-400 opacity-50 cursor-not-allowed p-2 rounded-md w-full" : ""}`}
//             />
//             {/* Botão para abrir o leitor de código de barras */}
//             <button
//               type="button"
//               onClick={() => setShowScanner(true)}
//               className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
//             >
//               Ler Código de Barras
//             </button>
//           </div>
//           {/* Leitor de Código de Barras */}
//           {showScanner && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//               <div className="bg-white p-4 rounded-lg shadow-lg relative">
//                 <h2 className="text-lg font-bold mb-4">
//                   Leitor de Código de Barras
//                 </h2>
//                 <QrReader
//                   onResult={(result, error) => {
//                     if (!!result) {
//                       handleScan(result?.text);
//                     } else if (!!error) {
//                       handleErro(error);
//                     }
//                   }}
//                   // style={{ width: "300px" }}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowScanner(false)}
//                   className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
//                 >
//                   Fechar
//                 </button>
//               </div>
//             </div>
//           )}
//           {!showCart && showList && (
//             <div
//               onMouseDown={(e) => e.preventDefault()}
//               className="absolute w-full top-full mt-1 bg-white border rounded-md shadow-lg max-h-48 overflow-auto z-50"
//             >
//               {filteredProducts.map((product) => (
//                 <div
//                   key={product.id}
//                   className="p-2 cursor-pointer hover:bg-gray-200"
//                   onClick={() => handleAddProduct(product)}
//                 >
//                   {product.description ?? ""}
//                   <span className="text-sm text-zinc-400">
//                     {" - "}
//                     {product.mark?.description ?? ""}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//           {!showList && productsList.length > 0 && (
//             <button
//               type="button"
//               className="w-full botao amarelo mt-2"
//               onClick={() => {
//                 if (showCart) {
//                   setShowCart(false);
//                 } else {
//                   setShowCart(true);
//                 }
//               }}
//             >
//               Carrinho ({productsList.length}) R$ {totalValueBuy}
//             </button>
//           )}
//           {showCart && (
//             <div>
//               <FormBuyCart
//                 listCurrent={productsList}
//                 handleRemoveProduct={handleRemoveProduct}
//                 handleUpdateProduct={handleUpdateProduct}
//               />
//             </div>
//             // <div className="mt-2 max-h-52 overflow-auto rounded-lg">
//             //   {productsList.map((product) => (
//             //     <div
//             //       key={product.productId}
//             //       className="flex items-center gap-4 p-2 pt-1 border rounded-md bg-zinc-200 mb-2 mr-2"
//             //     >
//             //       <div className="flex-1">
//             //         <div className="flex flex-row justify-between items-center">
//             //           <div className="text-lg text-start">
//             //             {product.description}
//             //           </div>
//             //           <div className="text-red-500 font-bold ml-2">
//             //             <button
//             //               type="button"
//             //               title="Excluir"
//             //               onClick={() => handleRemoveProduct(product.productId)}
//             //             >
//             //               X
//             //             </button>
//             //           </div>
//             //         </div>
//             //         <div className="flex flex-row justify-between items-center">
//             //           <div className="text-gray-500 text-xs">
//             //             {product.mark}
//             //           </div>
//             //         </div>
//             //         <div className="flex flex-col justify-between items-center">
//             //           <div>
//             //             <label className="text-sm">Quantidade:</label>
//             //             <input
//             //               placeholder="quantidade"
//             //               type="number"
//             //               min="1"
//             //               value={product.amount ?? 1}
//             //               onChange={(e) =>
//             //                 handleUpdateProduct(
//             //                   product.productId,
//             //                   "amount",
//             //                   +e.target.value
//             //                 )
//             //               }
//             //               className="w-16 border bg-zinc-300/0 rounded-lg p-1 text-center text-black"
//             //             />
//             //           </div>
//             //           <div>
//             //             <label className="text-sm">Preço: R$</label>
//             //             <input
//             //               className="w-20 border bg-zinc-300/0 rounded-lg p-1 text-center text-black m-1"
//             //               placeholder="Preço"
//             //               type="number"
//             //               min="0"
//             //               value={product.unitPrice.toFixed(2) ?? 0}
//             //               onChange={(e) =>
//             //                 handleUpdateProduct(
//             //                   product.productId,
//             //                   "unitPrice",
//             //                   +e.target.value
//             //                 )
//             //               }
//             //             />
//             //           </div>
//             //         </div>
//             //         <div className="text-sm text-gray-500 justify-between items-center">
//             //           Total: R$ {product.totalPrice.toFixed(2) ?? 0}
//             //         </div>
//             //       </div>
//             //     </div>
//             //   ))}
//             // </div>
//           )}
//         </div>
//       </Steps>
//     </div>
//   );
// }
