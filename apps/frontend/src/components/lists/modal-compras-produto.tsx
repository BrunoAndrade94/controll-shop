import ClearIcon from "@mui/icons-material/Clear";

interface ModalComprasProdutoProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  label?: string;
  children: React.ReactNode;
}

const ModalComprasProduto: React.FC<ModalComprasProdutoProps> = (
  props: ModalComprasProdutoProps
) => {
  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-purple-300 rounded-lg shadow-lg w-full max-w-md mx-auto xs:w-full m-10 p-4 flex flex-col">
        <div className="flex flex-col justify-between items-start">
          <div className="text-xs text-black select-none">
            TODAS AS COMPRAS DESTE PRODUTO
          </div>
          <div className="text-lg font-bold select-none">{props.title}</div>
          <div className="text-[10px] text-zinc-500">{props.label}</div>
        </div>
        <div className="mt-4 max-h-80 overflow-y-auto select-none">
          {props.children}
        </div>
        <button
          onClick={props.onClose}
          className="botao azul mt-2"
          type="button"
        >
          Fechar
          <ClearIcon />
        </button>
      </div>
    </div>
  );
};

export default ModalComprasProduto;
