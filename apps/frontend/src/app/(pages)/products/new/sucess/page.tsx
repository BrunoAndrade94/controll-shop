"use client";

import Window from "@/components/shared/Window";
import useMessage from "@/data/hooks/use-message";
import useProduct from "@/data/hooks/use-product";
import { Link } from "lucide-react";
import { useEffect } from "react";

export default function PageSucessProduct() {
  const { msgSucess } = useMessage();

  const { product } = useProduct();

  useEffect(() => {
    msgSucess("produto criado com sucesso");
  }, [msgSucess]); // Atu

  return (
    <Window label="Produto criado">
      <div>{product.description}</div>
      <Link className="botao verde" href={"/products/new"}>
        {"CADSTRAR NOVO PRODUTO"}
      </Link>
    </Window>
  );
}
