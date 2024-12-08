import Link from "next/link";

export default function PageProduct() {
  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        <div className="space-y-2">
          <Link className="botao laranja" href={"/products/new"}>
            {"NOVO PRODUTO"}
          </Link>
          <Link className="botao laranja" href={"/products/list"}>
            {"VER PRODUTOS"}
          </Link>
        </div>
        <Link className="botao azul mt-5" href={"/"}>
          {"voltar"}
        </Link>
      </div>
    </div>
  );
}
