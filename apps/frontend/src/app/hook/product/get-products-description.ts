import { useEffect, useState } from "react";

export interface Product {
  id: string;
  description: string;
  lastPrice: number;
  mark: {
    description: string;
  };
}

export const GetProductDescription = (searchTerm: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!searchTerm) {
        setProducts([]);
        return;
      } // Não buscar se o termo estiver vazio

      setLoading(true);
      fetch(
        `http://172.17.10.134:4000/products/get/?search=${encodeURIComponent(searchTerm)}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setProducts(data || []);
        })
        .catch((err) => console.error("Erro ao buscar produtos:", err.message))
        .finally(() => setLoading(false));
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  return { products, loading };
};
