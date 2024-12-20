"use client";

import useBuy from "@/data/hooks/use-buy";
import useMessage from "@/data/hooks/use-message";
import useProduct from "@/data/hooks/use-product";
import MyInput from "../My-Input";

interface SelectorProductProps {
  isScannerOpen?: boolean;
  setScannerOpen?: (value: boolean) => void;
  handleScan?: (scannedData: string) => void;
}

export default function SelectorProduct(props: SelectorProductProps) {
  ///
  /// CONST INICIO
  const { productsData, queryProducts, setQueryProducts, setFilteredProducts } =
    useProduct();

  const { buy, updateBuy, setShowList, setShowCart } = useBuy();

  const { msgError } = useMessage();
  /// CONST FINAL
  ///

  ///
  /// FUNCAO INICIO
  const handleSearchProduct = (description: string) => {
    // Busca produtos que contenham a string digitada
    const filteredProducts = productsData.filter((productData) =>
      productData.description?.toUpperCase().includes(description.toUpperCase())
    );

    setFilteredProducts(filteredProducts);
  };

  const handleOnChangeProduct = (value: string) => {
    setQueryProducts(value);

    if (value.length === 0) {
      setShowList(true);
      setQueryProducts("");
      updateBuy({ ...buy, products: [] });
      setFilteredProducts(productsData);
      return;
    }

    handleSearchProduct(queryProducts);
  };
  /// FUNCAO FINAL
  ///

  ///
  /// RETURN
  return (
    <div className="flex flex-row text-center items-center">
      <div className="flex-1 items-center -mt-6">
        <MyInput
          label={`${
            productsData.length === 0
              ? "Procurando produtos.."
              : "Selecione um produto"
          }`}
          value={queryProducts ?? ""}
          disabled={productsData.length === 0}
          onBlur={() => {
            setShowList(false);
            setFilteredProducts([]);
          }}
          onFocus={() => {
            setShowList(true);
            setShowCart(false);
            setFilteredProducts(productsData);
          }}
          onChange={(event) => handleOnChangeProduct(event.target.value)}
          className={`${
            productsData.length === 0
              ? "bg-gray-200 border-dashed border-gray-400 opacity-50 cursor-not-allowed p-2 rounded-md w-full"
              : ""
          }`}
        />
      </div>
      <div className="ml-2">
        <button
          type="button"
          className="botao verde"
          onClick={() => {
            msgError("ainda não sou funcional.");
          }}
        >
          QRCODE
        </button>
        {/* {props.isScannerOpen && (
          <BarcodeScannerModal
            onClose={() => props.setScannerOpen(false)}
            onScan={props.handleScan}
          />
        )} */}
      </div>
    </div>
  );
}
