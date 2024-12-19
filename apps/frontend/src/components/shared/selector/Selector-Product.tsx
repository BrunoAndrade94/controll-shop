import BarcodeScannerModal from "../input/barcode-scanner";
import MyInput from "../My-Input";

interface SelectorProductProps {
  productsData: any[];
  queryProducts: string | undefined;
  setShowList: (value: boolean) => void;
  setFilteredProducts: (products: any[]) => void;
  setShowCart: (value: boolean) => void;
  handleOnChangeProduct: (value: string) => void;
  msgError: (message: string) => void;
  isScannerOpen: boolean;
  setScannerOpen: (value: boolean) => void;
  handleScan: (scannedData: string) => void;
}

const SelectorProduct: React.FC<SelectorProductProps> = (
  props: SelectorProductProps
) => {
  return (
    <div className="flex flex-row text-center items-center -mt-5">
      <div className="flex-1 items-center">
        <MyInput
          label={`${
            props.productsData.length === 0
              ? "Procurando produtos.."
              : "Selecione um produto"
          }`}
          value={props.queryProducts ?? ""}
          disabled={props.productsData.length === 0}
          onBlur={() => {
            props.setShowList(false);
            props.setFilteredProducts([]);
          }}
          onFocus={() => {
            props.setShowList(true);
            props.setShowCart(false);
            props.setFilteredProducts(props.productsData);
          }}
          onChange={(event) => props.handleOnChangeProduct(event.target.value)}
          className={`${
            props.productsData.length === 0
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
            props.msgError("AINDA NÃO SOU FUNCIONAL");
          }}
        >
          QRCODE
        </button>
        {props.isScannerOpen && (
          <BarcodeScannerModal
            onClose={() => props.setScannerOpen(false)}
            onScan={props.handleScan}
          />
        )}
      </div>
    </div>
  );
};

export default SelectorProduct;
