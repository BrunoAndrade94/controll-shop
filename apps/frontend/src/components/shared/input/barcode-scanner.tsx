"use client";

import Quagga from "quagga"; // Importando a biblioteca QuaggaJS
import { useEffect, useRef } from "react";

const BarcodeScannerModal = ({ onClose, onScan }: any) => {
  const videoContainerRef = useRef(null);

  useEffect(() => {
    // Inicializa o QuaggaJS
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#cam"), // Or '#yourElement' (optional)
        },
        decoder: {
          readers: ["code_128_reader"],
        },
      },
      function (err: Error) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
      }
    );

    // Callback de detecção
    Quagga.onDetected((result: any) => {
      if (result && result.codeResult) {
        const barcode = result.codeResult.code;
        console.log("Código de Barras Detectado:", barcode);
        onScan(barcode); // Chama o callback com o código de barras
        Quagga.stop(); // Para a detecção após a leitura
        onClose(); // Fecha o modal
      }
    });

    // Cleanup ao desmontar o componente
    return () => {
      Quagga.offDetected();
      Quagga.stop();
    };
  }, [onScan, onClose]);

  return (
    <div
      id="cam"
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
    >
      {/* Modal principal */}
      <div className="relative bg-gray-900 p-4 rounded-lg w-full max-w-md">
        {/* Título */}
        <div className="text-center text-white mb-4">
          <h2 className="text-xl font-bold">Escanear Código de Barras</h2>
        </div>

        {/* Área do vídeo para a câmera */}
        <div
          ref={videoContainerRef}
          className="w-full h-64 bg-black rounded-lg overflow-hidden"
        >
          {/* O vídeo da câmera será renderizado aqui pelo QuaggaJS */}
        </div>

        {/* Botão para fechar */}
        <div className="flex flex-col mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScannerModal;
