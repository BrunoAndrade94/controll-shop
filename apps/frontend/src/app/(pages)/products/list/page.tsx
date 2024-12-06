"use client";

import MyList from "@/components/lists/my-list";
import useMessage from "@/data/hooks/use-message";
import useProduct from "@/data/hooks/use-product";

export default function PageProductList() {
  const { msgSucess } = useMessage();
  const { product, loadingProduct, productsData } = useProduct();

  // const headers: any = {
  //   description: "Descrição",
  //   lastPrice: "Preço",
  //   mark: {
  //     description: "Marca",
  //   },
  // };

  const columns = [
    { key: "description", label: "Descrição" },
    {
      key: "lastPrice",
      label: "Preço",
      formatter: (val: any) => `R$ ${val.toFixed(2)}`,
    },
    { key: "mark.description", label: "Marca" },
  ];

  const clicou = () => {
    msgSucess("Marca selecionada com sucesso");
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <MyList columns={columns} data={productsData}></MyList>
      </div>
    </div>
  );
}
