import { Toaster } from "@/components/ui/toaster";
import { ProviderContextBuy } from "@/data/contexts/buy/context-buy";
import { ProviderContextLocal } from "@/data/contexts/local/context-local";
import { ProviderContextMark } from "@/data/contexts/mark/context-mark";
import { ProviderContextMessage } from "@/data/contexts/message/context-message";
import { ProviderContextProduct } from "@/data/contexts/product/context-product";
import { ProviderContextSteps } from "@/data/contexts/shared/context-steps";
import Pagina from "../../components/templates/Page";

export default function Layout(props: any) {
  return (
    <ProviderContextSteps>
      <ProviderContextMessage>
        <ProviderContextMark>
          <ProviderContextProduct>
            <ProviderContextLocal>
              <ProviderContextBuy>
                <Pagina>{props.children}</Pagina>
                <Toaster />
              </ProviderContextBuy>
            </ProviderContextLocal>
          </ProviderContextProduct>
        </ProviderContextMark>
      </ProviderContextMessage>
    </ProviderContextSteps>
  );
}
