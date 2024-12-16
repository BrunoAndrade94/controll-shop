// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
// import { useState } from "react";

// export default function New() {
//   const [descricao, setDescricao] = useState<string>("");
//   const [marca, setMarca] = useState<string>("");

//   // Função para atualizar os valores dos inputs
//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = event.target;
//     if (id === "descricao") {
//       setDescricao(value);
//     } else if (id === "marca") {
//       setMarca(value);
//     }
//   };

//   // Função para enviar os dados ao clicar no botão "Cadastrar"
//   const handleSubmit = async () => {
//     // Verifica se ambos os campos estão preenchidos
//     if (!descricao) {
//       alert("Por favor, preencha todos os campos.");
//       return;
//     }

//     const productData = {
//       descricao,
//       marca,
//     };

//     try {
//       const response = await fetch("http://localhost:4000/api/products/new", {
//         method: "POST", // Método POST para enviar os dados
//         headers: {
//           "Content-Type": "application/json", // Define que os dados serão enviados como JSON
//         },
//         body: JSON.stringify(productData), // Envia os dados convertidos em JSON
//       });

//       // Verifica se a resposta foi bem-sucedida
//       if (response.ok) {
//         alert("Produto cadastrado com sucesso!");
//         // Limpa os campos após o envio
//         setDescricao("");
//         setMarca("");
//       } else {
//         alert("Erro ao cadastrar produto.");
//       }
//     } catch (error) {
//       console.error("Erro ao enviar dados:", error);
//       alert("Ocorreu um erro ao enviar os dados.");
//     }
//   };

//   // Função para limpar os campos do formulário
//   const handleClear = () => {
//     setDescricao("");
//     setMarca("");
//   };

//   return (
//     <div className="flex justify-center items-center">
//       <div className="w-full max-w-md bg-zinc-300 p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center mb-6 text-zinc-600">
//           Novo Produto
//         </h2>
//         <form className="space-y-4">
//           {/* Input Descrição */}
//           <input
//             value={descricao}
//             id="descricao"
//             onChange={handleInputChange}
//             placeholder="Descrição"
//             type="text"
//             className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:focus:text-zinc-300 text-zinc-700"
//           />

//           {/* Input Marca */}
//           <input
//             id="marca"
//             value={marca}
//             onChange={handleInputChange}
//             type="text"
//             placeholder="Marca"
//             className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:focus:text-zinc-300 text-zinc-700"
//           />

//           {/* Botões */}
//           <div className="flex justify-between space-x-4">
//             <button
//               type="reset"
//               className="w-full bg-red-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
//               onClick={handleClear}
//             >
//               Limpar
//             </button>
//             <button
//               type="button"
//               className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//               onClick={handleSubmit}
//             >
//               Cadastrar
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
