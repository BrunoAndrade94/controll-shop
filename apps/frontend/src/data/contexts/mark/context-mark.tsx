"use client";

import { CreateEmptyMark, Mark } from "core";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import useApi from "../../hooks/use-api";

const urlGetMark = "/marks/get/";
const urlNewMarks = "/marks/new/";
const urlValidateMarks = "/marks/new/validate/description/";
const urlNewMarksSucess = "/marks/new/sucess/";

export interface ContextMarkProps {
  mark: Partial<Mark>;
  descriptionInUse: boolean;
  marksLocal: Partial<Mark>[];

  saveMark(): Promise<void>;
  updateMark(mark: Partial<Mark>): void;
  loadingMark(id: string): Promise<void>;
}

const ContextMark = createContext<ContextMarkProps>({} as any);

export function ProviderContextMark(props: any) {
  const { httpGet, httpPost } = useApi();
  const router = useRouter();

  const [marksLocal, setMarksLocal] = useState<Partial<Mark>[]>([]);
  const [descriptionInUse, setDescriptionInUse] = useState(false);
  const [mark, setMark] = useState<Partial<Mark>>(CreateEmptyMark());

  const saveMark = useCallback(
    async function () {
      try {
        const markCreate = await httpPost(urlNewMarks, mark);
        // router.push(urlNewMarksSucess);

        setMark({
          ...markCreate,
        });
      } catch (error) {
        // TODO: IMPLEMENTAR TRATAMENTO DE ERRO
        console.error(error);
      }
    },
    [mark, httpPost]
  );

  const loadingMark = useCallback(
    async function (description: string) {
      try {
        const mark = await httpGet(`${urlValidateMarks}${description}`);

        setMark({
          ...mark,
          description: mark.createDate,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [setMark, httpGet]
  );

  const validateDescription = useCallback(
    async function () {
      try {
        if (mark.description == "") {
          console.error("Informe uma descrição");
        }

        const { inUse } = await httpGet(
          `${urlValidateMarks}${mark.description}`
        );

        setDescriptionInUse(inUse);
      } catch (error) {
        // TODO: IMPLEMENTAR ERRO
        console.error(error);
      }
    },
    [httpGet, mark]
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
    if (mark?.description) validateDescription();
  }, [mark?.description, validateDescription]);

  // Carrega todas as marcas na inicialização
  useEffect(() => {
    async function loadMarks() {
      try {
        const marks = await httpGet(urlGetMark); // Requisição à API
        setMarksLocal(marks); // Atualiza o estado com os dados corretos
      } catch (error) {
        console.error("Erro ao carregar marcas:", error);
      }
    }
    loadMarks();
  }, [httpGet]);

  return (
    <ContextMark.Provider
      value={{
        mark: mark,
        marksLocal: marksLocal,
        descriptionInUse: descriptionInUse,
        updateMark: setMark,
        saveMark,
        loadingMark,
      }}
    >
      {props.children}
    </ContextMark.Provider>
  );
}

export default ContextMark;
