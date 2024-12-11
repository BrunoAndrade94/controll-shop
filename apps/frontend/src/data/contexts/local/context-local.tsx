"use client";

import useMessage from "@/data/hooks/use-message";
import { CreateEmptyLocal, Local } from "core";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import useApi from "../../hooks/use-api";

const urlLocal = "/locals/";
const urlGetLocal = "/locals/get/";
const urlNewLocals = "/locals/new/";
const urlValidateLocals = "/locals/new/validate/description/";
const urlNewLocalsSucess = "/locals/new/sucess/";

export interface ContextLocalProps {
  local: Partial<Local>;

  descriptionInUse: boolean;
  setDescriptionInUse: (value: boolean) => void;

  localsData: Partial<Local>[];

  queryLocals: string;
  setQueryLocals: (value: string) => void;

  resetLocal(): void;
  saveLocal(): Promise<void>;
  updateLocal(local: Partial<Local>): void;
  loadingLocal(): Promise<void>;
}

const ContextLocal = createContext<ContextLocalProps>({} as any);

export function ProviderContextLocal(props: any) {
  const router = useRouter();
  const { msgSucess } = useMessage();
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
        console.error(error);
      }
    },
    [httpGet, setLocalsData]
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

        router.push(urlLocal);

        setQueryLocals("");
      } catch (error) {
        // TODO: IMPLEMENTAR TRATAMENTO DE ERRO
        console.error(error);
      }
    },
    [local, httpPost, router, setQueryLocals, msgSucess]
  );

  const loadLocals = useCallback(async () => {
    try {
      const locals = await httpGet(urlGetLocal);
      setLocalsData(locals);
    } catch (error) {
      console.error("Erro ao carregar:", error);
    }
  }, [httpGet]);

  // Carrega todas as produtos na inicialização
  useEffect(() => {
    loadLocals();
  }, [loadLocals]);

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
