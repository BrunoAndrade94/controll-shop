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
          className="bg-blue-400 p-1 rounded-full h-5 w-5 flex items-center justify-center"
          onClick={props.onView}
        >
          <VisibilityIcon fontSize="inherit" />
        </button>
        <button
          title="Editar"
          type="button"
          className="bg-yellow-400 p-1 rounded-full w-5 h-5 flex items-center justify-center"
          onClick={props.onEdit}
        >
          <EditIcon fontSize="inherit" />
        </button>
        <button
          title="Excluir"
          type="button"
          className="bg-red-400 p-1 rounded-full w-5 h-5 flex items-center justify-center"
          onClick={props.onDelete}
        >
          <DeleteForeverIcon fontSize="inherit" />
        </button>
      </div>
    </td>
  );
};

export default ActionButtons;
