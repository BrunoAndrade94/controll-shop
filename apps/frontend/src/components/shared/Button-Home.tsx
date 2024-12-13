import ClearIcon from "@mui/icons-material/Clear";

import Link from "next/link";
export default function ButtonHome() {
  return (
    <div className="flex flex-row justify-end ml-auto">
      <button
        className="w-full bg-purple-700 text-white rounded-full p-1 hover:bg-purple-600"
        type="button"
        title="Clique para voltar"
      >
        <Link href={"./"}>
          <ClearIcon />
        </Link>
      </button>
    </div>
  );
}
