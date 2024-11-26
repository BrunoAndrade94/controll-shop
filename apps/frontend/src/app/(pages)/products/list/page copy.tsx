/* eslint-disable react/jsx-key */
import { constBuys } from "core";
import Link from "next/link";

export default function List() {
  return (
    <div className="grid grid-cols-3 gap-5">
      {constBuys.map((oneBuy) => (
        <div
          key={oneBuy.id}
          className="
            flex flex-col w-full overflow-hidden
            bg-zinc-900 rounded-lg
          "
        >
          <div
            key={oneBuy.id}
            className="flex-1 flex flex-col items-center p-7 gap-5 text-center"
          >
            {/* <span className="text-lg font-black">{oneBuy.purchaseDate}</span> */}
            {oneBuy.product.map((product) => {
              return (
                <div className="flex flex-col">
                  <div
                    key={product.id}
                    className="flex-1 flex flex-row text-sm text-zinc-400"
                  >
                    <div className="flex flex-1 justify-between h-5">
                      <div>
                        <span>{product.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex gap-5">
              <Link href={`./`} className="flex-1 botao vermelho">
                Ver Compra
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
