"use client";

import { CreateEmptyProduct, Data, Product } from "core";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import useApi from "../../hooks/use-api";
import useProduct from "../../hooks/use-mark";

const urlGetProduct = "/products/get/";
const urlNewProducts = "/products/new/";
const urlValidateProducts = "/products/new/validate/description/";
// const urlValidateProducts = "/products/get/?search=";
const urlNewProductsSucess = "/products/new/sucess/";

export interface ContextProductProps {
  product: Partial<Product>;
  markDescription?: string;
  descriptionInUse: boolean;

  marksLocal: Partial<Product>[]; // Inclui as produtos disponíveis
  productsLocal: Partial<Product>[]; // Inclui as produtos disponíveis

  saveProduct(): Promise<void>;
  updateProduct(product: Partial<Product>): void;
  loadingProduct(id: string): Promise<void>;
}

const ContextProduct = createContext<ContextProductProps>({} as any);

export function ProviderContextProduct(props: any) {
  const { httpGet, httpPost } = useApi();

  const router = useRouter();
  const { marksLocal } = useProduct();

  const [productsLocal, setProductsLocal] = useState<Partial<Product>[]>([]);

  const [descriptionInUse, setDescriptionInUse] = useState(false);
  const [product, setProduct] =
    useState<Partial<Product>>(CreateEmptyProduct());

  const saveProduct = useCallback(
    async function () {
      try {
        const productCreate = await httpPost(urlNewProducts, product);
        router.push(urlNewProductsSucess);

        setProduct({
          ...productCreate,
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
        if (product.description == "") {
          console.error("Informe uma descrição");
        }

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

  // Carrega todas as produtos na inicialização
  useEffect(() => {
    async function loadProducts() {
      try {
        const marks = await httpGet(urlGetProduct); // Requisição à API
        setProductsLocal(marks); // Atualiza o estado com os dados corretos
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    }
    loadProducts();
  }, [httpGet]);

  return (
    <ContextProduct.Provider
      value={{
        product: product,
        descriptionInUse: descriptionInUse,
        marksLocal,
        productsLocal,
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
