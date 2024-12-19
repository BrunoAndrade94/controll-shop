"use client";

import useMessage from "@/data/hooks/use-message";
import useSteps from "@/data/hooks/use-steps";
import { CreateEmptyMark, Mark } from "core";
import { createContext, useCallback, useEffect, useState } from "react";
import useApi from "../../hooks/use-api";

const urlGetMark = "/marks/get/";
const urlNewMarks = "/marks/new/";
const urlValidateMarks = "/marks/new/validate/description/";

///
/// INTERFACE INICIO
export interface ContextMarkProps {
  resetMark(): void;
  queryMarks: string;
  mark: Partial<Mark>;
  saveMark(): Promise<void>;
  descriptionInUse: boolean;
  marksData: Partial<Mark>[];
  loadingMark(): Promise<void>;
  updateMark(mark: Partial<Mark>): void;
  setQueryMarks: (value: string) => void;
  setDescriptionInUse: (value: boolean) => void;
  setMarksData: React.Dispatch<React.SetStateAction<Partial<Mark>[]>>;
}
/// INTERFACE FINAL
///

const ContextMark = createContext<ContextMarkProps>({} as any);

export function ProviderContextMark(props: any) {
  ///
  /// CONST INICIO
  const { setStepCurrent } = useSteps();
  const { msgSucess, msgError } = useMessage();
  const { httpGet, httpPost } = useApi();
  const [queryMarks, setQueryMarks] = useState("");
  // const [filteredMarks, setFilteredMarks] = useState<Partial<Mark>[]>([]);
  const [marksData, setMarksData] = useState<Partial<Mark>[]>([]);
  const [descriptionInUse, setDescriptionInUse] = useState(false);
  const [mark, setMark] = useState<Partial<Mark>>(CreateEmptyMark());
  /// CONST FINAL
  ///

  ///
  /// FUNCAO INICIO
  const resetMark = useCallback(() => {
    setMark({});
    setStepCurrent(0);
    setQueryMarks("");
  }, [setStepCurrent]);

  const saveMark = useCallback(
    async function () {
      try {
        const markCreate = await httpPost(urlNewMarks, mark);

        setMark({ ...markCreate });

        msgSucess(`${mark.description?.toUpperCase()} cadastrada com sucesso.`);

        resetMark();
      } catch (error) {
        msgError("marca não cadastrada");
      }
    },
    [mark, httpPost, msgSucess, msgError, resetMark]
  );

  const loadingMark = useCallback(
    async function () {
      try {
        const marks = await httpGet(`${urlValidateMarks}`);

        setMarksData(marks);
      } catch (error) {
        msgError("marcas não carregadas");
      }
    },
    [setMarksData, httpGet, msgError]
  );
  /// FUNCAO FINAL
  ///

  ///
  /// USE EFFECT INICIO
  useEffect(() => {
    async function loadMarks() {
      try {
        const marks = await httpGet(urlGetMark); // Requisição à API
        setMarksData(marks); // Atualiza o estado com os dados corretos
      } catch (error) {
        msgError("erro ao carregar marcas");
      }
    }
    loadMarks();
  }, [httpGet, marksData, msgError]);
  /// USE EFFECT FINAL
  ///

  ///
  /// RETURN
  return (
    <ContextMark.Provider
      value={{
        saveMark,
        resetMark,
        mark: mark,
        queryMarks,
        loadingMark,
        setMarksData,
        setQueryMarks,
        descriptionInUse,
        updateMark: setMark,
        setDescriptionInUse,
        marksData: marksData,
      }}
    >
      {props.children}
    </ContextMark.Provider>
  );
}

export default ContextMark;
