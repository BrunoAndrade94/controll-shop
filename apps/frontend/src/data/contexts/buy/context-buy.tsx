"use client";

import useLocal from "@/data/hooks/use-local";
import useProduct from "@/data/hooks/use-product";
import { Buy, CreateEmptyBuy, Local, Product } from "core";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import useApi from "../../hooks/use-api";

const urlBuy = "/buys/";
const urlGetBuy = "/buys/get/all/";
const urlNewBuys = "/buys/new/";
const urlValidateBuys = "/buys/new/validate/description/";
const urlBuyProducts = "/buys/get/by-product/";
const urlNewBuysSucess = "/buys/new/sucess/";

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

  const router = useRouter();
  const { localsData, resetLocal } = useLocal();
  const { productsData, resetProduct } = useProduct();

  const [buy, setBuy] = useState<Partial<Buy>>(CreateEmptyBuy());

  const resetBuy = useCallback(() => {
    resetProduct();
    resetLocal();
    setBuy({});
  }, [setBuy, resetLocal, resetProduct]);

  const saveBuy = useCallback(
    async function (buy: any) {
      try {
        const buyCreate = await httpPost(urlNewBuys, buy);

        setBuy({
          ...buyCreate,
        });

        console.log(buy);

        // cleanBuy();
        // setQueryLocals("");
        // setQueryProducts("");

        resetBuy();

        router.push(urlBuy);
      } catch (error) {
        // TODO: IMPLEMENTAR TRATAMENTO DE ERRO
        console.error(error);
      }
    },
    [httpPost, router, resetBuy]
  );

  const loadingBuyProducts = useCallback(
    async function (id: string) {
      try {
        const buy = await httpGet(`${urlBuyProducts}${id}`);

        return buy;
      } catch (error) {
        console.error(error);
      }
    },
    [httpGet]
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
        console.error(error);
      }
    },
    [setBuy, httpGet]
  );

  useEffect(() => {
    resetBuy();
  }, [resetBuy]);

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
