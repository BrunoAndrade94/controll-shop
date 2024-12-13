"use client";

import ButtonVoltar from "@/components/shared/Button-Voltar";
import Window from "@/components/shared/Window";
import useLocal from "@/data/hooks/use-local";
import Link from "next/link";

export default function PageLocal() {
  const { resetLocal, loadingLocal } = useLocal();

  return (
    <Window title="Locais" button={false}>
      <div className="flex flex-col items-center gap-4">
        <div className="space-y-2">
          <Link
            className="botao laranja"
            href={"/locals/new"}
            onClick={resetLocal}
          >
            {"NOVO LOCAL"}
          </Link>
          <Link
            className="botao laranja"
            href={"/locals/list"}
            onClick={loadingLocal}
          >
            {"VER LOCAIS"}
          </Link>
        </div>
        <div className="flex-1">
          <ButtonVoltar />
        </div>
      </div>
    </Window>
  );
}
