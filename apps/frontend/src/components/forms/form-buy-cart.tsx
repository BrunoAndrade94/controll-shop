export interface FormBuyCartProps {
  listCurrent: any[];
  handleRemoveProduct: (productId: string) => void;
  handleUpdateProduct: (
    productId: string,
    field: string,
    value: number
  ) => void;
}

export default function FormBuyCart(props: FormBuyCartProps) {
  return (
    <div>
      <div className="mt-2 max-h-52 overflow-auto rounded-lg">
        {props.listCurrent.map((product) => (
          <div
            key={product.productId}
            className="flex items-center gap-4 p-2 pt-1 border rounded-md bg-zinc-200 mb-2 mr-2"
          >
            <div className="flex-1">
              <div className="flex flex-row justify-between items-center">
                <div className="text-lg text-start">{product.description}</div>
                <div className="text-red-500 font-bold ml-2">
                  <button
                    type="button"
                    title="Excluir"
                    onClick={() => props.handleRemoveProduct(product.productId)}
                  >
                    X
                  </button>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="text-gray-500 text-xs">{product.mark}</div>
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
                      props.handleUpdateProduct(
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
                      props.handleUpdateProduct(
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
    </div>
  );
}