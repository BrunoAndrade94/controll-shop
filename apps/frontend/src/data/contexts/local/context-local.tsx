"use client";

import useMessage from "@/data/hooks/use-message";
import { CreateEmptyLocal, Local } from "core";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import useApi from "../../hooks/use-api";

const urlLocal = "/locals/";
const urlGetLocal = "/locals/get/";
const urlNewLocals = "/locals/new/";
const urlNewLocalsSucess = "/locals/new/sucess/";
const urlValidateLocals = "/locals/new/validate/description/";

export interface ContextLocalProps {
  local: Partial<Local>;

  descriptionInUse: boolean;
  setDescriptionInUse: (value: boolean) => void;

  localsData: Partial<Local>[];

  queryLocals: string;
  setQueryLocals: (value: string) => void;

  resetLocal(): void;
  saveLocal(): Promise<void>;
  loadingLocal(): Promise<void>;
  updateLocal(local: Partial<Local>): void;
}

const ContextLocal = createContext<ContextLocalProps>({} as any);

export function ProviderContextLocal(props: any) {
  const router = useRouter();
  const { msgSucess, msgError } = useMessage();

  const { httpGet, httpPost } = useApi();

  const [queryLocals, setQueryLocals] = useState<string>("");
  const [localsData, setLocalsData] = useState<Partial<Local>[]>([]);

  const [descriptionInUse, setDescriptionInUse] = useState(false);
  const [local, setLocal] = useState<Partial<Local>>(CreateEmptyLocal());

  const loadingLocal = useCallback(
    async function () {
      try {
        const locals = await httpGet(`${urlGetLocal}`);

        setLocalsData(locals);
      } catch (error) {
        msgError("erro ao carregar");
      }
    },
    [httpGet, setLocalsData, msgError]
  );

  const resetLocal = useCallback(() => {
    setQueryLocals("");
    setLocalsData([]);
    loadingLocal();
  }, [loadingLocal]);

  const saveLocal = useCallback(
    async function () {
      try {
        const localCreate = await httpPost(urlNewLocals, local);

        setLocal({
          ...localCreate,
        });

        msgSucess(
          `${local.description?.toUpperCase()} cadastrado com sucesso.`
        );

        resetLocal();
      } catch (error) {
        msgError(`${local.description?.toUpperCase()} não cadastrado.`);
      }
    },
    [local, httpPost, resetLocal, msgSucess, msgError]
  );

  // Carrega todas as produtos na inicialização
  useEffect(() => {
    loadingLocal();
  }, [loadingLocal]);

  return (
    <ContextLocal.Provider
      value={{
        localsData,
        queryLocals,
        local: local,
        descriptionInUse: descriptionInUse,
        saveLocal,
        resetLocal,
        loadingLocal,
        setQueryLocals,
        setDescriptionInUse,
        updateLocal: setLocal,
      }}
    >
      {props.children}
    </ContextLocal.Provider>
  );
}

export default ContextLocal;
