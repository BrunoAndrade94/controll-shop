// "use client";

// import useProduct from "@/data/hooks/use-product";
// import React from "react";
// import Webcam from "react-webcam";

// const BarcodeScanner = ({ onClose, onScan }: any) => {
//   const webcamRef = React.useRef(null);
//   const { product } = useProduct();

//   // Função simulada para processar o código de barras (substituir com sua lógica)
//   const handleScan = () => {
//     const fakeBarcode = product.codeBar || "23432423"; // Simulação
//     onScan(fakeBarcode); // Chama a função passada como prop para retornar o código
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
//       {/* Modal principal */}
//       <div className="relative bg-gray-900 p-4 rounded-lg w-full max-w-md">
//         {/* Título */}
//         <div className="text-center text-white mb-4">
//           <h2 className="text-xl font-bold">Escanear Código de Barras</h2>
//         </div>

//         {/* Área da câmera */}
//         <div className="relative">
//           <Webcam
//             ref={webcamRef}
//             audio={false}
//             className="w-full rounded-lg object-cover"
//             videoConstraints={{
//               facingMode: "environment", // Usa a câmera traseira no celular
//             }}
//           />

//           {/* Janela de foco (retangular) */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="border-4 border-green-500 w-64 h-16 bg-transparent"></div>
//           </div>
//         </div>

//         {/* Botões abaixo */}
//         <div className="flex flex-col mt-4">
//           <button
//             type="button"
//             onClick={handleScan}
//             className="bg-green-600 text-white py-2 px-4 rounded-md mb-2 hover:bg-green-700"
//           >
//             Simular Leitura
//           </button>
//           <button
//             type="button"
//             onClick={onClose}
//             className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
//           >
//             Fechar
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BarcodeScanner;
