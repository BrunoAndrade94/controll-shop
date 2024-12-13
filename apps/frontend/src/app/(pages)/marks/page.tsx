"use client";

import ButtonVoltar from "@/components/shared/Button-Voltar";
import Window from "@/components/shared/Window";
import useMark from "@/data/hooks/use-mark";
import Link from "next/link";

export default function PageMark() {
  const { resetMark } = useMark();

  return (
    <Window title="Marcas" button={false}>
      <div className="flex flex-col items-center gap-4">
        <div className="space-y-2">
          <Link
            className="botao laranja"
            href={"/marks/new"}
            onClick={resetMark}
          >
            {"NOVA MARCA"}
          </Link>
          <Link className="botao laranja" href={"/marks/list"}>
            {"VER MARCAS"}
          </Link>
        </div>
        <div className="flex-1">
          <ButtonVoltar />
        </div>
      </div>
    </Window>
  );
}
