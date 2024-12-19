// import { useState } from "react";

// export interface BuyProps {
//   id: string;
//   description: string;
//   lastPrice: number;
//   mark: {
//     description: string;
//   };
// }

// export const GetBuyAll = () => {
//   const [products, setProducts] = useState<BuyProps[]>([]);
//   const [loading, setLoading] = useState(false);

//   setLoading(true);
//   fetch(`http://localhost:4000/products/get/all`)
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }
//       return res.json();
//     })

//     .then((data) => {
//       setProducts(data || []);
//     })

//     .catch((err) => console.error("Erro ao buscar produtos:", err.message))

//     .finally(() => setLoading(false));

//   return { products, loading };
// };
