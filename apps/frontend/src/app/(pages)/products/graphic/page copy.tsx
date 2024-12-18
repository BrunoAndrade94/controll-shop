"use client";
import Quagga from "quagga"; // ES6
import { useEffect, useState } from "react";

export default function PageGraphicProducts() {
  const [codigoLido, setCodigoLido] = useState("");
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
          console.log(err);
          return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
        Quagga.onDetected((item: any) => {
          setCodigoLido(item);
        });
      }
    );
  };

  const onStop = () => {
    Quagga.stop();
  };

  useEffect(() => {}, []);

  return (
    <div className="text-h6 text-center">
      <div id="reader">CODIGO</div>
      <div className="flex flex-col items-center space-y-3">
        <button className="botao verde" type="button" onClick={quaggaInit}>
          LER CODIGO
        </button>{" "}
        <button className="botao verde" type="button" onClick={onStop}>
          FECHAR CAMAERA
        </button>
        <div>{codigoLido ? codigoLido : "sem codigo lido"}</div>
      </div>
    </div>
  );
}
