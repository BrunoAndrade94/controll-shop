"use client";

import { createContext, useState } from "react";

export interface ContextStepsProps {
  labels: string[];
  labelAction: string;
  actionExec: () => void;
  stepCurrent: number;
  setStepCurrent: (value: number) => void;
  stepNext: () => void;
  noStepNext: () => boolean;
  stepPrevious: () => void;
  noStepPrevious: () => boolean;
  authNextStep: boolean[];
  setAuthNextStep: (value: boolean[]) => void;
}

const ContextSteps = createContext<ContextStepsProps>({} as any);

export function ProviderContextSteps(props: any) {
  ///
  /// VARIAVEIS INICIO
  const [stepCurrent, setStepCurrent] = useState(0);
  // const [authNextStep, setAuthNextStep] = useState([Boolean]);
  // const [labelAction] = useState("");
  /// VARIAVEIS FINAL
  ///

  ///
  /// FUNCOES INICIO
  // function noStepPrevious() {
  //   return (props.stepCurrent ?? 0) === 0;
  // }

  // function noStepNext() {
  //   return props.stepCurrent === props.labels?.length - 1;
  // }

  // function stepPrevious() {
  //   if (!noStepPrevious()) {
  //     props.setStepCurrent(props.stepCurrent - 1);
  //   }
  // }

  // function stepNext() {
  //   if (!noStepNext()) {
  //     props.setStepCurrent(props.stepCurrent + 1);
  //   }
  // }
  /// FUNCOES FINAL
  ///

  ///
  /// RETURN
  return (
    <ContextSteps.Provider
      value={{
        stepCurrent,
        setStepCurrent,
        ...props,
        // labels: [],
        // authNextStep: [],
        // setAuthNextStep: () => {},
        // stepNext,
        // noStepNext,
        // stepPrevious,
        // noStepPrevious,
      }}
    >
      {props.children}
    </ContextSteps.Provider>
  );
}

export default ContextSteps;
