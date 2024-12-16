"use client";

import useBuy from "@/data/hooks/use-buy";
import useMark from "@/data/hooks/use-mark";
import useProduct from "@/data/hooks/use-product";
import { Product } from "core";
import { useCallback, useEffect, useState } from "react";
import PurchaseModal from "../modal/modal-purchase-details";
import MyInput from "../shared/My-Input";
import InputComLista from "../shared/My-Input-Selectable";
import Window from "../shared/Window";
import BotoesDeAcao from "./botoes-de-acao";
import MyModal from "./modal-compras-produto";

// Definindo a estrutura da prop para o componente
interface ColumnConfig<T> {
  key: keyof T | string; // Chave do dado ou caminho (ex.: "mark.description")
  label: string; // Rótulo exibido na tabela
  formatter?: (value: any) => string; // Opcional: Formata o valor antes de exibir
}

// Definindo a estrutura da props para o componente
interface MyListProps<T> {
  data: T[]; // Aceita qualquer tipo de lista genérica
  dataModal: T[]; // Aceita qualquer tipo de lista genérica

  columns: ColumnConfig<T>[];
  columnsModal: ColumnConfig<T>[];

  onRowClick?: (item: T) => Promise<any>; // Função para buscar informações adicionais
  onClick?: (item: any) => any; // Função para buscar informações adicionais

  windowTitle?: string;
  windowLabel?: string;
}

const MyList = <T,>(props: MyListProps<T>) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<T | null>(null); // Estado para item selecionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal
  const [isOpenEdit, setIsOpenEdit] = useState(false); // Estado para controlar o modal
  const [isOpenDelete, setIsOpenDelete] = useState(false); // Estado para controlar o modal
  const [showHead, setShowHead] = useState(true); // Estado para controlar o modal

  const { marksData, queryMarks, setQueryMarks } = useMark();

  const { loadingBuyProducts } = useBuy();

  const [purchaseData, setPurchaseData] = useState<any>([]); // Dados das compras do produto

  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  ); // ID do produto selecionado

  const {
    product,
    setProduct,
    getProduct,
    updateProduct,
    productsData,
    deleteProduct,
  } = useProduct(); // Dados do produto para editar
  const { mark, updateMark } = useMark(); // Dados do produto para editar
  const [editedProduct, setEditedProduct] = useState<Product | null>(); // Produto sendo editado

  // Função para abrir o modal de edição ao selecionar um produto
  // const handleEditProduct = (id: string) => {
  //   setSelectedProductId(id);
  //   setIsModalOpen(true);
  //   // Preencher o produto com os dados do produto selecionado
  //   const productToEdit: any = getProduct(id);
  //   setProduct(productToEdit); // Atualizando o estado do produto editado

  //   deleteProduct(id);
  // };

  const getValueByPath = (obj: any, path: string) => {
    return path
      .split(".")
      .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
  };

  // Filtra os itens com base na pesquisa
  const filteredData = props.data.filter((item) => {
    return props.columns.some(({ key }) => {
      const value =
        typeof key === "string"
          ? getValueByPath(item, key)
          : item[key as keyof T];
      return String(value).toUpperCase().includes(searchQuery.toUpperCase());
    });
  });

  // const handleClickVerCompras = (item: T) => {
  //   setSelectedItem(item); // Define o item selecionado
  //   setIsModalOpen(true); // Abre o modal
  // };

  // Carrega dados relacionados ao produto
  const handleClickVerCompras = useCallback(
    async (item: T) => {
      setIsModalOpen(true); // Abre o modal

      try {
        const data = await loadingBuyProducts((item as any).id ?? "");
        setPurchaseData(data); // Salva os dados das compras no estado
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setPurchaseData([]); // Define estado vazio em caso de erro
      }
    },
    [loadingBuyProducts] // Dependência do useCallback
  );

  // Carrega dados relacionados ao produto
  const handleClickDeleteProduto = useCallback(
    async (item: T) => {
      setIsOpenDelete(true); // Abre o modal

      try {
        const data = productsData.find(
          (produto) => produto.id === (item as any).id
        );

        setProduct({ ...data });
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setProduct({}); // Define estado vazio em caso de erro
      }
    },
    [productsData, setProduct] // Dependência do useCallback
  );

  // Carrega dados relacionados ao produto
  const handleClickEditarProduto = useCallback(
    async (item: T) => {
      setIsOpenEdit(true); // Abre o modal

      try {
        const data = productsData.find(
          (produto) => produto.id === (item as any).id
        );
        setProduct({ ...data }); // Salva os dados das compras no estado
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setProduct({}); // Define estado vazio em caso de erro
      }
    },
    [productsData, setProduct] // Dependência do useCallback
  );

  const handleSave = () => {
    const confirmacao = window.confirm(
      `Deseja salvar ${product.description} ?`
    );

    if (confirmacao) {
      updateProduct(product);
      setIsOpenEdit(false);
    }
  };

  const handleDelete = () => {
    const confirmacao = window.confirm(
      `Deseja deletar ${product.description} ?`
    );

    if (confirmacao) {
      deleteProduct(product.id ?? "");
      setIsOpenDelete(false);
    }
  };

  useEffect(() => {
    // console.log(product);
  }, [product]);

  return (
    <div className="ml-5 mr-5">
      <Window
        title={
          props.windowTitle ? props.windowTitle : "***titulo não informado"
        }
        label={props.windowLabel ? props.windowLabel : ""}
      >
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2 mb-2">
            <div className="flex-1 pb-2">
              {/* Campo de pesquisa */}
              <MyInput
                disabled={productsData.length === 0}
                placeholder="Pesquisar"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </div>
          </div>
          {/* Lista com cabeçalhos */}
          <div
            className={`overflow-y-auto overflow-x-hidden max-h-[22rem] rounded-lg bg-zinc-800/40`}
          >
            <table className="w-full border-collapse items-center max-w-screen">
              {/* Cabeçalhos */}
              <thead>
                <tr>
                  {props.columns.map(({ label }, index) => (
                    <th
                      key={index}
                      className="border-b px-4 py-2 text-left select-none sticky top-0 bg-purple-200 z-10"
                    >
                      {label} {/* Exibe o rótulo */}
                    </th>
                  ))}
                  <th className="border-b px-4 py-2 text-left select-none sticky top-0 bg-purple-200 z-10">
                    Ações {/* Coluna para os botões */}
                  </th>
                </tr>
              </thead>
              {/* Corpo da tabela com dados filtrados */}
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index}>
                      {props.columns.map(({ key, formatter }, colIndex) => (
                        <td
                          key={colIndex}
                          className="border-b px-3 py-1 text-white select-none sm:text-lg xs:text-xs"
                        >
                          {formatter
                            ? formatter(
                                typeof key === "string"
                                  ? getValueByPath(item, key)
                                  : item[key as keyof T]
                              )
                            : String(
                                typeof key === "string"
                                  ? getValueByPath(item, key)
                                  : item[key as keyof T]
                              )}
                        </td>
                      ))}
                      {/* Coluna de ações */}
                      <BotoesDeAcao
                        onView={() => handleClickVerCompras(item)}
                        onEdit={() => handleClickEditarProduto(item)}
                        onDelete={() => handleClickDeleteProduto(item)}
                      />
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={props.columns.length}
                      className="text-center px-4 py-2 text-white select-none"
                    >
                      {props.data.length === 0
                        ? "Aguarde buscando produtos..."
                        : "Nenhum item encontrado."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/*CRIADO INICIO MODAL DETALHES*/}
          <PurchaseModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            purchaseData={purchaseData}
          />
          {/*CRIADO FINAL MODAL DETALHES*/}

          {/*CRIADO INICIO MODAL EDIT*/}
          <MyModal
            isOpen={isOpenEdit}
            onClose={() => setIsOpenEdit(false)} // Fecha o modal
            title={purchaseData[0]?.products[0]?.products.description || ""}
            label={purchaseData[0]?.products[0]?.products.id || ""}
          >
            {isOpenEdit && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
                <div className="bg-purple-300 rounded-lg shadow-lg w-full max-w-md mx-auto xs:w-full m-3 p-4 flex flex-col">
                  <div className="flex flex-col justify-between items-start">
                    <div className="text-[10px] text-black">
                      ATUALIZAR PRODUTO
                    </div>
                    <div className="text-lg font-bold">
                      {product?.description?.toUpperCase() || "-"}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {product?.id || "-"}
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <label className="block text-sm font-medium text-gray-700 mt-2">
                      <MyInput
                        descriptionFixed="Descrição"
                        label="Descrição"
                        value={product?.description?.toUpperCase() || ""}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            description: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                      <MyInput
                        descriptionFixed="Código de Barras"
                        label="Código de Barras"
                        value={product?.codeBar || ""}
                        onChange={(e) =>
                          setProduct({ ...product, codeBar: e.target.value })
                        }
                      />
                    </label>
                    <div className="flex flex-col gap-5">
                      <InputComLista
                        descriptionFixed="Marca"
                        label="Selecione uma marca"
                        value={product.mark?.description || ""}
                        items={marksData}
                        onChange={(value) => {
                          product.mark!.description = value;
                        }}
                        onSelect={(id, description) => {
                          setProduct({
                            ...product,
                            markId: id,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => setIsOpenEdit(false)}
                      className="botao verde"
                      type="button"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      className="botao azul"
                      type="button"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </MyModal>
          {/*CRIADO FINAL MODAL EDIT*/}

          {/*CRIADO INICIO MODAL EXCLUIR*/}
          <MyModal
            isOpen={isOpenDelete}
            onClose={() => setIsOpenDelete(false)} // Fecha o modal
            title={purchaseData[0]?.products[0]?.products.description || ""}
            label={purchaseData[0]?.products[0]?.products.id || ""}
          >
            {isOpenDelete && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-purple-300 rounded-lg shadow-lg w-full max-w-md mx-auto xs:w-full m-3 p-4 flex flex-col">
                  <div className="flex flex-col justify-between items-start">
                    <div className="text-[10px] text-black">
                      DELETAR PRODUTO
                    </div>
                    <div className="text-lg font-bold">
                      {product?.description || "-"}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {product?.id || "-"}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mt-2">
                      <span className="text-zinc-500 text-[10px]">Marca: </span>
                      {product?.mark?.description || ""}
                    </label>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => setIsOpenDelete(false)}
                      className="botao verde"
                      type="button"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleDelete}
                      className="botao azul"
                      type="button"
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </MyModal>
          {/*CRIADO FINAL MODAL EXCLUIR*/}
        </div>
      </Window>
    </div>
  );
};

export default MyList;
