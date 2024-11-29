"use client";

import FormMark from "@/components/forms/form-mark";
import Window from "@/components/shared/Window";
import useMark from "@/data/contexts/use-mark";

export default function PageNewMark() {
  const { mark } = useMark();

  // const markCurrent = `${mark.description?.toUpperCase() || "Nova Marca"}`;
  // const markTitle = `${!!mark.description ? "Nova Marca" : "Cadastro de Marca"}`;

  return (
    <div>
      <Window title={"markTitle"} label={"markCurrent"}>
        <FormMark />
      </Window>
    </div>
  );
}
