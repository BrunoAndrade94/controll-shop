"use client";
import Quagga from "quagga"; // ES6
import { useEffect } from "react";

export default function PageGraphicProducts() {
  let codigoLido = "";

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
          console.error(err);
          return;
        }
        // console.log("Initialization finished. Ready to start");
        Quagga.start();
        Quagga.onDetected((item: any) => {
          codigoLido = item;
        });
      }
    );
  };

  const onStop = () => {
    Quagga.stop();
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="m-0 p-0 flex mb-3" id="reader" />
      <div className="flex flex-col items-center space-y-3">
        <button className="botao verde" type="button" onClick={quaggaInit}>
          LER CODIGO
        </button>{" "}
        <button className="botao verde" type="button" onClick={onStop}>
          FECHAR CAMERA
        </button>
        <div>{codigoLido ? codigoLido : "sem codigo lido"}</div>
      </div>
    </div>
  );
}
