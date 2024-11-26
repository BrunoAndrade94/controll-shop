/* eslint-disable react/jsx-key */

// import { constBuys } from "core";
export default async function List() {
  const res = await fetch("http://localhost:4000/products/get/all", {
    cache: "no-store",
  });

  const products = await res.json();

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>
            <h3>{product.description}</h3>
            <p>Código de Barras: {product.codeBar}</p>
            <p>Quantidade: {product.amount}</p>
            <p>
              Preço Unitário:{" "}
              {product.unitPrice.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p>
              Preço Total:{" "}
              {product.totalPrice.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// export async function getServerSideProps() {
//   try {
//     const res = await fetch("http://localhost:4000/products/get/all");
//     const products = await res.json();

//     return {
//       props: {
//         products,
//       },
//     };
//   } catch (error) {
//     console.error("Erro ao buscar os produtos:", error);
//     return {
//       props: {
//         products: [],
//       },
//     };
//   }
// }
