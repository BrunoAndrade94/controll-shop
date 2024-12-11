import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

export interface ButtonIconProps {
  icon: string;
}

export default function ButtonIcon(props: ButtonIconProps) {
  return (
    <Link className="botao verde flex flex-row justify-between" href={"/buys"}>
      <div>{"COMPRAR"}</div>
      <div>
        <ShoppingCartIcon />
      </div>
    </Link>
  );
}
