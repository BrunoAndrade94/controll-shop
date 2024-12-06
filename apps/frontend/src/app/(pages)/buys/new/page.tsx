"use client";

import FormBuy from "@/components/forms/form-buy";
import Window from "@/components/shared/Window";
import useLocal from "@/data/hooks/use-local";

export default function PageNewBuy() {
  const { queryLocals } = useLocal();

  return (
    <div>
      <Window
        title={`${!!queryLocals ? "Comprando em" : "Nova compra em.."}`}
        label={`${!!queryLocals ? queryLocals : "Onde vamos comprar?"}`}
      >
        <FormBuy />
      </Window>
    </div>
  );
}
