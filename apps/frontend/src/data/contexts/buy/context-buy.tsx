"use client";

import useLocal from "@/data/hooks/use-local";
import useMessage from "@/data/hooks/use-message";
import useProduct from "@/data/hooks/use-product";
import { Buy, CreateEmptyBuy, Local, Product } from "core";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useState } from "react";
import useApi from "../../hooks/use-api";

const urlBuy = "/buys/";
const urlNewBuys = "/buys/new/";
const urlGetBuy = "/buys/get/all/";
const urlNewBuysSucess = "/buys/new/sucess/";
const urlBuyProducts = "/buys/get/by-product/";
const urlValidateBuys = "/buys/new/validate/description/";

export interface ContextBuyProps {
  buy: Partial<Buy>;
  localDescription?: string;

  localsData: Partial<Local>[]; // Inclui as produtos disponíveis
  productsData: Partial<Product>[]; // Inclui as produtos disponíveis

  resetBuy(): void;
  saveBuy(buyData: Partial<any>): Promise<void>;
  updateBuy(buy: Partial<Buy>): void;
  loadingBuy(id: string): Promise<void>;
  loadingBuyProducts(productId: string): any;
}

const ContextBuy = createContext<ContextBuyProps>({} as any);

export function ProviderContextBuy(props: any) {
  const { httpGet, httpPost } = useApi();
  const { msgSucess, msgError } = useMessage();

  const router = useRouter();
  const { localsData, resetLocal } = useLocal();
  const { productsData, resetProduct } = useProduct();

  const [buy, setBuy] = useState<Partial<Buy>>(CreateEmptyBuy());

  const resetBuy = useCallback(() => {
    resetProduct();
    resetLocal();
    setBuy({});
  }, [resetLocal, resetProduct]);

  const saveBuy = useCallback(
    async function (buy: any) {
      try {
        const buyCreate = await httpPost(urlNewBuys, buy);

        setBuy({
          ...buyCreate,
        });

        resetBuy();

        router.push(urlBuy);
      } catch (error) {
        msgError("compra nao salva");
      }
    },
    [httpPost, router, resetBuy, msgError]
  );

  const loadingBuyProducts = useCallback(
    async function (id: string) {
      try {
        const buy = await httpGet(`${urlBuyProducts}${id}`);

        return buy;
      } catch (error) {
        msgError("produtos nao carregados");
      }
    },
    [httpGet, msgError]
  );

  const loadingBuy = useCallback(
    async function (description: string) {
      try {
        const buy = await httpGet(`${urlGetBuy}${description}`);

        setBuy({
          ...buy,
          // createDate: Data.unformat(buy.createDate),
        });
      } catch (error) {
        msgError("compras nao carregadas");
      }
    },
    [setBuy, httpGet, msgError]
  );

  // useEffect(() => {
  //   resetBuy();
  // }, [resetBuy]);

  return (
    <ContextBuy.Provider
      value={{
        buy: buy,
        localsData,
        productsData,
        resetBuy,
        saveBuy,
        loadingBuy,
        updateBuy: setBuy,
        loadingBuyProducts,
      }}
    >
      {props.children}
    </ContextBuy.Provider>
  );
}

export default ContextBuy;
