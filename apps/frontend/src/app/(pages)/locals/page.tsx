import Link from "next/link";

export default function PageLocal() {
  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        <div className="space-y-2">
          <Link className="botao laranja" href={"/locals/new"}>
            {"NOVO LOCAL"}
          </Link>
          <Link className="botao laranja" href={"/locals/list"}>
            {"VER LOCAIS"}
          </Link>
        </div>
        <Link className="botao azul mt-5" href={"/"}>
          {"voltar"}
        </Link>
      </div>
    </div>
  );
}
