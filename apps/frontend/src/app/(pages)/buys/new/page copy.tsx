// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
// import { BuyProducts, Product } from "core";
// import Link from "next/link";
// import { useState } from "react";

// export default function New() {
//   const [buyProducts, setBuyProducts] = useState<BuyProducts>();
//   const [products, setProducts] = useState<Product>();

//   const handleInputChange = (event: any) => {
//     // setDescricao(event.target.value.descricao); // Atualiza o estado com o valor digitado
//     // setMarca(event.target.value.marca); // Atualiza o estado com o valor digitado
//     // setDataProduct(event.target); // Atualiza o estado com o valor digitado
//   };

//   // Função para capturar os valores ao clicar no botão
//   const handleSubmit = () => {
//     // console.log("Dados do Formulário:", buyProducts, products);
//     // Aqui você pode armazenar a variável ou enviar os dados para uma API
//   };

//   // useEffect(() => {
//   //   return () => {};
//   // }, [descricao, marca]);

//   return (
//     <div className="flex justify-center items-center">
//       <div className="w-full max-w-96 bg-zinc-100 p-8 rounded-lg border-4 border-zinc-500 shadow-md">
//         <h2 className="text-2xl font-bold text-center mb-6 text-zinc-600">
//           Nova Compra
//         </h2>
//         <form className="space-y-4">
//           {/* Inputs */}
//           <input
//             value={""}
//             id="local"
//             onChange={handleInputChange}
//             placeholder="Local"
//             type="text"
//             className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:focus:text-zinc-300 text-zinc-700"
//           />

//           <input
//             value={products?.description}
//             id="products"
//             onChange={handleInputChange}
//             placeholder="Produto"
//             type="text"
//             className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:focus:text-zinc-300 text-zinc-700"
//           />

//           <input
//             id="amount"
//             value={""}
//             onChange={handleInputChange}
//             type="number"
//             placeholder="Quantidade"
//             className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:focus:text-zinc-300 text-zinc-700"
//           />

//           <input
//             id="unitPrice"
//             value={""}
//             onChange={handleInputChange}
//             type="number"
//             placeholder="Preço"
//             className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:focus:text-zinc-300 text-zinc-700"
//           />

//           {/* Botões */}
//           <div className="flex justify-between space-x-4">
//             <button
//               type="reset"
//               className="w-full bg-violet-400 text-white py-2 px-4 rounded-lg hover:bg-violet-600"
//             >
//               Limpar
//             </button>
//             <button
//               type="button"
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
//               onClick={handleSubmit}
//             >
//               Cadastrar
//             </button>
//           </div>

//           <Link href={"../"}>
//             <div className="w-full bg-green-600 text-white py-2 mt-4 rounded-lg hover:bg-green-800 text-center">
//               <span>Voltar</span>
//             </div>
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// }
