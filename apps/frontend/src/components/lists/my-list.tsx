"use client";

import useApi from "@/data/hooks/use-api";
import useBuy from "@/data/hooks/use-buy";
import useMark from "@/data/hooks/use-mark";
import useProduct from "@/data/hooks/use-product";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Product } from "core/dist";
import { useCallback, useState } from "react";
import AdjustableLine from "../shared/Adjustable-Line";
import MyInput from "../shared/My-Input";
import Window from "../shared/Window";
import MyModal from "./my-modal";

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

const MyList = <T,>({
  data,
  dataModal,
  columns,
  onClick,
  columnsModal,
  windowTitle,
  windowLabel,
}: MyListProps<T>) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<T | null>(null); // Estado para item selecionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal
  const [isOpenEdit, setIsOpenEdit] = useState(false); // Estado para controlar o modal
  const [isOpenDelete, setIsOpenDelete] = useState(false); // Estado para controlar o modal
  const [showHead, setShowHead] = useState(true); // Estado para controlar o modal

  const { loadingBuyProducts } = useBuy();
  const { httpGet } = useApi();

  const [purchaseData, setPurchaseData] = useState<any>([]); // Dados das compras do produto

  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  ); // ID do produto selecionado
  const { product, setProduct, getProduct, updateProduct, productsData } =
    useProduct(); // Dados do produto para editar
  const { mark, updateMark } = useMark(); // Dados do produto para editar
  const [editedProduct, setEditedProduct] = useState<Product | null>(); // Produto sendo editado

  // Função para abrir o modal de edição ao selecionar um produto
  const handleEditProduct = (id: string) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
    // Preencher o produto com os dados do produto selecionado
    const productToEdit: any = getProduct(id);
    setProduct(productToEdit); // Atualizando o estado do produto editado
  };

  const getValueByPath = (obj: any, path: string) => {
    return path
      .split(".")
      .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
  };

  // Filtra os itens com base na pesquisa
  const filteredData = data.filter((item) => {
    return columns.some(({ key }) => {
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
      setSelectedItem(item); // Define o item selecionado
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
  const handleClickEditarProduto = useCallback(
    async (item: T) => {
      setSelectedItem(item); // Define o item selecionado
      setIsOpenEdit(true); // Abre o modal

      try {
        const data1 = productsData.find(
          (produto) => produto.id === (item as any).id
        );
        setProduct({ ...data1 }); // Salva os dados das compras no estado
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setProduct({}); // Define estado vazio em caso de erro
      }
    },
    [productsData, setProduct] // Dependência do useCallback
  );

  const handleSave = () => {
    const confirmacao = window.confirm(
      "Você tem certeza que deseja salvar as alterações?"
    );

    if (confirmacao) {
      updateProduct(product);
      setIsOpenEdit(false);
    }
  };
  return (
    <Window
      title={windowTitle ? windowTitle : "***titulo não informado"}
      label={windowLabel ? windowLabel : ""}
    >
      <div>
        <div className="flex flex-row items-center gap-2 mb-2">
          <div className="flex-1 pb-2">
            {/* Campo de pesquisa */}
            <MyInput
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
          <table className="w-screen border-collapse items-center max-w-full">
            {/* Cabeçalhos */}
            <thead>
              <tr>
                {columns.map(({ label }, index) => (
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
                    {columns.map(({ key, formatter }, colIndex) => (
                      <td
                        key={colIndex}
                        className="border-b px-3 py-1 text-white select-none xs:text-sm"
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
                    <td className="border-b py-1">
                      <div className="flex justify-between space-x-2 px-1">
                        <button
                          title="Compras"
                          type="button"
                          className="bg-blue-400 p-1 rounded-full"
                          onClick={() => handleClickVerCompras(item)}
                        >
                          <VisibilityIcon />
                        </button>
                        <button
                          title="Editar"
                          type="button"
                          className="bg-yellow-400 p-1 rounded-full"
                          onClick={() => handleClickEditarProduto(item)}
                        >
                          <EditIcon />
                        </button>
                        <button
                          title="Excluir"
                          type="button"
                          className="bg-red-400 p-1 rounded-full"
                          onClick={() => setIsOpenDelete(true)}
                        >
                          <DeleteForeverIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center px-4 py-2 text-white"
                  >
                    {data.length === 0
                      ? "Buscando produtos..."
                      : "Nenhum item encontrado."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Modal para exibir informações do item selecionado */}
        <MyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)} // Fecha o modal
          title={purchaseData[0]?.products[0]?.products.description || ""}
          label={purchaseData[0]?.products[0]?.products.id || ""}
        >
          {/* Exibir o nome do produto no topo do modal */}
          {purchaseData.length > 0 ? (
            <div>
              {purchaseData.map((purchase: any) => (
                <div key={purchase.id} className="mb-2">
                  <p>
                    <strong>Data:</strong>{" "}
                    {new Date(purchase.buyDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Local:</strong> {purchase.local.description}
                  </p>
                  <div>
                    {purchase.products.map((prod: any, index: number) => (
                      <div key={index}>
                        <p>
                          <strong>Marca: </strong>
                          {prod.products.mark.description}
                        </p>
                        <p>
                          <strong>Preço: </strong>
                          {prod.unitPrice}
                        </p>
                      </div>
                    ))}
                  </div>
                  <AdjustableLine />
                </div>
              ))}
            </div>
          ) : (
            <p>Nenhuma compra encontrada.</p>
          )}
        </MyModal>
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
                <div className="max-h-80 overflow-y-auto">
                  <label className="block text-sm font-medium text-gray-700 mt-2">
                    <MyInput
                      label="Descrição"
                      className="bg-purple-400"
                      value={product?.description?.toUpperCase() || ""}
                      onChange={(e) =>
                        setProduct({ ...product, description: e.target.value })
                      }
                    />
                  </label>
                  <label className="block text-sm font-medium text-gray-700">
                    <MyInput
                      label="Código de Barras"
                      className="bg-purple-400"
                      value={product?.codeBar || ""}
                      onChange={(e) =>
                        setProduct({ ...product, codeBar: e.target.value })
                      }
                    />
                  </label>
                  <label className="block text-sm font-medium text-gray-700">
                    <MyInput
                      label="Marca"
                      className="bg-purple-400"
                      value={product?.mark?.description || ""}
                      onChange={(e) =>
                        setProduct({ ...product, markId: e.target.value })
                      }
                    />
                  </label>
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
                  <div className="text-[10px] text-black">DELETAR PRODUTO</div>
                  <div className="text-lg font-bold">
                    {product?.description || "-"}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {product?.id || "-"}
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <label className="block text-sm font-medium text-gray-700 mt-2">
                    {product?.mark?.description || ""}
                  </label>
                  <label className="block text-sm font-medium text-gray-700">
                    <MyInput
                      label="Código de Barras"
                      className="bg-purple-400"
                      value={product?.codeBar || ""}
                      onChange={(e) =>
                        setProduct({ ...product, codeBar: e.target.value })
                      }
                    />
                  </label>
                  <label className="block text-sm font-medium text-gray-700">
                    <MyInput
                      label="Marca"
                      className="bg-purple-400"
                      value={product?.mark?.description || ""}
                      onChange={(e) =>
                        setProduct({ ...mark, description: e.target.value })
                      }
                    />
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
                    onClick={handleSave}
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
      </div>
    </Window>
  );
};

export default MyList;
