"use client";

import { useState } from "react";

interface MyListProps {
  data: {
    id: string;
    description: string;
    lastPrice?: number;
  }[]; // Lista de objetos
  headers: (keyof { id: string; description: string })[];
  maxHeight?: number; // Tamanho máximo da lista
}

const MyList: React.FC<MyListProps> = ({ data, headers, maxHeight = 300 }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filtra os itens com base na pesquisa
  const filteredData = data.filter((item) => {
    return headers.some((header) =>
      String(item[header]).toUpperCase().includes(searchQuery.toUpperCase())
    );
  });

  return (
    <div className="relative">
      {/* Campo de pesquisa */}
      <input
        type="text"
        placeholder="Pesquise..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border rounded-xl p-2 mb-4 w-full text-white"
      />

      {/* Lista com cabeçalhos */}
      <div className={`overflow-auto max-h-[${maxHeight}px]`}>
        <table className="w-full border-collapse">
          {/* Cabeçalhos */}
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="border-b px-4 py-2 text-left select-none"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Corpo da tabela com dados filtrados */}
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-zinc-800">
                  {headers.map((header, idx) => (
                    <td
                      key={idx}
                      className="border-b px-4 py-2 text-white select-none"
                    >
                      {item[header]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center px-4 py-2">
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
