"use client";
import { useState } from "react";

export interface StepsProps {
  labels: string[];
  children: any;
}

export default function Steps(props: StepsProps) {
  const [stepCurrent, setStepCurrent] = useState(0);

  function noStepPrevious() {
    return stepCurrent === 0;
  }

  function noStepNext() {
    return stepCurrent == props.labels.length - 1;
  }

  function stepPrevious() {
    if (noStepPrevious()) return;
    else setStepCurrent(stepCurrent - 1);
  }

  function stepNext() {
    if (noStepNext()) return;
    else setStepCurrent(stepCurrent + 1);
  }

  return (
    <div className="flex-1 flex flex-col gap-10 w-full">
      <div className="self-center">labels</div>
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
        <button
          type="button"
          className={`botao ${
            noStepNext() ? "bg-zinc-400 cursor-not-allowed opacity-50" : "verde"
          }`}
          onClick={stepNext}
          disabled={noStepNext()}
        >
          <span>Avançar</span>
        </button>
      </div>
    </div>
  );
}
