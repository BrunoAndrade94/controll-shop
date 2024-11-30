"use client";

import FormProduct from "@/components/forms/form-product";
import Window from "@/components/shared/Window";
import useProduct from "@/data/hooks/use-product";

export default function PageNewProduct() {
  const { product } = useProduct();

  const productCurrent = `${product.description?.toUpperCase() || "Novo Produto"}`;
  const productTitle = `${!!product.description ? "Novo Produto" : "Cadastro de Produto"}`;

  return (
    <div>
      <Window title={productTitle} label={productCurrent}>
        <FormProduct />
      </Window>
    </div>
  );
}
