import { Toaster } from "@/components/ui/toaster";
import { ProviderContextMark } from "@/data/contexts/mark/context-mark";
import { ProviderContextMessage } from "@/data/contexts/message/context-message";
import { ProviderContextProduct } from "@/data/contexts/product/context-product";
import Pagina from "../../components/templates/Page";

export default function Layout(props: any) {
  return (
    <ProviderContextMessage>
      <ProviderContextProduct>
        <ProviderContextMark>
          <Pagina>{props.children}</Pagina>
          <Toaster />
        </ProviderContextMark>
      </ProviderContextProduct>
    </ProviderContextMessage>
  );
}
