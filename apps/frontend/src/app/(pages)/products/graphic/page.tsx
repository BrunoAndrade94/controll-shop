"use client";

import useMessage from "@/data/hooks/use-message";
import Quagga from "quagga";
import { useEffect, useState } from "react";

const ModalComCamera = () => {
  const [isOpen, setIsOpen] = useState(false); // Controla a visibilidade do modal
  // const [codigoLido, setCodigoLido] = useState(""); // Controla a visibilidade do modal
  const { msgSucess, msgError } = useMessage();

  // const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const startCamera = () => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: document.querySelector("#camera-view"),
          constraints: {
            facingMode: "environment", // Usar câmera traseira
          },
        },
        decoder: {
          readers: ["ean_reader"], // Formato EAN
        },
        locator: {
          patchSize: "large", // "small", "medium", "large"
          halfSample: true, // Melhora a precisão em troca de desempenho
        },
        // Controla a taxa de leitura
        numOfWorkers: 4, // Tente aumentar para melhorar a precisão, se necessário
        frequency: 10, // Intervalo em milissegundos para tentativas de leitura
      },
      (err: Error) => {
        if (err) {
          msgError("Erro ao iniciar o Quagga: " + err);
          return;
        }
        Quagga.start(); // Inicia a captura de vídeo
        setIsCameraActive(true); // Atualiza o estado para mostrar que a câmera está ativa
        msgSucess("Câmera ligada.");
      }
    );

    // Listener para detectar códigos de barras
    Quagga.onDetected((data: any) => {
      msgSucess("Código de barras detectado: " + data.codeResult.code);
      // Opcional: você pode fechar a câmera automaticamente após uma detecção.
      stopCamera();
    });
  };

  const stopCamera = () => {
    Quagga.stop(); // Para a captura de vídeo
    setIsCameraActive(false); // Atualiza o estado para indicar que a câmera foi desativada
    msgSucess("Câmera desligada.");
  };

  useEffect(() => {
    return () => {
      // Limpa o Quagga ao desmontar o componente, caso a câmera esteja ativa
      if (isCameraActive) {
        stopCamera();
      }
    };
  }, [isCameraActive]);

  const toggleModal = () => setIsOpen(!isOpen);
  // const toggleCamera = () => setIsCameraOpen(!isCameraOpen);

  return (
    <>
      <button type="button" className="botao azul" onClick={toggleModal}>
        Abrir Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-white w-11/12 max-w-lg rounded-lg shadow-lg p-6">
            {/* Fechar modal */}
            <button
              type="button"
              onClick={() => {
                toggleModal();
                if (isCameraActive) stopCamera();
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {/* Título */}
            <h2 className="text-lg font-semibold text-center mb-4">
              Leitura de Código de Barras
            </h2>

            {/* Área da câmera */}
            <div className="w-full h-80 border border-purple-500 bg-gray-100 rounded-md flex items-center justify-center relative overflow-hidden">
              <div
                id="camera-view"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Botões */}
            <div className="flex justify-center mt-4 gap-4">
              <button
                type="button"
                onClick={startCamera}
                className="botao verde"
                hidden={isCameraActive}
              >
                Iniciar
              </button>
              <button
                type="button"
                onClick={stopCamera}
                className="botao vermelho"
                hidden={!isCameraActive}
              >
                Parar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // return (
  //   <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
  //     <div className="bg-white p-4 rounded-lg relative w-full max-w-4xl">
  //       <button
  //         type="button"
  //         onClick={fecharModal}
  //         className="absolute top-2 right-2 text-red-500 text-xl"
  //       >
  //         X
  //       </button>
  //       <div className="text-h6 text-center mb-4">
  //         <div className="flex flex-col items-center space-y-3">
  //           <button
  //             className="botao verde"
  //             type="button"
  //             onClick={() => {
  //               quaggaInit(); // Iniciar o leitor de código
  //               mostrarMensagem(); // Mostrar a mensagem após iniciar a leitura
  //             }}
  //           >
  //             LER CODIGO
  //           </button>
  //           <button className="botao verde" type="button" onClick={fecharModal}>
  //             FECHAR CÂMERA
  //           </button>
  //           <div>{codigoLido ? codigoLido : "sem código lido"}</div>
  //         </div>
  //       </div>

  //       <div className="w-full h-72 bg-gray-300 rounded-lg mt-4 relative">
  //         {/* Coloque o componente da câmera aqui */}
  //         <div
  //           id="reader"
  //           className="w-full h-full bg-gray-700 text-white flex justify-center items-center"
  //         >
  //           <video
  //             id="video"
  //             className="w-full h-full object-cover"
  //             autoPlay
  //             playsInline
  //             // ref={"reader"} // Se necessário, para o controle do vídeo via React
  //           >
  //             {/* A câmera será exibida aqui */}
  //           </video>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default ModalComCamera;
