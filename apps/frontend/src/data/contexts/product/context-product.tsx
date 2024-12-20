"use client";

import useMessage from "@/data/hooks/use-message";
import useSteps from "@/data/hooks/use-steps";
import { CreateEmptyProduct, Mark, Product } from "core";
import { createContext, useCallback, useEffect, useState } from "react";
import useApi from "../../hooks/use-api";
import useMark from "../../hooks/use-mark";

const urlNewProducts = "/products/new/";
const urlGetProduct = "/products/get/all/";
const urlGetIdProduct = "/products/get/id/";
const urlDeleteProduct = "/products/delete/id/";
const urlUpdateIdProduct = "/products/update/id/";

///
/// INTERFACE INICIO
export interface ContextProductProps {
  queryProducts: string;
  markDescription?: string;
  product: Partial<Product>;
  descriptionInUse: boolean;
  showListProducts: boolean;
  marksData: Partial<Mark>[];
  productsData: Partial<Product>[];
  filteredProducts: Partial<Product>[];

  resetProduct(): void;
  saveProduct(): Promise<void>;
  getProduct(id: string): void;
  loadingProduct(): Promise<void>;
  deleteProduct(id: string): void;
  setQueryProducts: (value: string) => void;
  setDescriptionInUse: (value: boolean) => void;
  setShowListProducts: (value: boolean) => void;
  updateProduct(product: Partial<Product>): void;
  setProduct: React.Dispatch<React.SetStateAction<Partial<Product>>>;
  setProductsData: React.Dispatch<React.SetStateAction<Partial<Product>[]>>;
  setFilteredProducts: React.Dispatch<React.SetStateAction<Partial<Product>[]>>;
}
/// INTERFACE FINAL
///

const ContextProduct = createContext<ContextProductProps>({} as any);

export function ProviderContextProduct(props: any) {
  ///
  /// CONST INICIO
  const { setStepCurrent } = useSteps();
  const { marksData, resetMark } = useMark();
  const { msgSucess, msgError } = useMessage();
  const { httpGet, httpPost, httpPut } = useApi();
  const [queryProducts, setQueryProducts] = useState<string>("");
  const [descriptionInUse, setDescriptionInUse] = useState(false);
  const [showListProducts, setShowListProducts] = useState(false);
  const [productsData, setProductsData] = useState<Partial<Product>[]>([]);
  const [product, setProduct] =
    useState<Partial<Product>>(CreateEmptyProduct());
  const [filteredProducts, setFilteredProducts] = useState<Partial<Product>[]>(
    []
  );
  /// CONST FINAL
  ///

  ///
  /// FUNCAO INICIO
  const loadingProduct = useCallback(
    async function () {
      try {
        const product = await httpGet(`${urlGetProduct}`);

        setProductsData(product);
        setFilteredProducts([]);
      } catch (error) {
        msgError("erro ao carregar produtos");
      }
    },
    [httpGet, setProductsData, setFilteredProducts, msgError]
  );

  const resetProduct = useCallback(() => {
    resetMark();
    setProduct({});
    setStepCurrent(0);
    setProductsData([]);
    setQueryProducts("");
    loadingProduct();
  }, [loadingProduct, resetMark, setStepCurrent]);

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

  const getProduct = useCallback(
    async function (id: string) {
      try {
        const product = await httpGet(`${urlGetIdProduct}${id}`);

        setProduct(product);
        return product;
      } catch (error) {
        msgError("erro ao obter produto");
      }
    },
    [httpGet, setProduct, msgError]
  );

  const deleteProduct = useCallback(
    async function (id: string) {
      try {
        if (id.length > 0) {
          const a = await httpPut(urlDeleteProduct, id);
        }
      } catch (error) {
        msgError("erro ao deletar produto");
      }
    },
    [httpPut, msgError]
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

        resetProduct();
      } catch (error) {
        msgError("erro ao salvar produto");
      }
    },
    [product, httpPost, msgSucess, resetProduct, msgError]
  );
  /// FUNCAO FINAL
  ///

  ///
  /// USE EFFECT INICIO
  useEffect(() => {
    loadingProduct();
  }, []);
  /// USE EFFECT FINAL
  ///

  ///
  /// RETURN
  return (
    <ContextProduct.Provider
      value={{
        setShowListProducts,
        showListProducts,
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
