"use client";

// TODO: REFATORAR O CÓDIGO COMPLETO

import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

import useBuy from "@/data/hooks/use-buy";
import useLocal from "@/data/hooks/use-local";
import useMessage from "@/data/hooks/use-message";
import useProduct from "@/data/hooks/use-product";
import { CalcTotalValueBuy, FormatMoney } from "core";
import { useState } from "react";
import Steps from "../shared/Steps";
import FormBuyCart from "./form-buy-cart";

// import BarcodeReader from "react-barcode-reader";
import useSteps from "@/data/hooks/use-steps";
import MyInpuySelectable from "../shared/My-Input-Selectable";
import SelectorProduct from "../shared/selector/Selector-Product";

// Tipo para a lista de produtos no contexto de compra
type BuyProductItem = {
  productId: string;
  description: string;
  mark: string;
  unitPrice: number;
  amount: number;
  totalPrice: number;
};

export default function FormBuy() {
  ///
  /// CONST INICIO
  const {
    productsData,
    setProductsData,
    setQueryProducts,
    filteredProducts,
    setFilteredProducts,
  } = useProduct();
  const { stepCurrent } = useSteps();
  const labelAction = "Finalizar Compra";
  const {
    buy,
    saveBuy,
    updateBuy,
    showList,
    showCart,
    setShowList,
    setShowCart,
    // buyProductsList,
    // setBuyProductsList,
  } = useBuy();
  const { msgSucess, msgError } = useMessage();
  const [totalValueBuy, setTotalValueBuy] = useState(0);
  const labels = ["Local de Compra", "Adicionar Produtos"];
  const { localsData, queryLocals, setQueryLocals } = useLocal();
  const [buyProductsList, setBuyProductsList] = useState<BuyProductItem[]>([]);
  const authNextStep: boolean[] = [
    !!buy.localId,
    (buyProductsList?.length ?? 0) > 0,
  ];
  /// CONST FINAL
  ///

  ///
  /// FUNCAO INICIO
  const updateListProduct = (description: string) => {
    return productsData.filter(
      (productData) =>
        productData.description?.toUpperCase() !== description.toUpperCase()
    );
  };

  const handleAddProduct = (product: any) => {
    setProductsData(updateListProduct(product.description));
    setFilteredProducts(updateListProduct(product.description));

    setBuyProductsList((prev) => {
      const updatedList = [
        ...prev,
        {
          productId: product.id,
          description: product.description,
          mark: product.mark.description,
          unitPrice: product.lastPrice,
          amount: 1,
          totalPrice: product.lastPrice,
        },
      ];

      // Recalcular o valor total
      setTotalValueBuy(CalcTotalValueBuy(updatedList));

      return updatedList;
    });

    msgSucess(
      `${product.description} INCLUÍDO. VALOR DE R$ ${product.lastPrice}`
    );

    setQueryProducts("");
    // setShowList(true);
  };

  const handleSelectLocal = (id: string, description: string) => {
    updateBuy({ ...buy, localId: id }); // Atualiza a marca no produto com o id da marca
    setQueryLocals(description); // Define o texto no input
    setShowList(false); // Fecha a lista de sugestões após a seleção
    msgSucess(`Comprando em ${description}.`);
  };

  const handleUpdateProduct = (
    productId: string,
    field: string,
    value: number
  ) => {
    setBuyProductsList((prev) => {
      const updatedList = prev.map((product) =>
        product.productId === productId
          ? {
              ...product,
              [field]: value,
              totalPrice:
                field === "amount" || field === "unitPrice"
                  ? (field === "amount" ? value : (product.amount ?? 0)) *
                    (field === "unitPrice" ? value : (product.unitPrice ?? 0))
                  : product.totalPrice,
            }
          : product
      );

      // Recalcular o valor total após a atualização
      setTotalValueBuy(CalcTotalValueBuy(updatedList));

      return updatedList;
    });
  };

  const handleRemoveProduct = (productId: string) => {
    setBuyProductsList((prev) => {
      const updatedList = prev.filter(
        (product) => product.productId !== productId
      );

      // Recalcular o valor total após a remoção
      setTotalValueBuy(CalcTotalValueBuy(updatedList));
      return updatedList;
    });
  };

  const handleSaveBuy = () => {
    const buyData = {
      ...buy,
      products: buyProductsList.map((product) => ({
        productId: product.productId,
        amount: product.amount,
        unitPrice: product.unitPrice,
      })),
    };
    saveBuy(buyData);
    msgSucess("Compra realizada com sucesso.");
  };

  // const handleSearchProduct = (description: string) => {
  //   // Busca produtos que contenham a string digitada
  //   const filteredProducts = productsData.filter((productData) =>
  //     productData.description?.toUpperCase().includes(description.toUpperCase())
  //   );

  //   setFilteredProducts(filteredProducts);
  // };

  // const handleOnChangeProduct = (value: string) => {
  //   setQueryProducts(value);

  //   if (value.length === 0) {
  //     setShowList(true);
  //     setQueryProducts("");
  //     updateBuy({ ...buy, products: [] });
  //     setFilteredProducts(productsData);
  //     return;
  //   }

  //   handleSearchProduct(queryProducts);
  // };

  const handleOnChangeLocal = (value: string) => {
    setQueryLocals(value);

    if (value.length === 0) {
      setShowList(true);
      setQueryLocals("");
      updateBuy({});
      return;
    }
  };
  /// FUNCAO FINAL
  ///

  ///
  /// RETURN
  return (
    <div>
      <Steps
        labels={labels}
        labelAction={labelAction}
        actionExec={handleSaveBuy}
        authNextStep={authNextStep}
      >
        <div className="flex flex-col gap-5">
          <MyInpuySelectable
            items={localsData}
            value={queryLocals ?? ""}
            label="Selecione um local"
            disabled={localsData.length === 0}
            onChange={(value) => handleOnChangeLocal(value)}
            onSelect={(id, description) => {
              handleSelectLocal(id, description);
            }}
          />
        </div>
        <div className="relative flex flex-col">
          <SelectorProduct />
          {!showCart && showList && (
            <div
              onMouseDown={(e) => e.preventDefault()}
              className="absolute w-full top-full mt-3 bg-white border rounded-md shadow-lg max-h-48 overflow-auto z-50"
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleAddProduct(product)}
                >
                  {product.description ?? ""}
                  <span className="text-sm text-zinc-400">
                    {" - "}
                    {product.mark?.description ?? ""}
                  </span>
                </div>
              ))}
            </div>
          )}
          {showCart && (
            <div className="w-full -mb-8">
              <FormBuyCart
                listCurrent={buyProductsList}
                handleRemoveProduct={handleRemoveProduct}
                handleUpdateProduct={handleUpdateProduct}
              />
            </div>
          )}
        </div>
      </Steps>
      {stepCurrent > 0 && buyProductsList.length > 0 && (
        <button
          type="button"
          className="w-full botao amarelo mt-2"
          onClick={() => {
            if (showCart) {
              setShowCart(false);
            } else {
              setShowCart(true);
            }
          }}
        >
          <LocalGroceryStoreIcon />
          Carrinho ({buyProductsList.length}){" - "} R${" "}
          {totalValueBuy === 0 ? "0,00" : FormatMoney(totalValueBuy)}
        </button>
      )}
    </div>
  );
}
