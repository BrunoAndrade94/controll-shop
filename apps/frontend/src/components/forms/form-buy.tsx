"use client";

// TODO: REFATORAR O CÓDIGO COMPLETO

import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

import useBuy from "@/data/hooks/use-buy";
import useLocal from "@/data/hooks/use-local";
import useMessage from "@/data/hooks/use-message";
import useProduct from "@/data/hooks/use-product";
import { FormatMoney, Local } from "core";
import { useState } from "react";
import MyInput from "../shared/My-Input";
import Steps from "../shared/Steps";
import FormBuyCart from "./form-buy-cart";

// import BarcodeReader from "react-barcode-reader";
import InputComLista from "../shared/My-Input-Selectable";
import BarcodeScanner from "../shared/input/barcode-scanner";

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
  /// INICIO TESTE DE CAMERA
  const [isScannerOpen, setScannerOpen] = useState(false);

  const handleScan = (barcode: string) => {
    alert(`Código de Barras Escaneado: ${barcode}`);
    setScannerOpen(false); // Fecha o scanner após ler o código
  };

  // const handleOnChangeProduct = (value: any) => {
  //   setQueryProducts(value);
  //   const filteredProducts = productsData.filter((product) =>
  //     product.description?.toUpperCase().includes(value.toUpperCase())
  //   );
  //   setFilteredProducts(filteredProducts);
  // };

  /// FIM TESTE DE CAMERA
  const { buy, saveBuy, updateBuy } = useBuy();
  const { msgSucess, msgError } = useMessage();

  const [totalValueBuy, setTotalValueBuy] = useState(0);

  const {
    productsData,
    setProductsData,
    queryProducts,
    setQueryProducts,
    filteredProducts,
    setFilteredProducts,
  } = useProduct();

  // const [filteredProducts, setFilteredProducts] = useState<Partial<Product>[]>(
  //   []
  // );

  const [queryLocals, setQueryLocals] = useState("");

  const { localsData, setDescriptionInUse } = useLocal();
  const [filteredLocals, setFilteredLocals] = useState<Partial<Local>[]>([]);

  const [showList, setShowList] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const [productsList, setProductsList] = useState<BuyProductItem[]>([]);

  const labels = ["Local de Compra", "Adicionar Produtos"];

  const authNextStep: boolean[] = [!!buy.localId, productsList.length > 0];

  function calculateTotalValue(
    productsList: { amount: number; unitPrice: number }[]
  ): number {
    return productsList.reduce(
      (acc, product) => +(acc + product.amount * product.unitPrice).toFixed(2),
      0
    );
  }

  const atualizarListaProduto = (description: string) => {
    return productsData.filter(
      (productData) =>
        productData.description?.toUpperCase() !== description.toUpperCase()
    );
  };

  const handleAddProduct = (product: any) => {
    setProductsData(atualizarListaProduto(product.description));
    setFilteredProducts(atualizarListaProduto(product.description));

    setProductsList((prev) => {
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
      setTotalValueBuy(calculateTotalValue(updatedList));

      return updatedList;
    });

    msgSucess(
      `${product.description} INCLUÍDO. ***VALOR DE R$ ${product.lastPrice}`
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
    setProductsList((prev) => {
      const updatedList = prev.map((product) =>
        product.productId === productId
          ? {
              ...product,
              [field]: value,
              totalPrice:
                field === "amount" || field === "unitPrice"
                  ? (field === "amount" ? value : product.amount) *
                    (field === "unitPrice" ? value : product.unitPrice)
                  : product.totalPrice,
            }
          : product
      );

      // Recalcular o valor total após a atualização
      setTotalValueBuy(calculateTotalValue(updatedList));

      return updatedList;
    });
  };

  const handleRemoveProduct = (productId: string) => {
    setProductsList((prev) => {
      const updatedList = prev.filter(
        (product) => product.productId !== productId
      );

      // Recalcular o valor total após a remoção
      setTotalValueBuy(calculateTotalValue(updatedList));
      return updatedList;
    });
  };

  const handleSaveBuy = () => {
    const buyData = {
      ...buy,
      products: productsList.map((product) => ({
        productId: product.productId,
        amount: product.amount,
        unitPrice: product.unitPrice,
      })),
    };
    saveBuy(buyData);
    msgSucess("Compra realizada com sucesso.");
  };

  const handleSearchProduct = (description: string) => {
    // Busca produtos que contenham a string digitada
    const filteredProducts = productsData.filter((productData) =>
      productData.description?.toUpperCase().includes(description.toUpperCase())
    );

    setFilteredProducts(filteredProducts);
  };

  const handleSelectProduct = (id: string) => {
    // remover produto da lista
    const updatedProductsData = productsData.filter(
      (product) => product.id !== id
    );

    setProductsData(updatedProductsData);

    // Atualizar filteredProducts para refletir a lista atualizada
    const updatedFilteredProducts = filteredProducts.filter(
      (product) => product.id !== id
    );
    setFilteredProducts(updatedFilteredProducts);
  };

  const handleOnChangeProduct = (value: string) => {
    setQueryProducts(value);

    if (value.length === 0) {
      setShowList(true);
      setQueryProducts("");
      updateBuy({ ...buy, products: [] });
      setFilteredProducts(productsData);
      return;
    }

    handleSearchProduct(queryProducts);
  };

  const handleOnChangeLocal = (value: string) => {
    setQueryLocals(value);

    if (value.length === 0) {
      setShowList(true);
      setQueryLocals("");
      updateBuy({});
      return;
    }
    // Busca produtos que contenham a string digitada
    const filteredLocals = localsData.filter((localData) =>
      localData.description?.toUpperCase().includes(value.toUpperCase())
    );

    setFilteredLocals(filteredLocals);
  };

  // useEffect(() => {
  //   cleanAll();
  // }, [cleanAll]);

  // useEffect(() => {
  //   // if (queryLocals) {
  //   const filtered = localsData.filter((local) =>
  //     local.description?.toUpperCase().includes(queryLocals.toUpperCase())
  //   );
  //   setFilteredLocals(filtered);
  //   setShowList(!!filtered);
  //   return;
  //   // } else {
  //   //   setFilteredLocals([]);
  //   //   setShowList(false);
  //   //   setQueryLocals("");
  //   //   updateBuy({});
  //   // }
  // }, [localsData, queryLocals, setQueryLocals, updateBuy]);

  // useEffect(() => {
  //   if (queryProducts) {
  //     const filtered = productsData.filter((product) =>
  //       product.description?.toUpperCase().includes(queryProducts.toUpperCase())
  //     );
  //     setFilteredProducts(filtered);
  //     setShowList(!!filtered);
  //     return;
  //   } else {
  //     setFilteredProducts([]);
  //     setShowList(false);
  //     setQueryProducts("");
  //     updateBuy({});
  //   }
  // }, [queryProducts, productsData, setQueryProducts, updateBuy]);

  // TODO: REFATORAR O COMPONENTE INPUT DE LISTA
  return (
    <div>
      <Steps
        labels={labels}
        labelAction="Finalizar Compra"
        actionExec={handleSaveBuy}
        authNextStep={authNextStep}
      >
        <div className="flex flex-col gap-5">
          <InputComLista
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

        {/* <div className="flex flex-col gap-5">
          <InputComLista
            label="Selecione um produto"
            value={queryProducts ?? ""}
            disabled={productsData.length === 0}
            items={productsData}
            onChange={(value) => handleOnChangeProduct(value)}
            onSelect={(id) => {
              handleAddProduct(product);
            }}
          />
        </div> */}

        <div className="relative flex flex-col">
          <div className="flex flex-row text-center items-center -mt-5">
            <div className="flex-1 items-center">
              <MyInput
                label={`${productsData.length === 0 ? "Procurando produtos.." : "Selecione um produto"}`}
                value={queryProducts ?? ""}
                disabled={productsData.length === 0}
                onBlur={() => {
                  setShowList(false);
                  setFilteredProducts([]);
                }}
                onFocus={() => {
                  setShowList(true);
                  setShowCart(false);
                  setFilteredProducts(productsData);
                }}
                onChange={(event) => handleOnChangeProduct(event.target.value)}
                className={`${productsData.length === 0 ? "bg-gray-200 border-dashed border-gray-400 opacity-50 cursor-not-allowed p-2 rounded-md w-full" : ""}`}
              />
            </div>
            <div className="ml-2">
              <button
                type="button"
                className="botao verde"
                // onClick={() => setScannerOpen(true)}
                onClick={() => {
                  msgError("AINDA NÃO SOU FUNCIONAL");
                }}
              >
                QRCODE
              </button>
              {isScannerOpen && (
                <BarcodeScanner
                  onClose={() => setScannerOpen(false)}
                  onScan={handleScan}
                />
              )}
            </div>
          </div>

          {!showCart && showList && (
            <div
              onMouseDown={(e) => e.preventDefault()}
              className="absolute w-full top-full mt-1 bg-white border rounded-md shadow-lg max-h-48 overflow-auto z-50"
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
                listCurrent={productsList}
                handleRemoveProduct={handleRemoveProduct}
                handleUpdateProduct={handleUpdateProduct}
              />
            </div>
          )}
        </div>
      </Steps>
      {!showList && productsList.length > 0 && (
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
          Carrinho ({productsList.length}){" - "} R${" "}
          {totalValueBuy === 0 ? "0,00" : FormatMoney(totalValueBuy)}
        </button>
      )}
    </div>
  );
}
