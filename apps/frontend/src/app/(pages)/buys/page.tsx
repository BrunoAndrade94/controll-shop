import Link from "next/link";

export default function PageBuys() {
  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        <div className="space-y-2">
          <Link className="botao laranja" href={"/buys/new"}>
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
