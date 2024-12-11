import ClearIcon from "@mui/icons-material/Clear";
import Link from "next/link";
export default function ButtonHome() {
  return (
    <div className="flex flex-row justify-end ml-auto">
      <button type="button" title="Clique para voltar">
        <Link
          href={"./"}
          className="w-full bg-purple-700 text-white py-2 px-4 rounded-full hover:bg-purple-600"
        >
          {<ClearIcon />}
        </Link>
      </button>
    </div>
  );
}
