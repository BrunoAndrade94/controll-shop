"use client";

import useMessage from "@/data/hooks/use-message";
import { CreateEmptyProduct, Mark, Product } from "core";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import useApi from "../../hooks/use-api";
import useMark from "../../hooks/use-mark";

const urlProduct = "/products/";
const urlGetProduct = "/products/get/all/";
const urlDeleteProduct = "/products/delete/";
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
  setProductsData: React.Dispatch<React.SetStateAction<Partial<Product>[]>>;

  marksData: Partial<Mark>[]; // Inclui as produtos disponíveis

  queryProducts: string;
  setQueryProducts: (value: string) => void;

  resetProduct(): void;
  saveProduct(): Promise<void>;
  loadingProduct(): Promise<void>;
  deleteProduct(id: string): void;
  updateProduct(product: Partial<Product>): void;
}

const ContextProduct = createContext<ContextProductProps>({} as any);

export function ProviderContextProduct(props: any) {
  const router = useRouter();
  const { msgSucess } = useMessage();
  const { httpGet, httpPost, httpPut } = useApi();

  const { marksData, resetMark } = useMark();

  const [productsData, setProductsData] = useState<Partial<Product>[]>([]);
  const [queryProducts, setQueryProducts] = useState<string>("");

  const [descriptionInUse, setDescriptionInUse] = useState(false);
  const [product, setProduct] =
    useState<Partial<Product>>(CreateEmptyProduct());

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

  const resetProduct = useCallback(() => {
    setProduct({});
    resetMark();
    setQueryProducts("");
    setProductsData([]);
    loadingProduct();
  }, [loadingProduct, resetMark]);

  const deleteProduct = useCallback(
    async function (id: string) {
      try {
        if (id.length > 0) {
          await httpPut(urlDeleteProduct, id);
        }
      } catch (error) {
        // TODO: IMPLEMENTAR TRATAMENTO DE ERRO
        console.error(error);
      }
    },
    [httpPut]
  );

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

        resetProduct();
      } catch (error) {
        // TODO: IMPLEMENTAR TRATAMENTO DE ERRO
        console.error(error);
      }
    },
    [product, httpPost, router, msgSucess, resetProduct]
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
        marksData,
        productsData,
        queryProducts,
        product: product,
        descriptionInUse: descriptionInUse,
        saveProduct,
        resetProduct,
        deleteProduct,
        loadingProduct,
        setProductsData,
        setQueryProducts,
        setDescriptionInUse,
        updateProduct: setProduct,
      }}
    >
      {props.children}
    </ContextProduct.Provider>
  );
}

export default ContextProduct;
