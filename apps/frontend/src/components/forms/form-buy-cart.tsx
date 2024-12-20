import ClearIcon from "@mui/icons-material/Clear";
import { FormatMoney } from "core/dist";
import InputMoney from "../shared/input/Input-Money";

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
            className="flex items-center gap-4 p-2 pt-1 border rounded-md bg-zinc-200 mb-1 mr-2"
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
                    <ClearIcon />
                  </button>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="text-gray-500 text-xs">{product.mark}</div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center space-x-2">
                  <label className="text-sm">Quantidade:</label>
                  <input
                    type="number"
                    placeholder="quantidade"
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
                <div className="flex items-center -mt-5 max-w-96">
                  <InputMoney
                    value={product.unitPrice}
                    onChange={(e) =>
                      props.handleUpdateProduct(
                        product.productId,
                        "unitPrice",
                        +e
                      )
                    }
                  />
                </div>
              </div>

              <div className="text-sm text-gray-500 justify-between items-center mt-3">
                Total: R$ {FormatMoney(product.totalPrice) ?? 0}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
