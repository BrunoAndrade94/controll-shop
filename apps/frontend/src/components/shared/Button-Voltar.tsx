import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import Link from "next/link";
export default function ButtonVoltar() {
  return (
    <div className="flex flex-row justify-end ml-auto">
      <button type="button" title="Clique para voltar">
        <Link className="botao azul mt-5" href={"/"}>
          {"voltar"}
          <ReplyAllIcon />
        </Link>
      </button>
    </div>
  );
}
