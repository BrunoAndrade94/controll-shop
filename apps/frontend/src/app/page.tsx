"use client";

import Window from "@/components/shared/Window";
import useLocal from "@/data/hooks/use-local";
import useMark from "@/data/hooks/use-mark";
import useProduct from "@/data/hooks/use-product";
import CategoryIcon from "@mui/icons-material/Category";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import Logo from "../components/templates/Logo";

export default function Home() {
  const { productsData } = useProduct();
  const { marksData } = useMark();
  const { localsData } = useLocal();

  return (
    <div className="page image-background bg-cover bg-center bg-no-repeat">
      <div className="sm:max-x-lg w-11/12 ml-5 mr-5 flex flex-col items-center">
        <Window title="Menu Inicial" button={false}>
          <div className="-mt-56">
            <Logo />
          </div>
          <div className="space-y-2 mt-28 p-2">
            <Link
              className="botao verde flex flex-row justify-between"
              href={"/buys"}
            >
              {`COMPRAR (0)`}
              <ShoppingCartIcon />
            </Link>
            <Link
              className="botao azul flex flex-row justify-between"
              href={"/products"}
            >
              {`PRODUTOS (${productsData?.length ?? 0})`}
              <CategoryIcon />
            </Link>
            <Link
              className="botao laranja flex flex-row justify-between"
              href={"/marks"}
            >
              {`MARCAS (${marksData?.length ?? 0})`}
              <FlagCircleIcon />
            </Link>
            <Link
              className="botao amarelo flex flex-row justify-between"
              href={"/locals"}
            >
              {`LOCAIS (${localsData?.length ?? 0})`}
              <LocalLibraryIcon />
            </Link>
          </div>
        </Window>
      </div>
    </div>
  );
}
