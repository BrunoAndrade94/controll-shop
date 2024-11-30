"use client";

import useMark from "@/data/hooks/use-mark";
import useMessage from "@/data/hooks/use-message";
import useProduct from "@/data/hooks/use-product";
import { FormatMoney, FormatStringMoney, Mark } from "core";
import { useEffect, useState } from "react";
import MyInput from "../shared/My-Input";
import Steps from "../shared/Steps";

export default function FormProduct() {
  const { msgSucess } = useMessage();
  // PADRÃO
  const { product, saveProduct, updateProduct, descriptionInUse } =
    useProduct();
  const labels = ["Descrição", "Valor Inicial", "Código de Barras", "Marca"];
  // VERIFICADO
  const [showList, setShowList] = useState(false);
  const { mark, updateMark, marksLocal } = useMark(); // Pega as marcas do contexto
  const [query, setQuery] = useState(""); // Texto digitado no input

  const [filteredMarks, setFilteredMarks] = useState<Partial<Mark>[]>([]);

  const handleSelectMark = (markId: string, description: string) => {
    updateProduct({ ...product, markId }); // Atualiza a marca no produto com o id da marca
    setQuery(description); // Define o texto no input
    setShowList(false); // Fecha a lista de sugestões após a seleção
    msgSucess("item selelcionado");
  };

  useEffect(() => {
    if (query.length > 0) {
      const filtered = marksLocal.filter(
        (mark) => mark.description?.toUpperCase().includes(query.toUpperCase()) // Filtra as marcas conforme o texto
      );
      setFilteredMarks(filtered);
      setShowList(!!filtered);
    } else {
      setFilteredMarks([]);
      setShowList(false); // Esconde a lista quando não há texto no input
    }
  }, [query, marksLocal]); // Atualiza sempre que a query ou fetchMarks muda

  const authNextStep: boolean[] = [
    !!product.description && !descriptionInUse,
    !!product.lastPrice,
    !!product.codeBar,
    !!product.markId,
  ];

  return (
    <Steps
      labels={labels}
      labelAction="Salvar"
      actionExec={saveProduct}
      authNextStep={authNextStep}
    >
      <div className="flex flex-col gap-5">
        <MyInput
          label="Descrição"
          description="Informe o produto"
          value={product.description ?? ""}
          onChange={(event) =>
            updateProduct({ ...product, description: event.target.value })
          }
          error={descriptionInUse ? "Produto informado já está em uso." : ""}
        />
      </div>
      <div className="flex flex-col gap-5">
        <MyInput
          label="Valor"
          description="Informe o valor do produto"
          value={
            product.lastPrice! > 0
              ? `R$ ${FormatMoney(product.lastPrice!)}`
              : "R$ 0,00"
          }
          onChange={(event) => {
            const formatString = FormatStringMoney(event.target.value);
            updateProduct({ ...product, lastPrice: formatString });
          }}
        />
      </div>
      <div className="flex flex-col gap-5">
        <MyInput
          label="Código de Barras"
          description="Informe o código de barras do produto"
          value={product.codeBar!}
          onChange={(event) => {
            updateProduct({ ...product, codeBar: event.target.value });
          }}
        />
      </div>
      <div className="flex flex-col gap-5 z-20 w-full">
        <MyInput
          label="Descrição"
          description="Informe a marca do Produto"
          value={query} // Mostra a marca no input enquanto o usuário digita
          onChange={(event) => setQuery(event.target.value)} // Atualiza o texto digitado
          error={descriptionInUse ? "Marca já está em uso." : ""}
        />
        {/* TODO: AARRUMAR BUG QUE MOSTRA A LISTA DEPOIS DE CLICAR EM SALVAR */}
        {/* Lista de Marcas filtradas */}
        {!product.markId && showList ? (
          <div className="relative top-full left-0 w-full bg-white border rounded-xl border-gray-300 shadow-lg max-h-52 overflow-auto">
            {filteredMarks.map((mark) => (
              <div
                key={mark.id}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() =>
                  handleSelectMark(mark.id || "", mark.description || "")
                }
              >
                {mark.description}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Steps>
  );
}
