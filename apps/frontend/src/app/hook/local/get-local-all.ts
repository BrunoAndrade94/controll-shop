import { LocalRoute } from "core";
import { useState } from "react";

export interface Local {
  id: string;
  description: string;
}

export const GetLocalAll = () => {
  const [locals, setLocals] = useState<Local[]>([]);
  const [loading, setLoading] = useState(false);

  setLoading(true);
  fetch(`${LocalRoute.GetLocalAll}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })

    .then((data) => {
      setLocals(data || []);
    })

    .catch((err) => console.error("Erro ao buscar local:", err.message))

    .finally(() => setLoading(false));

  return { locals, loading };
};
