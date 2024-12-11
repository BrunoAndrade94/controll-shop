"use client";

import useMessage from "@/data/hooks/use-message";
import { CreateEmptyMark, Mark } from "core";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import useApi from "../../hooks/use-api";

const urlMark = "/marks/";
const urlGetMark = "/marks/get/";
const urlNewMarks = "/marks/new/";
const urlValidateMarks = "/marks/new/validate/description/";
const urlNewMarksSucess = "/marks/new/sucess/";

export interface ContextMarkProps {
  mark: Partial<Mark>;
  descriptionInUse: boolean;
  setDescriptionInUse: (value: boolean) => void;

  marksData: Partial<Mark>[];
  setMarksData: React.Dispatch<React.SetStateAction<Partial<Mark>[]>>;

  queryMarks: string;
  setQueryMarks: (value: string) => void;

  resetMark(): void;
  saveMark(): Promise<void>;
  updateMark(mark: Partial<Mark>): void;
  loadingMark(): Promise<void>;
}

const ContextMark = createContext<ContextMarkProps>({} as any);

export function ProviderContextMark(props: any) {
  const router = useRouter();
  const { msgSucess } = useMessage();
  const { httpGet, httpPost } = useApi();

  const [queryMarks, setQueryMarks] = useState("");

  const [marksData, setMarksData] = useState<Partial<Mark>[]>([]);
  const [descriptionInUse, setDescriptionInUse] = useState(false);
  const [mark, setMark] = useState<Partial<Mark>>(CreateEmptyMark());

  const resetMark = useCallback(() => {
    setMark({});
    setQueryMarks("");
  }, []);

  const saveMark = useCallback(
    async function () {
      try {
        const markCreate = await httpPost(urlNewMarks, mark);

        setMark({
          ...markCreate,
        });

        msgSucess(`${mark.description?.toUpperCase()} cadastrado com sucesso.`);

        router.push(urlMark);

        setQueryMarks("");
      } catch (error) {
        // TODO: IMPLEMENTAR TRATAMENTO DE ERRO
        console.error(error);
      }
    },
    [mark, httpPost, msgSucess, router]
  );

  const loadingMark = useCallback(
    async function () {
      try {
        const marks = await httpGet(`${urlValidateMarks}`);

        setMarksData(marks);
      } catch (error) {
        console.error(error);
      }
    },
    [setMarksData, httpGet]
  );

  // const validateDescription = useCallback(
  //   async function () {
  //     try {
  //       if (mark.description == "") {
  //         console.error("Informe uma descrição");
  //       }

  //       const { inUse } = await httpGet(
  //         `${urlValidateMarks}${mark.description}`
  //       );

  //       setDescriptionInUse(inUse);
  //     } catch (error) {
  //       // TODO: IMPLEMENTAR ERRO
  //       console.error(error);
  //     }
  //   },
  //   [httpGet, mark]
  // );

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

  // useEffect(() => {
  //   if (mark?.description) validateDescription();
  // }, [mark?.description, validateDescription]);

  // Carrega todas as marcas na inicialização
  useEffect(() => {
    async function loadMarks() {
      try {
        const marks = await httpGet(urlGetMark); // Requisição à API
        setMarksData(marks); // Atualiza o estado com os dados corretos
      } catch (error) {
        console.error("Erro ao carregar marcas:", error);
      }
    }
    loadMarks();
  }, [httpGet, marksData]);

  return (
    <ContextMark.Provider
      value={{
        mark: mark,
        queryMarks,
        descriptionInUse,
        marksData: marksData,
        saveMark,
        resetMark,
        loadingMark,
        setMarksData,
        setQueryMarks,
        updateMark: setMark,
        setDescriptionInUse,
      }}
    >
      {props.children}
    </ContextMark.Provider>
  );
}

export default ContextMark;
