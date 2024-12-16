/* eslint-disable jsx-a11y/alt-text */
import Pagina from "@/components/templates/Page";
import Image from "next/image";
import Loading from "../../public/images/loading/loading.gif";

export default function NotFound() {
  return (
    <Pagina>
      <div className="flex flex-col items-center">
        <Image src={Loading} alt="carregando..." width={500} height={500} />
      </div>
    </Pagina>
  );
}
