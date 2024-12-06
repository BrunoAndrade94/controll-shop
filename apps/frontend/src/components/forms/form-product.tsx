"use client";

import useMark from "@/data/hooks/use-mark";
import useMessage from "@/data/hooks/use-message";
import useProduct from "@/data/hooks/use-product";
import { FormatMoney, FormatStringMoney, Mark } from "core";
import { useState } from "react";
import MyInput from "../shared/My-Input";
import Steps from "../shared/Steps";

export default function FormProduct() {
  const { msgSucess } = useMessage();
  // PADRÃO
  const {
    product,
    saveProduct,
    updateProduct,
    descriptionInUse,
    setDescriptionInUse,
    productsData,
    queryProducts,
    setQueryProducts,
  } = useProduct();
  const labels = ["Descrição", "Valor Inicial", "Código de Barras", "Marca"];
  // VERIFICADO
  const [showList, setShowList] = useState(false);
  const { mark, updateMark, marksData, queryMarks, setQueryMarks } = useMark(); // Pega as marcas do contexto
  // const [query, setQuery] = useState(""); // Texto digitado no input

  const [filteredMarks, setFilteredMarks] = useState<Partial<Mark>[]>([]);

  const handleSelectMark = (markId: string, description: string) => {
    updateProduct({ ...product, markId }); // Atualiza a marca no produto com o id da marca
    setQueryMarks(description); // Define o texto no input
    setShowList(false); // Fecha a lista de sugestões após a seleção
    msgSucess(`${description} selecionado`);
  };

  const handleOnChange = (productUser: string) => {
    setQueryProducts(productUser);
    const productExist = productsData.some(
      (productData) =>
        productData.description?.toUpperCase() === queryProducts.toUpperCase()
    );

    if (queryProducts.length > 0 && productExist) {
      setDescriptionInUse(true); // Define como existente
      updateProduct({ ...product, description: "" }); // Limpa a marca atual
    } else if (queryProducts.length > 0 && !productExist) {
      setDescriptionInUse(false); // Marca liberada para uso
      updateProduct({ ...product, description: queryProducts }); // Atualiza com o valor digitado
    }
  };

  const onChange = (markUser: string) => {
    setQueryMarks(markUser);

    const filtered = marksData.filter(
      (mark) =>
        mark.description?.toUpperCase().includes(queryMarks.toUpperCase()) // Filtra as marcas conforme o texto
    );
    if (filtered) {
      setFilteredMarks(filtered);
      setShowList(!!filtered);
    }
    if (!queryMarks) {
      setFilteredMarks([]);
      setShowList(false);
    } // Esconde a lista quando não há texto no input
  };

  // useEffect(() => {
  //   if (!queryMarks) {
  //     const filtered = marksData.filter(
  //       (mark) =>
  //         mark.description?.toUpperCase().includes(queryMarks.toUpperCase()) // Filtra as marcas conforme o texto
  //     );
  //     if (filtered) {
  //       setFilteredMarks(filtered);
  //       setShowList(!!filtered);
  //     }
  //   }
  //   if (queryMarks) {
  //     setFilteredMarks([]);
  //     setShowList(false);
  //   } // Esconde a lista quando não há texto no input
  // }, [queryMarks, marksData]); // Atualiza sempre que a query ou fetchMarks muda

  const authNextStep: boolean[] = [
    // !!product.description && !descriptionInUse,
    !!queryProducts && !descriptionInUse,
    !!product.lastPrice,
    !!product.codeBar,
    !!product.markId,
  ];

  const observation = `${
    descriptionInUse
      ? "Produto já cadastrado. Informe outra."
      : queryProducts
        ? "Produto liberado para uso."
        : "Informe para verificar."
  }`;

  return (
    <Steps
      labels={labels}
      labelAction="Salvar Produto"
      actionExec={saveProduct}
      authNextStep={authNextStep}
    >
      <div className="flex flex-col gap-5">
        <MyInput
          label="Informe o novo Produto"
          value={queryProducts ?? ""}
          observation={observation}
          // TODO: TROCAR DE BANCO DE DADOS (CONSULTA DIRETAA)
          // PARA CONSULTA COM A LISTA LOCAL
          onChange={(event) => handleOnChange(event.target.value)}
          error={descriptionInUse ? "Produto informado já está em uso." : ""}
        />
      </div>
      <div className="flex flex-col gap-5">
        <MyInput
          label="Valor"
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
          value={product.codeBar ?? ""}
          onChange={(event) => {
            updateProduct({ ...product, codeBar: event.target.value });
          }}
        />
      </div>
      <div className="flex flex-col gap-5">
        <MyInput
          value={queryMarks ?? ""}
          onBlur={() => {
            setShowList(false);
            setFilteredMarks([]);
          }}
          onFocus={() => {
            setShowList(true);
            setFilteredMarks(marksData);
          }}
          label="Marca"
          onChange={(event) => onChange(event.target.value)}
        />
        {/* TODO: AARRUMAR BUG QUE MOSTRA A LISTA DEPOIS DE CLICAR EM SALVAR */}
        {/* Lista de Marcas filtradas */}
        {!product.markId && showList && (
          <div
            onMouseDown={(e) => e.preventDefault()}
            className="relative top-full left-0 w-full bg-white border rounded-xl border-gray-300 shadow-lg max-h-52 overflow-auto"
          >
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
        )}
      </div>
    </Steps>
  );
}
