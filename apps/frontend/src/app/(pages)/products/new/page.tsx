"use client";

import FormProduct from "@/components/forms/form-product";
import Window from "@/components/shared/Window";
import useProducts from "@/data/contexts/use-product";

export default function PageNewProduct() {
  const { product } = useProducts();

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
