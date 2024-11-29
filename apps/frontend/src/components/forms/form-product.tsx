import useProducts from "@/data/contexts/use-product";
import { FormatMoney, FormatStringMoney } from "core";
import { useEffect } from "react";
import MyInput from "../shared/My-Input";
import Steps from "../shared/Steps";

export default function FormProduct() {
  const { product, saveProduct, updateProduct, descriptionInUse } =
    useProducts();
  const labels = ["Descrição", "Valor Inicial", "Código de Barras"];

  const authNextStep: boolean[] = [
    !!product.description && !descriptionInUse,
    !!product.lastPrice,
    !!product.codeBar,
  ];

  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <div>
      <Steps
        labels={labels}
        labelAction="Salvar"
        actionExec={saveProduct}
        authNextStep={authNextStep}
      >
        <div className="flex flex-col gap-5">
          <MyInput
            label="Descrição"
            description="Informe a descrição do produto"
            value={product.description ?? ""}
            onChange={(event) =>
              updateProduct({ ...product, description: event.target.value })
            }
            error={
              descriptionInUse ? "A descrição informada já está em uso." : ""
            }
          />
        </div>
        <div className="flex flex-col gap-5">
          <MyInput
            label="Valor"
            description="Informe o valor do produto"
            value={
              product.lastPrice! > 0
                ? `R$ ${FormatMoney(product.lastPrice!)}`
                : "R$ 0,00"
            }
            onChange={(event) => {
              const formatString = FormatStringMoney(event.target.value);
              updateProduct({ ...product, lastPrice: formatString / 100 });
            }}
          />
        </div>
        <div className="flex flex-col gap-5">
          <MyInput
            label="Código de Barras"
            description="Informe o código de barras do produto"
            value={product.codeBar!}
            onChange={(event) => {
              updateProduct({ ...product, codeBar: event.target.value });
            }}
          />
        </div>
        <div className="flex flex-col gap-5">
          <MyInput
            label="Marca"
            description="Informe a Marca do produto"
            value={product.markId!}
            onChange={(event) => {
              updateProduct({ ...product, markId: event.target.value });
            }}
          />
        </div>
      </Steps>
    </div>
  );
}
