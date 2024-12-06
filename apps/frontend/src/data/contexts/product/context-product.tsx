"use client";

import useMessage from "@/data/hooks/use-message";
import { CreateEmptyProduct, Mark, Product } from "core";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import useApi from "../../hooks/use-api";
import useProduct from "../../hooks/use-mark";

const urlProduct = "/products/";
const urlGetProduct = "/products/get/all/";
const urlNewProducts = "/products/new/";
const urlValidateProducts = "/products/new/validate/description/";
// const urlValidateProducts = "/products/get/?search=";
const urlNewProductsSucess = "/products/new/sucess/";

export interface ContextProductProps {
  product: Partial<Product>;

  markDescription?: string;

  descriptionInUse: boolean;
  setDescriptionInUse: (value: boolean) => void;

  productsData: Partial<Product>[]; // Inclui as produtos disponíveis
  marksData: Partial<Mark>[]; // Inclui as produtos disponíveis

  queryProducts: string;
  setQueryProducts: (value: string) => void;

  saveProduct(): Promise<void>;
  updateProduct(product: Partial<Product>): void;
  loadingProduct(): Promise<void>;
}

const ContextProduct = createContext<ContextProductProps>({} as any);

export function ProviderContextProduct(props: any) {
  const router = useRouter();
  const { msgSucess } = useMessage();
  const { httpGet, httpPost } = useApi();

  const { marksData } = useProduct();

  const [productsData, setProductsData] = useState<Partial<Product>[]>([]);
  const [queryProducts, setQueryProducts] = useState("");

  const [descriptionInUse, setDescriptionInUse] = useState(false);
  const [product, setProduct] =
    useState<Partial<Product>>(CreateEmptyProduct());

  const saveProduct = useCallback(
    async function () {
      try {
        const productCreate = await httpPost(urlNewProducts, product);

        setProduct({
          ...productCreate,
        });

        msgSucess(
          `${product.description?.toUpperCase()} cadastrado com sucesso.`
        );

        router.push(urlProduct);

        setQueryProducts("");
      } catch (error) {
        // TODO: IMPLEMENTAR TRATAMENTO DE ERRO
        console.error(error);
      }
    },
    [product, httpPost, router, msgSucess]
  );

  const loadingProduct = useCallback(
    async function () {
      try {
        const product = await httpGet(`${urlGetProduct}`);

        setProductsData(product);
      } catch (error) {
        console.error(error);
      }
    },
    [httpGet, setProductsData]
  );

  // const validateDescription = useCallback(
  //   async function () {
  //     try {
  //       if (product.description == "") {
  //         console.error("Informe uma descrição");
  //       }

  //       const { inUse } = await httpGet(
  //         `${urlValidateProducts}${product.description}`
  //       );

  //       setDescriptionInUse(inUse);
  //     } catch (error) {
  //       // TODO: IMPLEMENTAR ERRO
  //       console.error(error);
  //     }
  //   },
  //   [httpGet, product]
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
  //   if (product?.description) validateDescription();
  // }, [product?.description, validateDescription]);

  // Carrega todas os produtos na inicialização
  useEffect(() => {
    async function loadProducts() {
      try {
        const products = await httpGet(urlGetProduct); // Requisição à API

        // products.map((products: Partial<Product>) => {
        //   products.lastPrice = +FormatMoney(products.lastPrice ?? 0);
        // });
        setProductsData(products); // Atualiza o estado com os dados corretos
      } catch (error) {
        console.error("Erro ao carregar:", error);
      }
    }
    loadProducts();
  }, [httpGet, setProductsData]);

  return (
    <ContextProduct.Provider
      value={{
        product: product,
        descriptionInUse: descriptionInUse,
        marksData,
        queryProducts,
        productsData,
        updateProduct: setProduct,
        setDescriptionInUse,
        setQueryProducts,
        saveProduct,
        loadingProduct,
      }}
    >
      {props.children}
    </ContextProduct.Provider>
  );
}

export default ContextProduct;
