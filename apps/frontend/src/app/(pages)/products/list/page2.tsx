/* eslint-disable react/jsx-key */
import { Product } from "@/app/core/src";
import ItemList from "@/components/products/ItemList";

export interface ListProps {
  products: Product[];
}
export default function List(props: ListProps) {
  return (
    <div>
      <ul className="flex flex-col gap-2">
        {props.products.map((product) => (
          <ItemList key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
