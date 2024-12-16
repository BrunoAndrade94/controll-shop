"use client";

import useMark from "@/data/hooks/use-mark";
import useMessage from "@/data/hooks/use-message";
import useProduct from "@/data/hooks/use-product";
import { Mark, Product } from "core";
import { useState } from "react";
import MyInput from "../shared/My-Input";
import InputComLista from "../shared/My-Input-Selectable";
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
    descriptionInUse,
    setDescriptionInUse,
    productsData,
    queryProducts,
    setQueryProducts,
    resetProduct,
  } = useProduct();
  const labels = ["Descrição", "Valor Inicial", "Código de Barras", "Marca"];
  // VERIFICADO
  const [showList, setShowList] = useState(false);
  const { mark, updateMark, marksData, queryMarks, setQueryMarks } = useMark(); // Pega as marcas do contexto
  // const [query, setQuery] = useState(""); // Texto digitado no input

  const [filteredMarks, setFilteredMarks] = useState<Partial<Mark>[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Partial<Product>[]>(
    []
  );

  const handleSelectMark = (markId: string, description: string) => {
    setProduct({ ...product, markId }); // Atualiza a marca no produto com o id da marca
    setQueryMarks(description); // Define o texto no input
    setShowList(false); // Fecha a lista de sugestões após a seleção
    msgSucess(`${description} selecionado`);
  };

  // const handleOnChangeProduct = (productUser: string) => {
  //   setQueryProducts(productUser);
  //   const productExist = productsData.some(
  //     (productData) =>
  //       productData.description?.toUpperCase() === queryProducts.toUpperCase()
  //   );

  //   if (queryProducts.length > 0 && productExist) {
  //     setDescriptionInUse(true); // Define como existente
  //     updateProduct({ ...product, description: "" }); // Limpa a marca atual
  //   } else if (queryProducts.length > 0 && !productExist) {
  //     setDescriptionInUse(false); // Marca liberada para uso
  //     updateProduct({ ...product, description: queryProducts }); // Atualiza com o valor digitado
  //   }
  // };

  // const handleOnChangeProduct = (productUser: string) => {
  //   setQueryProducts(productUser); // Atualiza o estado com o texto digitado pelo usuário

  //   // Busca produtos que contenham a string digitada
  //   const filteredProducts = productsData.filter((productData) =>
  //     productData.description?.toUpperCase().includes(productUser.toUpperCase())
  //   );

  //   if (filteredProducts.length > 0) {
  //     // Caso existam produtos semelhantes
  //     setDescriptionInUse(
  //       filteredProducts.some(
  //         (productData) =>
  //           productData.description?.toUpperCase() === productUser.toUpperCase()
  //       )
  //     );

  //     // Atualiza o estado com os produtos filtrados (opcional)
  //     setFilteredProducts(filteredProducts);
  //   } else {
  //     // Caso nenhum produto corresponda
  //     setDescriptionInUse(false);
  //     setProduct({ ...product, description: productUser });
  //     setFilteredProducts([]); // Limpa sugestões
  //   }
  // };

  const handleOnChangeMark = (markUser: string) => {
    setQueryMarks(markUser); // Atualiza o estado com o texto digitado pelo usuário

    if (markUser.length === 0) {
      // Se o campo está vazio
      setShowList(true);
      setDescriptionInUse(false); // Marca não está em uso
      // updateMark({ ...mark, description: "" }); // Limpa a marca selecionada
      product.markId = "";
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

      // Atualiza o estado com os produtos filtrados (opcional)
      setFilteredMarks(filteredMarks);
    } else {
      // Caso nenhum produto corresponda
      setDescriptionInUse(false);
      updateMark({ ...mark, description: markUser });
      setFilteredMarks([]); // Limpa sugestões
    }
  };

  const onChangeMark = (markUser: string) => {
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
        <InputComLista
          label="Selecione uma marca"
          value={queryMarks ?? ""}
          disabled={marksData.length === 0}
          items={marksData}
          onChange={(value) => handleOnChangeMark(value)}
          onSelect={(id, description) => {
            handleSelectMark(id || "", description || "");
          }}
        />
      </div>
    </Steps>
  );
}
