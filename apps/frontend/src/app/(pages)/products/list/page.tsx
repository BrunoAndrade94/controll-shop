"use client";

import MyList from "@/components/lists/my-list";
import useBuy from "@/data/hooks/use-buy";
import useMessage from "@/data/hooks/use-message";
import useProduct from "@/data/hooks/use-product";

export default function PageProductList() {
  const { msgSucess } = useMessage();
  const { deleteProduct } = useProduct();
  const { buy, loadingBuyProducts, productsData } = useBuy();

  const columns = [
    { key: "description", label: "Descrição" },
    // {
    //   key: "lastPrice",
    //   label: "Preço",
    //   formatter: (val: any) => `R$ ${val.toFixed(2)}`,
    // },
    // { key: "mark.description", label: "Marca" },
  ];

  const columnsModal = [
    { key: "id", label: "ID" },
    { key: "description", label: "Descrição" },
    { key: "mark.description", label: "Marca" },
  ];

  return (
    <MyList
      windowTitle="Produtos"
      windowLabel="consultas, modificações e muito mais..."
      columns={columns}
      columnsModal={columnsModal}
      data={productsData}
      dataModal={productsData}
      onClick={deleteProduct}
    />
  );
}
