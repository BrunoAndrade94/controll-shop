import Logo from "./Logo";

export interface PaginaProps {
  children: React.ReactNode;
  className?: string;
}

export default function Pagina(props: PaginaProps) {
  return (
    <div className="flex flex-col bg-cover bg-center bg-no-repeat image-background h-dvh items-center">
      <div className="mt-36">
        <Logo />
      </div>
      <main className={`mt-28 ${props.className}`}>{props.children}</main>
    </div>
  );
}
