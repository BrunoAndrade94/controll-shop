"use client";

import useProduct from "@/data/hooks/use-product";
import React from "react";
import MyInput from "../My-Input";

const InputProductSearch: React.FC = ({}) => {
  const {
    descriptionInUse,
    setDescriptionInUse,
    queryProducts,
    setQueryProducts,
    productsData,
    setProduct,
    setFilteredProducts,
    product,
    filteredProducts,
    setProductsData,
    setShowListProducts,
  } = useProduct();
  const observation = `${
    descriptionInUse
      ? "Produto já cadastrado. Informe outra."
      : queryProducts
        ? "Produto liberado para uso."
        : "Informe para verificar."
  }`;

  const onDisabled = () => {
    return productsData.length === 0;
  };

  const handleOnChangeProduct = (productUser: string) => {
    setQueryProducts(productUser); // Atualiza o estado com o texto digitado pelo usuário
    setProduct({
      ...product,
      description: productUser.toUpperCase(),
    });

    // Busca produtos que contenham a string digitada
    const filteredProducts1 = productsData.filter((productData) =>
      productData.description?.toUpperCase().includes(productUser.toUpperCase())
    );

    if (filteredProducts1.length > 0) {
      // Caso existam produtos semelhantes
      setDescriptionInUse(
        filteredProducts.some(
          (productData) =>
            productData.description?.toUpperCase() === productUser.toUpperCase()
        )
      );

      // Atualiza o estado com os produtos filtrados (opcional)
      setFilteredProducts(filteredProducts1);
    } else {
      // Caso nenhum produto corresponda
      setDescriptionInUse(false);
      setProduct({ ...product, description: productUser });
      setFilteredProducts([]); // Limpa sugestões
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-screen">
      <MyInput
        onBlur={() => {
          setShowListProducts(false);
          setFilteredProducts([]);
        }}
        onFocus={() => {
          setShowListProducts(true);
          setFilteredProducts(productsData);
        }}
        // descriptionFixed={"Descrição"}
        disabled={onDisabled()}
        label={`${productsData.length === 0 ? "Buscando produtos..." : "Produto"}`}
        value={product.description?.toUpperCase() || ""}
        observation={observation}
        onChange={(event) => handleOnChangeProduct(event.target.value)}
        error={descriptionInUse ? "Produto informado já está em uso." : ""}
      />
      {filteredProducts.length > 0 && (
        <div
          onMouseDown={(e) => e.preventDefault()}
          className="relative top-full left-0 w-full bg-white border rounded-xl border-gray-300 shadow-lg max-h-52 overflow-auto"
        >
          {filteredProducts.map((product) => (
            <div key={product.id} className="p-2">
              {product.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputProductSearch;
