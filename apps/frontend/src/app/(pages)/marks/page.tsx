"use client";

import useMark from "@/data/hooks/use-mark";
import Link from "next/link";

export default function PageMark() {
  const { resetMark } = useMark();

  return (
    <div>
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
        <Link className="botao azul mt-5" href={"/"}>
          {"voltar"}
        </Link>
      </div>
    </div>
  );
}
