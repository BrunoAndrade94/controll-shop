"use client";

import useMark from "@/data/hooks/use-mark";
import useMessage from "@/data/hooks/use-message";
import useProduct from "@/data/hooks/use-product";
import { useState } from "react";
import MyInput from "../shared/My-Input";
import MyInputSelectable from "../shared/My-Input-Selectable";
import Steps from "../shared/Steps";
import InputMoney from "../shared/input/Input-Money";
import ProductSearch from "../shared/input/Input-Search-Product";

export default function FormProduct() {
  const { msgSucess } = useMessage();
  // PADRÃO
  const {
    product,
    setProduct,
    saveProduct,
    queryProducts,
    descriptionInUse,
    setDescriptionInUse,
  } = useProduct();
  const labels = ["Descrição", "Valor Inicial", "Código de Barras", "Marca"];
  // VERIFICADO

  // const [showList, setShowList] = useState(false);

  const { mark, updateMark, marksData } = useMark(); // Pega as marcas do contexto

  const [queryMarks, setQueryMarks] = useState(""); // Texto digitado no input

  // const [filteredMarks, setFilteredMarks] = useState<Partial<Mark>[]>([]);

  const authNextStep: boolean[] = [
    (product.description?.length || 0) > 2 && !descriptionInUse,
    !!product.lastPrice,
    !!product.codeBar,
    !!product.markId,
  ];

  const handleSelectMark = (markId: string, description: string) => {
    setProduct({ ...product, markId: markId }); // Atualiza a marca no produto com o id da marca
    setQueryMarks(description); // Define o texto no input
    // setShowList(false); // Fecha a lista de sugestões após a seleção
    msgSucess(`${description} selecionado`);
  };

  const handleOnChangeMark = (markUser: string) => {
    setQueryMarks(markUser); // Atualiza o estado com o texto digitado pelo usuário

    if (markUser.length === 0) {
      // Se o campo está vazio
      // setShowList(true);
      setDescriptionInUse(false); // Marca não está em uso
      setProduct({ ...product, markId: "" }); // Atualiza a marca no produto com o id da marca
      // updateMark({ ...mark, description: "" }); // Limpa a marca selecionada
      // setFilteredMarks([]); // Limpa as sugestões
      return;
    }
    // Busca produtos que contenham a string digitada
    const filteredMarks = marksData.filter((markData) =>
      markData.description?.toUpperCase().includes(markUser.toUpperCase())
    );

    if (filteredMarks.length > 0) {
      // Caso existam produtos semelhantes
      setDescriptionInUse(
        filteredMarks.some(
          (markData) =>
            markData.description?.toUpperCase() === markUser.toUpperCase()
        )
      );

      // Atualiza o estado com os produtos filtrados
      // setFilteredMarks(filteredMarks);
    } else {
      // Caso nenhum produto corresponda
      setDescriptionInUse(false);
      updateMark({ ...mark, description: markUser });
      // setFilteredMarks([]); // Limpa sugestões
    }
  };

  // const onChangeMark = (markUser: string) => {
  //   setQueryMarks(markUser);

  //   const filtered = marksData.filter(
  //     (mark) =>
  //       mark.description?.toUpperCase().includes(queryMarks.toUpperCase()) // Filtra as marcas conforme o texto
  //   );
  //   if (filtered) {
  //     setFilteredMarks(filtered);
  //     setShowList(!!filtered);
  //   }
  //   if (!queryMarks) {
  //     setFilteredMarks([]);
  //     setShowList(false);
  //   } // Esconde a lista quando não há texto no input
  // };

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

  return (
    <Steps
      labels={labels}
      labelAction="Salvar Produto"
      actionExec={saveProduct}
      authNextStep={authNextStep}
    >
      <ProductSearch />
      {/* <div className="flex flex-col gap-5 w-full max-w-screen">
        <MyInput
          label="Informe o novo Produto"
          value={queryProducts ?? ""}
          observation={observation}
          onChange={(event) => handleOnChangeProduct(event.target.value)}
          error={descriptionInUse ? "Produto informado já está em uso." : ""}
        />
        {filteredMarks.length > 0 && queryProducts && (
          <div
            onMouseDown={(e) => e.preventDefault()}
            className="relative top-full left-0 w-full bg-white border rounded-xl border-gray-300 shadow-lg max-h-52 overflow-auto"
          >
            {filteredMarks.map((product) => (
              <div key={product.id} className="p-2 hover:bg-gray-200">
                {product.description}
              </div>
            ))}
          </div>
        )}
      </div> */}
      <div className="flex flex-col gap-5">
        <InputMoney
          label="Valor"
          value={product.lastPrice ?? 0}
          onChange={(event) => {
            setProduct({ ...product, lastPrice: event });
          }}
        />
      </div>
      <div className="flex flex-col gap-5">
        <MyInput
          label="Código de Barras"
          value={product.codeBar ?? ""}
          onChange={(event) => {
            setProduct({ ...product, codeBar: event.target.value });
          }}
        />
      </div>

      <div className="flex flex-col gap-5">
        <MyInputSelectable
          label="Selecione uma marca"
          value={queryMarks ?? ""}
          disabled={marksData.length === 0}
          items={marksData}
          onChange={(value) => handleOnChangeMark(value)}
          onSelect={(id, description) => {
            handleSelectMark(id ?? "", description ?? "");
          }}
        />
      </div>
    </Steps>
  );
}
