import { ProviderContextProduct } from "@/data/contexts/context-product";
import Pagina from "../../components/templates/Page";

export default function Layout(props: any) {
  return (
    <ProviderContextProduct>
      <Pagina>{props.children}</Pagina>
    </ProviderContextProduct>
  );
}
