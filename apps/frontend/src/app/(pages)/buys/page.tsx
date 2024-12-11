"use client";

import useBuy from "@/data/hooks/use-buy";
import Link from "next/link";

export default function PageBuys() {
  const { resetBuy } = useBuy();

  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        <div className="space-y-2">
          <Link className="botao laranja" href={"/buys/new"} onClick={resetBuy}>
            {"NOVA COMPRA"}
          </Link>
          <Link className="botao laranja" href={"/buys/list"}>
            {"VER COMPRAS"}
          </Link>
        </div>
        <Link className="botao azul mt-5" href={"/"}>
          {"voltar"}
        </Link>
      </div>
    </div>
  );
}
