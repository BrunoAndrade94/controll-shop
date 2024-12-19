"use client";

import useSteps from "@/data/hooks/use-steps";

export interface StepsProps {
  children: any;
  labels: string[];
  labelAction: string;
  actionExec: () => void;
  authNextStep?: boolean[];
}

export default function Steps(props: StepsProps) {
  ///
  /// CONST INICIO
  const {
    stepCurrent,
    setStepCurrent,
    // noStepNext,
    // stepNext,
    // stepPrevious,
    // noStepPrevious,
  } = useSteps();

  // const [stepCurrent, setStepCurrent] = useState(0);
  const authNextStep = props.authNextStep?.[stepCurrent] ?? true;
  /// CONST FINAL
  ///

  ///
  /// FUNCOES INICIO
  function noStepPrevious() {
    return stepCurrent === 0;
  }

  function noStepNext() {
    return stepCurrent === props.labels.length - 1;
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
                      {/* {int - 1 === 0 ? int : int - 1}{" "} */}
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
  /// FUNCOES FINAL
  ///

  ///
  /// RETURN
  return (
    <div className="flex-1 flex flex-col gap-10 w-full">
      <div className="self-center">{renderLabels()}</div>
      <div className="select-none flex flex-col text-center">
        {props.children[stepCurrent]}
      </div>
      <div className="flex justify-between flex-col space-y-2 sm:flex-row sm:space-y-0 space-x-0 sm:space-x-2">
        {noStepNext() ? (
          <button
            type="button"
            disabled={!authNextStep}
            onClick={props.actionExec}
            className={`botao ${!authNextStep ? "disabled" : "laranja"}`}
          >
            <span>{props.labelAction}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={stepNext}
            disabled={!authNextStep || noStepNext()}
            title={`${!authNextStep || noStepNext() ? "Preencha o campo antes de prosseguir" : ""}`}
            className={`botao ${!authNextStep || noStepNext() ? "disabled" : "verde"}`}
          >
            <span>Próximo</span>
          </button>
        )}

        {/* {showList && (
          <button className="botao azul" type="button">
            <span>Carrinho</span>
          </button>
        )} */}

        <button
          type="button"
          hidden={noStepPrevious()}
          onClick={stepPrevious}
          disabled={noStepPrevious()}
          className={`botao ${noStepPrevious() ? "disabled" : "azul"}`}
        >
          <span>Anterior</span>
        </button>
        {/* <button type="button" className={"botao vermelho"} onClick={() => {}}>
          <span>Limpar</span>
        </button> */}
      </div>
    </div>
  );
}
