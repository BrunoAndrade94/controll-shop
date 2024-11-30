"use client";

import FormLocal from "@/components/forms/form-local";
import Window from "@/components/shared/Window";
import useLocal from "@/data/hooks/use-local";

export default function PageNewLocal() {
  const { local } = useLocal();

  const localCurrent = `${local.description?.toUpperCase() || "Novo Local"}`;
  const localTitle = `${!!local.description ? "Novo Local" : "Cadastrar novo Local"}`;

  return (
    <div>
      <Window title={localTitle} label={localCurrent}>
        <FormLocal />
      </Window>
    </div>
  );
}
