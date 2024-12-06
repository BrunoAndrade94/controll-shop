"use client";

import FormMark from "@/components/forms/form-mark";
import Window from "@/components/shared/Window";
import useMark from "@/data/hooks/use-mark";

export default function PageNewMark() {
  const { queryMarks } = useMark();

  const markCurrent = `${queryMarks?.toUpperCase() || "Nova Marca"}`;
  const markTitle = `${!!queryMarks ? "Nova Marca" : "Cadastrar nova Marca"}`;

  return (
    <div>
      <Window title={markTitle} label={markCurrent}>
        <FormMark />
      </Window>
    </div>
  );
}
