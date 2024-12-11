interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick?: (item: any) => void;
  title: string;
  children: React.ReactNode;
}

const MyModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onClick,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-purple-100 rounded-lg shadow-lg w-1/2 p-5 flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-red-500 font-bold text-xl"
          >
            ×
          </button>
        </div>
        <div className="mt-4">{children}</div>
        <button onClick={onClick} className="botao vermelho mt-4" type="button">
          APAGAR
        </button>
      </div>
    </div>
  );
};

export default MyModal;
