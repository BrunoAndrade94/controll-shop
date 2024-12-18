"use client";

import { useToast } from "@/data/hooks/use-toast";
import { createContext, useCallback } from "react";

export interface ContextMessageProps {
  msgSucess: (text: string) => void;
  msgError: (text: string) => void;
}

const ContextMessage = createContext<ContextMessageProps>({} as any);

export function ProviderContextMessage(props: any) {
  const { toast } = useToast();

  const addMessage = useCallback(
    function (type: "sucess" | "error", text: string) {
      toast({
        title: type == "sucess" ? "OK, FEITO (:" : "OPS, ALGO DEU ERRADO ):",
        duration: 2200,
        description: text.toUpperCase(),
        variant: type == "sucess" ? "default" : "destructive",
      });
    },
    [toast]
  );

  return (
    <ContextMessage.Provider
      value={{
        msgSucess(text) {
          addMessage("sucess", text);
        },
        msgError(text) {
          addMessage("error", text);
        },
      }}
    >
      {props.children}
    </ContextMessage.Provider>
  );
}

export default ContextMessage;
