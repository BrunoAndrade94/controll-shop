import ButtonVoltar from "@/components/shared/Button-Voltar";
import Window from "@/components/shared/Window";
import Link from "next/link";

export default function PageLocal() {
  return (
    <Window title="Locais" button={false}>
      <div className="flex flex-col items-center gap-4">
        <div className="space-y-2">
          <Link className="botao laranja" href={"/locals/new"}>
            {"NOVO LOCAL"}
          </Link>
          <Link className="botao laranja" href={"/locals/list"}>
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
