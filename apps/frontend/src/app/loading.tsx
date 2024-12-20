/* eslint-disable jsx-a11y/alt-text */
import Pagina from "@/components/templates/Page";
import Image from "next/image";
import LoadingGit from "../../public/images/loading/loading-shearch.gif";

export default function Loading() {
  return (
    <Pagina>
      <div className="flex flex-col items-center">
        <Image src={LoadingGit} alt="carregando..." width={220} height={220} />
      </div>
    </Pagina>
  );
}
