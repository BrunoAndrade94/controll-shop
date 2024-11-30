import Logo from "./Logo";

export interface PaginaProps {
  children: React.ReactNode;
  className?: string;
}

export default function Pagina(props: PaginaProps) {
  return (
    <div
      className="
				flex flex-col items-center
				py-5 min-h-screen
				bg-slate-700"
    >
      <Logo />
      <main
        className={`flex-1 flex flex-col justify-center pt-5 container ml-40 mr-40 pl-10 pr-10 ${props.className}`}
      >
        {props.children}
      </main>
    </div>
  );
}
