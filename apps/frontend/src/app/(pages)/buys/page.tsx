"use client";

import ButtonVoltar from "@/components/shared/Button-Voltar";
import Window from "@/components/shared/Window";
import useBuy from "@/data/hooks/use-buy";
import Link from "next/link";

export default function PageBuys() {
  const { resetBuy } = useBuy();

  return (
    <Window title="Comprar" button={false}>
      <div className="flex flex-col items-center gap-4">
        <div className="space-y-2">
          <Link className="botao laranja" href={"/buys/new"} onClick={resetBuy}>
            {"NOVA COMPRA"}
          </Link>
          <Link className="botao laranja" href={"/buys/list"}>
            {"VER COMPRAS"}
          </Link>
        </div>
        <div className="flex-1">
          <ButtonVoltar />
        </div>
      </div>
    </Window>
  );
}
