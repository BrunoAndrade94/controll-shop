"use client";

import FormLocal from "@/components/forms/form-local";
import Window from "@/components/shared/Window";
import useLocal from "@/data/hooks/use-local";

export default function PageNewLocal() {
  const { queryLocals } = useLocal();

  const localCurrent = `${queryLocals?.toUpperCase() || "Novo Local"}`;
  const localTitle = `${!!queryLocals ? "Novo Local" : "Cadastrar novo Local"}`;

  return (
    <div>
      <Window title={localTitle} label={localCurrent}>
        <FormLocal />
      </Window>
    </div>
  );
}
