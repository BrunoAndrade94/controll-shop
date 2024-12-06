import Link from "next/link";

export default function ButtonHome() {
  return (
    <div className="flex flex-row justify-end ml-auto">
      <button type="button" title="Clique para voltar">
        <Link
          href={"./"}
          className="w-full bg-orange-600 text-white py-2 px-4 rounded-full hover:bg-orange-500"
        >
          <span className="text-bold">{"<<"}</span>
        </Link>
      </button>
    </div>
  );
}
