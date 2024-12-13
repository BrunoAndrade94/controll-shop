"use client";

import FormProduct from "@/components/forms/form-product";
import Window from "@/components/shared/Window";
import useProduct from "@/data/hooks/use-product";

export default function PageNewProduct() {
  const { queryProducts } = useProduct();

  const productCurrent = `${queryProducts?.toUpperCase() || "Novo Produto"}`;
  const productTitle = `${!!queryProducts ? "Novo Produto" : "Cadastro de Produto"}`;

  return (
    <Window title={productTitle} label={productCurrent}>
      <FormProduct />
    </Window>
  );
}
