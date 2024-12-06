"use client";

import useLocal from "@/data/hooks/use-local";
import useProduct from "@/data/hooks/use-product";
import { Buy, BuyProducts, CreateEmptyBuy, Local, Product } from "core";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useState } from "react";
import useApi from "../../hooks/use-api";

const urlBuy = "/buys/";
const urlGetBuy = "/buys/get/";
const urlNewBuys = "/buys/new/";
const urlValidateBuys = "/buys/new/validate/description/";
// const urlValidateBuys = "/buys/get/?search=";
const urlNewBuysSucess = "/buys/new/sucess/";

export interface ContextBuyProps {
  buy: Partial<Buy>;
  localDescription?: string;
  // setLocalDescription?: string;
  // descriptionInUse: boolean;

  localsData: Partial<Local>[]; // Inclui as produtos disponíveis
  productsData: Partial<Product>[]; // Inclui as produtos disponíveis

  // addDescriptionLocal(description: string): void;
  saveBuy(buyData: Partial<BuyProducts>): Promise<void>;
  updateBuy(buy: Partial<Buy>): void;
  loadingBuy(id: string): Promise<void>;
}

const ContextBuy = createContext<ContextBuyProps>({} as any);

export function ProviderContextBuy(props: any) {
  const { httpGet, httpPost } = useApi();

  const router = useRouter();
  const { localsData, setQueryLocals } = useLocal();
  const { productsData, setQueryProducts } = useProduct();

  // const [localDescription, setLocalDescription] = useState("");

  const [buysLocal, setBuysLocal] = useState<Partial<Buy>[]>([]);

  const [descriptionInUse, setDescriptionInUse] = useState(false);
  const [buy, setBuy] = useState<Partial<Buy>>(CreateEmptyBuy());

  const cleanAll = useCallback(
    async function () {
      // setLocalDescription("");
      setBuy({});
      setQueryLocals("");
      setQueryProducts("");
    },
    [setBuy, setQueryLocals, setQueryProducts]
  );

  const saveBuy = useCallback(
    async function (buy: any) {
      try {
        const buyCreate = await httpPost(urlNewBuys, buy);

        setBuy({
          ...buyCreate,
        });
        cleanAll();
        router.push(urlBuy);
      } catch (error) {
        // TODO: IMPLEMENTAR TRATAMENTO DE ERRO
        console.error(error);
      }
    },
    [httpPost, router, cleanAll]
  );

  // const addDescriptionLocal = (description: string) => {
  //   setLocalDescription(description);
  // };

  const loadingBuy = useCallback(
    async function (description: string) {
      try {
        const buy = await httpGet(`${urlGetBuy}${description}`);

        setBuy({
          ...buy,
          // createDate: Data.unformat(buy.createDate),
        });
      } catch (error) {
        console.error(error);
      }
    },
    [setBuy, httpGet]
  );

  // const validateDescription = useCallback(
  //   async function () {
  //     try {
  //       if (buy.description == "") {
  //         console.error("Informe uma descrição");
  //       }

  //       const { inUse } = await httpGet(`${urlValidateBuys}${buy.description}`);

  //       setDescriptionInUse(inUse);
  //     } catch (error) {
  //       // TODO: IMPLEMENTAR ERRO
  //       console.error(error);
  //     }
  //   },
  //   [httpGet, buy]
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
  //   if (buy?.description) validateDescription();
  // }, [buy?.description, validateDescription]);

  // Carrega todas as produtos na inicialização
  // useEffect(() => {
  //   async function loadBuys() {
  //     try {
  //       const marks = await httpGet(urlGetBuy); // Requisição à API
  //       setBuysLocal(marks); // Atualiza o estado com os dados corretos
  //     } catch (error) {
  //       console.error("Erro ao carregar produtos:", error);
  //     }
  //   }
  //   loadBuys();
  // }, [httpGet]);

  return (
    <ContextBuy.Provider
      value={{
        buy: buy,
        // descriptionInUse: descriptionInUse,
        // marksLocal,
        // buysLocal,
        localsData,
        productsData,
        updateBuy: setBuy,
        saveBuy,
        loadingBuy,
      }}
    >
      {props.children}
    </ContextBuy.Provider>
  );
}

export default ContextBuy;
