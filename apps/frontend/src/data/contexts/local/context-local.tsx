"use client";

import { CreateEmptyLocal, Local } from "core";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import useApi from "../../hooks/use-api";

const urlGetLocal = "/locals/get/";
const urlNewLocals = "/locals/new/";
const urlValidateLocals = "/locals/new/validate/description/";
const urlNewLocalsSucess = "/locals/new/sucess/";

export interface ContextLocalProps {
  local: Partial<Local>;
  descriptionInUse: boolean;
  localsLocal: Partial<Local>[];

  saveLocal(): Promise<void>;
  updateLocal(local: Partial<Local>): void;
  loadingLocal(id: string): Promise<void>;
}

const ContextLocal = createContext<ContextLocalProps>({} as any);

export function ProviderContextLocal(props: any) {
  const { httpGet, httpPost } = useApi();
  const router = useRouter();

  const [localsLocal, setLocalsLocal] = useState<Partial<Local>[]>([]);

  const [descriptionInUse, setDescriptionInUse] = useState(false);
  const [local, setLocal] = useState<Partial<Local>>(CreateEmptyLocal());

  const saveLocal = useCallback(
    async function () {
      try {
        const localCreate = await httpPost(urlNewLocals, local);
        // router.push(urlNewLocalsSucess);

        setLocal({
          ...localCreate,
        });
      } catch (error) {
        // TODO: IMPLEMENTAR TRATAMENTO DE ERRO
        console.error(error);
      }
    },
    [local, httpPost]
  );

  const loadingLocal = useCallback(
    async function (description: string) {
      try {
        const local = await httpGet(`${urlGetLocal}${description}`);

        setLocal({
          ...local,
          // createDate: Data.unformat(local.createDate),
        });
      } catch (error) {
        console.error(error);
      }
    },
    [setLocal, httpGet]
  );

  const validateDescription = useCallback(
    async function () {
      try {
        if (local.description == "") {
          console.error("Informe uma descrição");
        }

        const { inUse } = await httpGet(
          `${urlValidateLocals}${local.description}`
        );

        setDescriptionInUse(inUse);
      } catch (error) {
        // TODO: IMPLEMENTAR ERRO
        console.error(error);
      }
    },
    [httpGet, local]
  );

  // TODO: IMPLEMENTAR EM CONTEXT-BUY
  // const adicionarConvidado = useCallback(
  //   async function () {
  //     try {
  //       await httpPost(`/eventos/${evento.alias}/convidado`, convidado);
  //       router.push("/convite/obrigado");
  //     } catch (error: any) {
  //       adicionarErro(error.messagem ?? "Ocorreu um erro inesperado!");
  //     }
  //   },
  //   [httpPost, evento, convidado, router]
  // );

  useEffect(() => {
    if (local?.description) validateDescription();
  }, [local?.description, validateDescription]);

  // Carrega todas as produtos na inicialização
  useEffect(() => {
    async function loadLocals() {
      try {
        const locals = await httpGet(urlGetLocal); // Requisição à API
        setLocalsLocal(locals); // Atualiza o estado com os dados corretos
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    }
    loadLocals();
  }, [httpGet]);

  return (
    <ContextLocal.Provider
      value={{
        local: local,
        descriptionInUse: descriptionInUse,
        localsLocal,
        updateLocal: setLocal,
        saveLocal,
        loadingLocal,
      }}
    >
      {props.children}
    </ContextLocal.Provider>
  );
}

export default ContextLocal;
