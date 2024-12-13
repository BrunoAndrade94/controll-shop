import Window from "@/components/shared/Window";
import CategoryIcon from "@mui/icons-material/Category";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import Logo from "../components/templates/Logo";

export default function Home() {
  return (
    <div className="page image-background bg-cover bg-center bg-no-repeat">
      <Window title="Menu Inicial" button={false}>
        <div className="-mt-56">
          <Logo />
        </div>
        <div className="space-y-2 mt-28">
          <Link
            className="botao verde flex flex-row justify-between"
            href={"/buys"}
          >
            {"COMPRAR"}
            <ShoppingCartIcon />
          </Link>
          <Link
            className="botao azul flex flex-row justify-between"
            href={"/products"}
          >
            {"PRODUTOS"}
            <CategoryIcon />
          </Link>
          <Link
            className="botao laranja flex flex-row justify-between"
            href={"/marks"}
          >
            {"MARCAS"}
            <FlagCircleIcon />
          </Link>
          <Link
            className="botao amarelo flex flex-row justify-between"
            href={"/locals"}
          >
            {"LOCAIS"}
            <LocalLibraryIcon />
          </Link>
        </div>
      </Window>
    </div>
  );
}
