"use client";

import useProduct from "@/data/hooks/use-product";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ProductCountData {
  total: number;
}

const ProductCountChart: React.FC = () => {
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const { productsData } = useProduct();

  useEffect(() => {
    setTotalProducts(productsData.length);
  }, [setTotalProducts, productsData]);

  // Dados para o gráfico
  const data = [
    {
      name: "Produtos",
      total: totalProducts,
    },
  ];

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductCountChart;
