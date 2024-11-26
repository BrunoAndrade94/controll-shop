import { useEffect, useState } from "react";

export interface Local {
  id: string;
  description: string;
}

export const GetLocalDescription = (searchTerm: string) => {
  const [locals, setLocals] = useState<Local[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!searchTerm) {
        setLocals([]);
        return;
      } // Não buscar se o termo estiver vazio

      setLoading(true);
      fetch(
        `http://172.17.10.134:4000/locals/get/?search=${encodeURIComponent(searchTerm)}`
      )
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
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  return { locals, loading };
};
