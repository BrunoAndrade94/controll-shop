import { Product } from "core/dist";

export default async function ProductsList() {
  try {
    const repositoy = await fetch("http://localhost:4000/products/get", {
      cache: "no-store",
    });
    if (!repositoy.ok) {
      throw new Error("Falha ao buscar os produtos.");
    }

    const data = await repositoy.json();
    const products = data;

    return (
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md h-dvh">
          <h1 className="text-2xl font-bold text-center mb-6">
            Lista de Produtos
          </h1>
          <ul className="bg-red-200 select-none shadow-xl rounded-lg max-h-80 overflow-y-auto">
            {products.map((product: Product) => (
              <li
                key={product.id}
                className="flex justify-between items-center border border-zinc-500 last:border-none px-6 py-4"
              >
                <span className="text-gray-900">{product.description}</span>
                <div className="text-gray-500 font-semibold">
                  <span className="text-gray-600">
                    {product.mark?.description}
                  </span>
                  <span className="pl-5">
                    {product.lastPrice.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  } catch (error: any) {
    // Caso haja erro, exibe uma mensagem amigável
    console.error(error);
    return (
      <div className="flex justify-center items-center">
        <p className="text-red-500">
          Erro ao carregar os produtos: {error.message}
        </p>
      </div>
    );
  }
}
