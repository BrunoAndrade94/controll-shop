"use client";

import ButtonVoltar from "@/components/shared/Button-Voltar";
import Window from "@/components/shared/Window";
import useProduct from "@/data/hooks/use-product";
import Link from "next/link";

export default function PageProduct() {
  const { resetProduct } = useProduct();
  return (
    <Window title="Produtos" button={false}>
      <div className="flex flex-col items-center gap-4">
        <div className="space-y-2">
          <Link
            className="botao roxo"
            href={"/products/new"}
            onClick={resetProduct}
          >
            {"NOVO PRODUTO"}
          </Link>
          <Link className="botao roxo" href={"/products/list"}>
            {"VER PRODUTOS"}
          </Link>
        </div>
        <div className="flex-1">
          <ButtonVoltar />
        </div>
      </div>
    </Window>
  );
}
