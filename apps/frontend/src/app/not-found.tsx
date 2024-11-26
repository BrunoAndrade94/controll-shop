import Image from "next/image";
import Link from "next/link";
import imageNotFound from "../../public/images/not-found/robo-not-found.webp";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center m-[6rem]">
      <Image
        priority
        src={imageNotFound}
        width={400}
        height={400}
        alt="Imagem NotFound"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <p className="text-red-300 py-5">ESTAMOS PERDIDOS.</p>

      <Link href={"/"} className="botao verde">
        VOLTE POR AQUI...
      </Link>
    </div>
  );
}
