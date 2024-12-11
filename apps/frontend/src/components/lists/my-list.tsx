"use client";

import { useState } from "react";
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
  columns: ColumnConfig<T>[];
  columnsModal: ColumnConfig<T>[];
  onRowClick?: (item: T) => Promise<any>; // Função para buscar informações adicionais
  onClick?: (item: any) => any; // Função para buscar informações adicionais

  windowTitle?: string;
  windowLabel?: string;
}

const MyList = <T,>({
  data,
  columns,
  onClick,
  columnsModal,
  windowTitle,
  windowLabel,
}: MyListProps<T>) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<T | null>(null); // Estado para item selecionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal
  const [showHead, setShowHead] = useState(true); // Estado para controlar o modal

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

  const handleRowClick = (item: T) => {
    setSelectedItem(item); // Define o item selecionado
    setIsModalOpen(true); // Abre o modal
  };

  return (
    <Window
      title={windowTitle ? windowTitle : "*titulo não informado"}
      label={windowLabel ? windowLabel : ""}
    >
      <div>
        <div className="flex flex-row items-center gap-2 mb-2">
          <div className="flex-1 pb-2">
            {/* Campo de pesquisa */}
            <input
              type="text"
              placeholder="Pesquisar por produto ou marca..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded-xl p-2 w-full bg-purple-400 
							placeholder:text-black placeholder:focus:text-zinc-500 
							border-purple-900 pl-4 focus:border-purple-700"
            />
          </div>
        </div>

        {/* Lista com cabeçalhos */}
        <div className={`overflow-auto max-h-96 rounded-lg bg-zinc-800/40`}>
          <table className="w-full border-collapse">
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
              </tr>
            </thead>
            {/* Corpo da tabela com dados filtrados */}
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-purple-500 cursor-pointer"
                    onClick={() => handleRowClick(item)}
                  >
                    {columns.map(({ key, formatter }, colIndex) => (
                      <td
                        key={colIndex}
                        className="border-b px-4 py-2 text-white select-none"
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center px-4 py-2 text-white"
                  >
                    Nenhum item encontrado
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
          title="Detalhes do Produto"
          onClick={onClick}
        >
          {selectedItem && (
            <div>
              {columnsModal.map(({ key, label }) => (
                <div key={String(key)} className="mb-2">
                  <strong>{label}:</strong>{" "}
                  {typeof key === "string"
                    ? getValueByPath(selectedItem, key)
                    : selectedItem[key as keyof T]}
                </div>
              ))}
            </div>
          )}
        </MyModal>
      </div>
    </Window>
  );
};

export default MyList;
