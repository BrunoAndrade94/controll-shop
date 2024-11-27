/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { CreateEmptyProduct, Data, Product } from "core";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import useApi from "../hooks/use-api";

const urlGetProduct = "/products/get";
const urlNewProducts = "/products/new";
const urlValidateProducts = "/products/new/validate/description";
const urlNewProductsSucess = "/products/new/sucess";

export interface ContextProductProps {
  product: Partial<Product>;
  descriptionInUse: boolean;

  saveProduct(): Promise<void>;
  updateProduct(product: Product): void;
  loadingProduct(id: string): Promise<void>;
}

const ContextProduct = createContext<ContextProductProps>({} as any);

export function ProviderContextProduct(props: any) {
  const { httpGet, httpPost } = useApi();
  const router = useRouter();

  const [descriptionInUse, setDescriptionInUse] = useState(true);
  const [product, setProduct] =
    useState<Partial<Product>>(CreateEmptyProduct());

  const saveProduct = useCallback(
    async function () {
      try {
        const productCreate = await httpPost(urlNewProducts, product);
        router.push(urlNewProductsSucess);

        setProduct({
          ...productCreate,
          createDate: Data.unformat(productCreate.createDate),
        });
      } catch (error) {
        // TODO: IMPLEMENTAR TRATAMENTO DE ERRO
        console.error(error);
      }
    },
    [product, httpPost, router]
  );

  const loadingProduct = useCallback(
    async function (description: string) {
      try {
        const product = await httpGet(`${urlGetProduct}${description}`);

        setProduct({
          ...product,
          createDate: Data.unformat(product.createDate),
        });
      } catch (error) {
        console.error(error);
      }
    },
    [setProduct, httpGet]
  );

  const validateDescription = useCallback(
    async function () {
      try {
        const { inUse } = await httpGet(
          `${urlValidateProducts}${product.description}`
        );

        setDescriptionInUse(inUse);
      } catch (error) {
        // TODO: IMPLEMENTAR ERRO
        console.error(error);
      }
    },
    [httpGet, product]
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
    if (product?.description) validateDescription();
  }, [product?.description, validateDescription]);

  return (
    <ContextProduct.Provider
      value={{
        product: product,
        descriptionInUse: descriptionInUse,
        updateProduct: setProduct,
        saveProduct,
        loadingProduct,
      }}
    >
      {props.children}
    </ContextProduct.Provider>
  );
}

export default ContextProduct;
