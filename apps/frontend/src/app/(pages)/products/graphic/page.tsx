"use client";

import useMessage from "@/data/hooks/use-message";
import Quagga from "quagga";
import { useState } from "react";

const ModalComCamera = () => {
  const [isOpen, setIsOpen] = useState(true); // Controla a visibilidade do modal
  const [codigoLido, setCodigoLido] = useState(""); // Controla a visibilidade do modal
  const { msgSucess, msgError } = useMessage();

  const quaggaInit = () => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#reader"), // Or '#yourElement' (optional)
        },
        decoder: {
          readers: ["ean_reader"],
        },
      },
      function (err: any) {
        if (err) {
          msgError(err);
          return;
        }
        msgSucess("Initialization finished. Ready to start");
        Quagga.start();
        Quagga.onDetected((item: any) => {
          msgSucess(item);
        });
      }
    );
  };

  const fecharModal = () => {
    setIsOpen(false); // Fechar o modal
    msgSucess("fechada com sucesso"); // Fechar a câmera
  };

  // Use seu contexto de mensagens para exibir a mensagem depois de ler o código
  const mostrarMensagem = () => {
    if (codigoLido) {
      msgSucess(`Código lido: ${codigoLido}`); // Atualiza a mensagem
    } else {
      msgError("Nenhum código lido.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg relative w-full max-w-4xl">
        <button
          type="button"
          onClick={fecharModal}
          className="absolute top-2 right-2 text-red-500 text-xl"
        >
          X
        </button>
        <div className="text-h6 text-center mb-4">
          <div className="flex flex-col items-center space-y-3">
            <button
              className="botao verde"
              type="button"
              onClick={() => {
                quaggaInit(); // Iniciar o leitor de código
                mostrarMensagem(); // Mostrar a mensagem após iniciar a leitura
              }}
            >
              LER CODIGO
            </button>
            <button className="botao verde" type="button" onClick={fecharModal}>
              FECHAR CÂMERA
            </button>
            <div>{codigoLido ? codigoLido : "sem código lido"}</div>
          </div>
        </div>

        <div className="w-full h-72 bg-gray-300 rounded-lg mt-4 relative">
          {/* Coloque o componente da câmera aqui */}
          <div id="reader" className="flex flex-col items-center">
            <video
              className=" bg-gray-700 text-white flex justify-center items-center object-cover"
              autoPlay
              playsInline
            >
              {/* A câmera será exibida aqui */}
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComCamera;
