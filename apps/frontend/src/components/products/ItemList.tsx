import { Product } from "core";

export interface ProductItemProps {
  product: Product;
}

export default function ItemList(props: ProductItemProps) {
  return (
    <li className="flex justify-between bg-black/40 rounded-md px-6 py-3 border border-zinc-800">
      <div className="flex flex-col">
        <span className="text-xl font-bold">{props.product.description}</span>
        <span className="text-sm text-zinc-400">{props.product.unitPrice}</span>
      </div>
      {/* <div className="flex flex-col items-end">
        <span className="text-sm text-zinc-400">Acompanhantes</span>
        <span className="text-xl font-bold">
          {props.product.qtdeAcompanhantes}
        </span>
      </div> */}
    </li>
  );
}
