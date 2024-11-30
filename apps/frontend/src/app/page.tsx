import Link from "next/link";
import Logo from "../components/templates/Logo";

export default function Home() {
  return (
    <div className="home image-background">
      <div className="flex flex-col items-center gap-4">
        <Logo />
        {/* <p className="text-zinc-500 font-light w-96 leading-6 text-center select-none">
          {"DESCRICAO_HOME"}
        </p> */}
      </div>
      <div className="space-y-2">
        <Link className="botao laranja" href={"/buy/new"}>
          {"NOVA COMPRA"}
        </Link>
        <Link className="botao laranja" href={"/products/new"}>
          {"NOVO PRODUTO"}
        </Link>
        <Link className="botao laranja" href={"/marks/new"}>
          {"NOVA MARCA"}
        </Link>
        <Link className="botao laranja" href={"/locals/new"}>
          {"NOVO LOCAL"}
        </Link>
      </div>
      <div className="space-y-2">
        <Link className="botao roxo" href={"/products/list"}>
          {"LISTA DE PRODUTOS"}
        </Link>
        <Link className="botao roxo" href={"/buy/list"}>
          {"LISTA DE COMPRAS"}
        </Link>
        <Link className="botao roxo" href={"/marks/list"}>
          {"LISTA DE MARCAS"}
        </Link>
        <Link className="botao roxo" href={"/locals/list"}>
          {"LISTA DE LOCAIS"}
        </Link>
      </div>
    </div>
  );
}
