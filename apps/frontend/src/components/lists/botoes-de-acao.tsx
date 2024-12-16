import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Definição da interface para as props do componente
interface ActionButtonsProps {
  onView: () => void; // Função chamada ao clicar no botão de "Compras"
  onEdit: () => void; // Função chamada ao clicar no botão de "Editar"
  onDelete: () => void; // Função chamada ao clicar no botão de "Excluir"
}

// Componente reutilizável
const ActionButtons: React.FC<ActionButtonsProps> = (
  props: ActionButtonsProps
) => {
  return (
    <td className="border-b py-1">
      <div className="flex justify-between space-x-2 px-1">
        <button
          title="Compras"
          type="button"
          className="botao-dot azul"
          onClick={props.onView}
        >
          <VisibilityIcon />
        </button>
        <button
          title="Editar"
          type="button"
          className="botao-dot amarelo"
          onClick={props.onEdit}
        >
          <EditIcon />
        </button>
        <button
          title="Excluir"
          type="button"
          className="botao-dot vermelho"
          onClick={props.onDelete}
        >
          <DeleteForeverIcon />
        </button>
      </div>
    </td>
  );
};

export default ActionButtons;
