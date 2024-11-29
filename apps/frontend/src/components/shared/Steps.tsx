"use client";
import useProducts from "@/data/contexts/use-product";
import { useState } from "react";

export interface StepsProps {
  labels: string[];
  labelAction: string;
  authNextStep?: boolean[];
  actionExec(): void;
  children: any;
}

export default function Steps(props: StepsProps) {
  const [stepCurrent, setStepCurrent] = useState(0);
  const { product } = useProducts();

  function noStepPrevious() {
    return stepCurrent === 0;
  }

  function noStepNext() {
    return stepCurrent == props.labels.length - 1;
  }

  // TODO: IMPLEMENTAR BOTAO PARA LIMPAR OS CAMPOS
  function cleanInput() {
    product.description = "";
    product.codeBar = "";
    product.lastPrice = 0.0;
  }

  function stepPrevious() {
    if (noStepPrevious()) return;
    else setStepCurrent(stepCurrent - 1);
  }

  function stepNext() {
    if (noStepNext()) return;
    else setStepCurrent(stepCurrent + 1);
  }

  function renderLabels() {
    return (
      <div className="flex gap-8 select-none">
        {props.labels.map((label, index) => {
          const selected = stepCurrent === index;
          return (
            selected && (
              <div
                key={index}
                className="flex items-center justify-center text-center"
              >
                <span className="bg-zinc-300 text-black rounded-full whitespace-nowrap">
                  <div className="p-1">
                    <span>
                      {index + 1}
                      {"# "}
                    </span>
                    {label}
                  </div>
                </span>
              </div>
            )
          );
        })}
      </div>
    );
  }

  const authNextStep = props.authNextStep?.[stepCurrent] ?? true;

  return (
    <div className="flex-1 flex flex-col gap-10 w-full">
      <div className="self-center">{renderLabels()}</div>
      <div>{props.children[stepCurrent]}</div>

      <div className="flex justify-between">
        <button
          type="button"
          className={`botao ${
            noStepPrevious()
              ? "bg-zinc-400 cursor-not-allowed opacity-50"
              : "azul"
          }`}
          onClick={stepPrevious}
          disabled={noStepPrevious()}
        >
          <span>Voltar</span>
        </button>
        <button type="button" className={"botao vermelho"} onClick={cleanInput}>
          <span>Limpar</span>
        </button>
        {noStepNext() ? (
          <button
            type="button"
            disabled={!authNextStep}
            className={`botao ${
              !authNextStep
                ? "bg-zinc-400 cursor-not-allowed opacity-50"
                : "laranja"
            }`}
            onClick={props.actionExec}
          >
            <span>{props.labelAction}</span>
          </button>
        ) : (
          <button
            title={`${!authNextStep || noStepNext() ? "Informe um descrição" : ""}`}
            type="button"
            className={`botao ${
              !authNextStep || noStepNext()
                ? "bg-zinc-400 cursor-not-allowed opacity-50"
                : "verde"
            }`}
            onClick={stepNext}
            disabled={!authNextStep || noStepNext()}
          >
            <span>Avançar</span>
          </button>
        )}
      </div>
    </div>
  );
}
