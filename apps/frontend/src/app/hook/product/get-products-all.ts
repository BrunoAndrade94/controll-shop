import { ProductRoute } from "core/dist";
import { useState } from "react";

export interface Product {
  id: string;
  description: string;
  lastPrice: number;
  mark: {
    description: string;
  };
}

export const GetProductAll = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  setLoading(true);
  fetch(`${ProductRoute.GetProductAll}`)
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

  return { products, loading };
};
