import MyModal from "../lists/modal-compras-produto";
import AdjustableLine from "../shared/Adjustable-Line";

// Definição da interface para as props
interface PurchaseData {
  id: string;
  buyDate: string;
  local: {
    id: string;
    description: string;
  };
  products: {
    unitPrice: number;
    markId: string;
    products: {
      id: string;
      description: string;
      mark: {
        id: string;
        description: string;
      };
    };
  }[];
}

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchaseData: PurchaseData[];
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  purchaseData,
}) => {
  const title = purchaseData[0]?.products[0]?.products.description || "";
  const label = purchaseData[0]?.products[0]?.products.id || "";

  return (
    <MyModal isOpen={isOpen} onClose={onClose} title={title} label={label}>
      {purchaseData.length > 0 ? (
        <div>
          {purchaseData.map((purchase) => (
            <div key={purchase.id} className="mb-2">
              <p>
                <strong>Data:</strong>{" "}
                {new Date(purchase.buyDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Local:</strong> {purchase.local.description}
              </p>
              <div>
                {purchase.products.map((prod, index) => (
                  <div key={index}>
                    <p>
                      <strong>Marca: </strong>
                      {prod.products.mark.description}
                    </p>
                    <p>
                      <strong>Preço: </strong>
                      {prod.unitPrice}
                    </p>
                  </div>
                ))}
              </div>
              <AdjustableLine />
            </div>
          ))}
        </div>
      ) : (
        <p className="select-none">Nenhuma compra encontrada.</p>
      )}
    </MyModal>
  );
};

export default PurchaseModal;
