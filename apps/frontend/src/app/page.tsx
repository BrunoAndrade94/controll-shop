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
        <Link className="botao vermelho" href={"/buys"}>
          {"TESTEs EM ANDAMENTO"}
        </Link>
      </div>
      <div className="space-y-2">
        <Link className="botao verde" href={"/buys"}>
          {"COMPRA"}
        </Link>
        <Link className="botao verde" href={"/products"}>
          {"PRODUTO"}
        </Link>
        <Link className="botao verde" href={"/marks"}>
          {"MARCA (VALIDADO)"}
        </Link>
        <Link className="botao verde" href={"/locals"}>
          {"LOCAL (VALIDADO)"}
        </Link>
      </div>
    </div>
  );
}
