"use client";

// TODO: REFATORAR O CÓDIGO COMPLETO

import useBuy from "@/data/hooks/use-buy";
import useLocal from "@/data/hooks/use-local";
import useMessage from "@/data/hooks/use-message";
import useProduct from "@/data/hooks/use-product";
import { Local, Product } from "core";
import { useEffect, useState } from "react";
import MyInput from "../shared/My-Input";
import Steps from "../shared/Steps";

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
  const { buy, saveBuy, updateBuy } = useBuy();
  const { msgSucess } = useMessage();

  const { productsData, queryProducts, setQueryProducts } = useProduct();
  const [filteredProducts, setFilteredProducts] = useState<Partial<Product>[]>(
    []
  );

  const { localsData, queryLocals, setQueryLocals } = useLocal();
  const [filteredLocals, setFilteredLocals] = useState<Partial<Local>[]>([]);

  const [showList, setShowList] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const [productsList, setProductsList] = useState<BuyProductItem[]>([]);

  const authNextStep: boolean[] = [!!buy.localId, productsList.length > 0];

  const handleAddProduct = (product: any) => {
    const alreadyExists = productsList.some((p) => p.productId === product.id);
    if (!alreadyExists) {
      setProductsList((prev) => [
        ...prev,
        {
          productId: product.id,
          description: product.description,
          mark: product.mark.description,
          unitPrice: product.lastPrice,
          amount: 1,
          totalPrice: product.lastPrice,
        },
      ]);
      msgSucess(`${product.description} incluido no carrinho.`);
    }
    setQueryProducts("");
    setShowList(false);
  };

  const handleSelectLocal = (localId: string, description: string) => {
    updateBuy({ ...buy, localId }); // Atualiza a marca no produto com o id da marca
    setQueryLocals(description); // Define o texto no input
    setShowList(false); // Fecha a lista de sugestões após a seleção
    msgSucess(`Comprando em ${description}.`);
  };

  const handleUpdateProduct = (
    productId: string,
    field: keyof BuyProductItem,
    value: number
  ) => {
    setProductsList((prev) =>
      prev.map((product) =>
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
      )
    );
  };

  const handleRemoveProduct = (productId: string) => {
    setProductsList((prev) =>
      prev.filter((product) => product.productId !== productId)
    );
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

  useEffect(() => {
    // if (queryLocals) {
    const filtered = localsData.filter((local) =>
      local.description?.toUpperCase().includes(queryLocals.toUpperCase())
    );
    setFilteredLocals(filtered);
    setShowList(!!filtered);
    return;
    // } else {
    //   setFilteredLocals([]);
    //   setShowList(false);
    //   setQueryLocals("");
    //   updateBuy({});
    // }
  }, [localsData, queryLocals, setQueryLocals, updateBuy]);

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
        labels={["Local de Compra", "Adicionar Produtos"]}
        labelAction="Finalizar Compra"
        actionExec={handleSaveBuy}
        authNextStep={authNextStep}
      >
        <div className="relative flex flex-col">
          <MyInput
            label="Selecione um local"
            value={queryLocals ?? ""}
            onBlur={() => {
              setShowList(false);
              setFilteredLocals([]);
            }}
            onFocus={() => {
              setShowList(true);
              setFilteredLocals(localsData);
            }}
            onChange={(event) => {
              setQueryLocals(event.target.value);
            }}
          />
          {!buy.localId && showList && (
            <div
              onMouseDown={(e) => e.preventDefault()}
              className="absolute top-full mt-1 w-full bg-white border rounded-xl border-gray-300 shadow-lg max-h-48 overflow-auto z-50"
            >
              {filteredLocals.map((local) => (
                <div
                  key={local.id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() =>
                    handleSelectLocal(local.id || "", local.description || "")
                  }
                >
                  {local.description}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative flex flex-col">
          <MyInput
            label="Selecione um produto"
            value={queryProducts ?? ""}
            onBlur={() => {
              setShowList(false);
              setFilteredProducts([]);
            }}
            onFocus={() => {
              setShowList(true);
              setShowCart(false);
              setFilteredProducts(productsData);
            }}
            onChange={(event) => setQueryProducts(event.target.value)}
          />
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
              Carrinho ({productsList.length})
            </button>
          )}
          {showCart && (
            <div className="mt-2 max-h-52 overflow-auto rounded-lg">
              {productsList.map((product) => (
                <div
                  key={product.productId}
                  className="flex items-center gap-4 p-2 pt-1 border rounded-md bg-zinc-200 mb-2 mr-2"
                >
                  <div className="flex-1">
                    <div className="flex flex-row justify-between items-center">
                      <div className="text-lg text-start">
                        {product.description}
                      </div>
                      <div className="text-red-500 font-bold ml-2">
                        <button
                          type="button"
                          title="Excluir"
                          onClick={() => handleRemoveProduct(product.productId)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div className="text-gray-500 text-xs">
                        {product.mark}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-center">
                      <div>
                        <label className="text-sm">Quantidade:</label>
                        <input
                          placeholder="quantidade"
                          type="number"
                          min="1"
                          value={product.amount ?? 1}
                          onChange={(e) =>
                            handleUpdateProduct(
                              product.productId,
                              "amount",
                              +e.target.value
                            )
                          }
                          className="w-16 border bg-zinc-300/0 rounded-lg p-1 text-center text-black"
                        />
                      </div>
                      <div>
                        <label className="text-sm">Preço: R$</label>
                        <input
                          className="w-20 border bg-zinc-300/0 rounded-lg p-1 text-center text-black m-1"
                          placeholder="Preço"
                          type="number"
                          min="0"
                          value={product.unitPrice.toFixed(2) ?? 0}
                          onChange={(e) =>
                            handleUpdateProduct(
                              product.productId,
                              "unitPrice",
                              +e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 justify-between items-center">
                      Total: R$ {product.totalPrice.toFixed(2) ?? 0}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Steps>
    </div>
  );
}
