"use client";

import MyList from "@/components/lists/my-list";
import { Button } from "@/components/ui/button";
import useMessage from "@/data/hooks/use-message";
import useProduct from "@/data/hooks/use-product";

export default function PageProductList() {
  const { msgSucess } = useMessage();
  const { product, loadingProduct, productsLocal } = useProduct();
  const headers: (keyof { id: string; description: string })[] = [
    "description",
  ];

  const clicou = () => {
    msgSucess("Marca selecionada com sucesso");
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <Button onClick={clicou}>OI</Button>
      </div>
      <div>
        <MyList headers={headers} data={productsLocal as any}></MyList>
      </div>
    </div>
  );
}
