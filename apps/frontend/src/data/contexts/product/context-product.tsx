"use client";

import useMessage from "@/data/hooks/use-message";
import { CreateEmptyProduct, Mark, Product } from "core";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import useApi from "../../hooks/use-api";
import useMark from "../../hooks/use-mark";

const urlProduct = "/products/";
const urlProductList = "/products/list/";
const urlGetIdProduct = "/products/get/id/";
const urlUpdateIdProduct = "/products/update/id/";
const urlGetProduct = "/products/get/all/";
const urlDeleteProduct = "/products/delete/id/";
const urlNewProducts = "/products/new/";
const urlValidateProducts = "/products/new/validate/description/";
// const urlValidateProducts = "/products/get/?search=";
const urlNewProductsSucess = "/products/new/sucess/";

const urlUpdateProducts = "";

export interface ContextProductProps {
  product: Partial<Product>;
  setProduct: React.Dispatch<React.SetStateAction<Partial<Product>>>;

  markDescription?: string;

  descriptionInUse: boolean;
  setDescriptionInUse: (value: boolean) => void;

  productsData: Partial<Product>[]; // Inclui as produtos disponíveis
  setProductsData: React.Dispatch<React.SetStateAction<Partial<Product>[]>>;

  filteredProducts: Partial<Product>[]; // Inclui as produtos disponíveis
  setFilteredProducts: React.Dispatch<React.SetStateAction<Partial<Product>[]>>;

  marksData: Partial<Mark>[]; // Inclui as produtos disponíveis

  queryProducts: string;
  setQueryProducts: (value: string) => void;

  resetProduct(): void;
  saveProduct(): Promise<void>;
  getProduct(id: string): void;
  loadingProduct(): Promise<void>;
  deleteProduct(id: string): void;
  updateProduct(product: Partial<Product>): void;
}

const ContextProduct = createContext<ContextProductProps>({} as any);

export function ProviderContextProduct(props: any) {
  const router = useRouter();
  const { msgSucess, msgError } = useMessage();
  const { httpGet, httpPost, httpPut } = useApi();

  const { marksData, resetMark } = useMark();

  const [filteredProducts, setFilteredProducts] = useState<Partial<Product>[]>(
    []
  );

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
        setFilteredProducts([]);
      } catch (error) {
        console.error(error);
      }
    },
    [httpGet, setProductsData, setFilteredProducts]
  );

  const resetProduct = useCallback(() => {
    setProduct({});
    resetMark();
    setQueryProducts("");
    setProductsData([]);
    loadingProduct();
  }, [loadingProduct, resetMark]);
  //
  /// CONSTRUIR A BAIXO

  const updateProduct = useCallback(
    async function () {
      try {
        const updateProduct = await httpPut(
          `${urlUpdateIdProduct}${product.id}`,
          product
        );

        setProduct({ ...updateProduct });

        // Exibe uma mensagem de sucesso
        msgSucess(
          `${product.description?.toUpperCase()} ATUALIZADO COM SUCESSO.`
        );

        await loadingProduct();
      } catch (error) {
        msgError(`NÃO FOI POSSIVEL ATUALIZAR ${product.description}`);
      }
    },
    [httpPut, setProduct, product, msgSucess, loadingProduct, msgError]
  );

  // const updateProduct = useCallback(
  //   async function () {
  //     try {
  //       // Faz a requisição de atualização
  //       const updatedProduct = await httpPut(
  //         `${urlUpdateProducts}${product.id}`,
  //         product
  //       );

  //       // Atualiza o estado com o produto atualizado
  //       setProduct({
  //         ...updatedProduct,
  //       });

  //       // Exibe uma mensagem de sucesso
  //       msgSucess(
  //         `${product.description?.toUpperCase()} atualizado com sucesso.`
  //       );

  //       // Redireciona para a página de produtos
  //       router.push(urlProduct);

  //       // Reseta o estado do produto
  //       resetProduct();
  //     } catch (error) {
  //       // TODO: IMPLEMENTAR TRATAMENTO DE ERRO
  //       console.error("Erro ao atualizar o produto:", error);
  //     }
  //   },
  //   [product, httpPut, router, msgSucess, resetProduct]
  // );

  const getProduct = useCallback(
    async function (id: string) {
      try {
        const product = await httpGet(`${urlGetIdProduct}${id}`);

        setProduct(product);
        return product;
      } catch (error) {
        console.error(error);
      }
    },
    [httpGet, setProduct]
  );

  const deleteProduct = useCallback(
    async function (id: string) {
      try {
        console.log(id);
        if (id.length > 0) {
          const a = await httpPut(urlDeleteProduct, id);
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
        const productsData = await httpGet(urlGetProduct); // Requisição à API

        // products.map((products: Partial<Product>) => {
        //   products.lastPrice = +FormatMoney(products.lastPrice ?? 0);
        // });
        setProductsData(productsData); // Atualiza o estado com os dados corretos
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
        getProduct,
        setProduct,
        saveProduct,
        resetProduct,
        updateProduct,
        filteredProducts,
        setFilteredProducts,
        deleteProduct,
        loadingProduct,
        setProductsData,
        setQueryProducts,
        setDescriptionInUse,
      }}
    >
      {props.children}
    </ContextProduct.Provider>
  );
}

export default ContextProduct;
