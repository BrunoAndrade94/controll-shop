"use client";

import useLocal from "@/data/hooks/use-local";
import useMessage from "@/data/hooks/use-message";
import useProduct from "@/data/hooks/use-product";
import useSteps from "@/data/hooks/use-steps";
import { Buy, CreateEmptyBuy, Local, Product } from "core";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import useApi from "../../hooks/use-api";

const urlBuy = "/buys/";
const urlNewBuys = "/buys/new/";
const urlGetBuy = "/buys/get/all/";
const urlBuyProducts = "/buys/get/by-product/";

///
/// INTERFACE INICIO
// Tipo para a lista de produtos no contexto de compra
// type BuyProductItem = {
//   productId: string;
//   description: string;
//   mark: string;
//   unitPrice: number;
//   amount: number;
//   totalPrice: number;
// };
///
export interface ContextBuyProps {
  buy: Partial<Buy>;
  localDescription?: string;
  localsData: Partial<Local>[];
  buysData: Partial<Buy>[];
  productsData: Partial<Product>[];

  // buyProductsList: BuyProductItem[];
  // setBuyProductsList: (value: BuyProductItem[]) => void;

  showList: boolean;
  setShowList: (value: boolean) => void;

  showCart: boolean;
  setShowCart: (value: boolean) => void;
  ///
  resetBuy(): void;
  updateBuy(buy: Partial<Buy>): void;
  loadingBuy(id: string): Promise<void>;
  loadingBuyProducts(productId: string): any;
  saveBuy(buyData: Partial<any>): Promise<void>;
}
/// INTERFACE FINAL
///

const ContextBuy = createContext<ContextBuyProps>({} as any);

export function ProviderContextBuy(props: any) {
  ///
  /// TESTES
  const [showList, setShowList] = useState(false);
  const [showCart, setShowCart] = useState(false);
  ///
  /// CONST INICIO
  const router = useRouter();
  const { setStepCurrent } = useSteps();
  const { httpGet, httpPost } = useApi();
  const { msgSucess, msgError } = useMessage();
  const { localsData, resetLocal } = useLocal();
  const { productsData, resetProduct } = useProduct();
  const [buy, setBuy] = useState<Partial<Buy>>(CreateEmptyBuy());
  const [buysData, setBuysData] = useState<Partial<Buy>[]>([]);
  // const [buyProductsList, setBuyProductsList] = useState<BuyProductItem[]>([]);
  /// CONST FINAL
  ///

  ///
  /// FUNCAO INICIO
  const loadingBuy = useCallback(
    async function () {
      try {
        const buysData = await httpGet(`${urlGetBuy}`);

        setBuysData(buysData);
      } catch (error) {
        msgError("compras nao carregadas");
      }
    },
    [httpGet, msgError, setBuysData]
  );

  const resetBuy = useCallback(() => {
    // setBuyProductsList([]);

    setBuy({});
    resetLocal();
    resetProduct();
    setStepCurrent(0);
    loadingBuy();
  }, [resetLocal, resetProduct, setStepCurrent, loadingBuy]);

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
        msgError("compra não salva");
      }
    },
    [httpPost, resetBuy, msgError, router]
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
  /// FUNCAO FINAL
  ///

  ///
  /// USE EFFECT INICIO
  useEffect(() => {
    loadingBuy();
  }, [loadingBuy]);
  /// USE EFFECT FINAL
  ///

  ///
  /// RETURN
  return (
    <ContextBuy.Provider
      value={{
        ...props,
        buy: buy,
        showCart,
        showList,
        buysData,
        localsData,
        productsData,
        ///
        saveBuy,
        resetBuy,
        loadingBuy,
        setShowCart,
        setShowList,
        updateBuy: setBuy,
        loadingBuyProducts,
      }}
    >
      {props.children}
    </ContextBuy.Provider>
  );
}

export default ContextBuy;
