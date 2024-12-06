"use client";

import { useState } from "react";

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
  // headers: { [key in keyof T]: string | number }; // Mapeia a chave do objeto para o nome exibido
  maxHeight?: number; // Tamanho máximo da lista
}

const MyList = <T,>({ data, columns, maxHeight = 300 }: MyListProps<T>) => {
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filtra os itens com base na pesquisa
  // const filteredData = data.filter((item) => {
  //   return Object.keys(headers).some((key) =>
  //     String(item[key as keyof T])
  //       .toUpperCase()
  //       .includes(searchQuery.toUpperCase())
  //   );
  // });

  return (
    <div>
      {/* Campo de pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar produto ou marca..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border rounded-xl p-2 mb-4 w-full text-white"
      />

      {/* Lista com cabeçalhos */}
      <div className={`overflow-auto max-h-96 rounded-lg bg-zinc-800/40`}>
        <table className="w-full border-collapse">
          {/* Cabeçalhos */}
          <thead>
            <tr>
              {columns.map(({ label }, index) => (
                <th
                  key={index}
                  className="border-b px-4 py-2 text-left select-none sticky top-0 bg-zinc-200 z-10"
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
                <tr key={index} className="hover:bg-zinc-800">
                  {columns.map(({ key, formatter }, colIndex) => (
                    <td
                      key={colIndex}
                      className="border-b px-4 py-2 text-white select-none cursor-pointer"
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
                <td colSpan={columns.length} className="text-center px-4 py-2">
                  Nenhum item encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyList;
