"use client";

import FormProduct from "@/components/forms/form-product";
import Window from "@/components/shared/Window";
import useProducts from "@/data/contexts/use-products";

export default function PageNewProduct() {
  const { product } = useProducts();

  return (
    <div>
      <Window title="Produtos" label="Novo Produto">
        <FormProduct />
      </Window>
    </div>
  );
}
