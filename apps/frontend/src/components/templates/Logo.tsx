import { Righteous } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const font = Righteous({
  subsets: ["latin"],
  weight: "400",
});

export default function Logo() {
  return (
    <div className="-mt-28 mb-10">
      <Link
        href={"../"}
        className={`flex flex-col items-center gap-2 ${font.className}`}
      >
        <Image src={"/logo.svg"} height={50} width={50} alt="Logo" />

        <h1 className="flex flex-col items-center text-xl select-none pointer">
          <span>
            CONTROL<span className="text-orange-500">3 </span>
            <span>DE COMPR</span>
            <span className="text-red-500">4</span>S<span></span>
          </span>
          <span>
            UNIF
            <span className="text-blue-400">I</span>
            CADO
          </span>
        </h1>
      </Link>
    </div>
  );
}
