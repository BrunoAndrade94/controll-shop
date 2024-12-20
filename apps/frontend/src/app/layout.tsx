import { ProviderContextBuy } from "@/data/contexts/buy/context-buy";
import { ProviderContextLocal } from "@/data/contexts/local/context-local";
import { ProviderContextMark } from "@/data/contexts/mark/context-mark";
import { ProviderContextMessage } from "@/data/contexts/message/context-message";
import { ProviderContextProduct } from "@/data/contexts/product/context-product";
import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
const font = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Minhas Compras",
  description: "Controle de uma Forma Fácil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="pt-BR">
      <body className={font.className}>
        <ProviderContextMark>
          <ProviderContextProduct>
            <ProviderContextLocal>
              <ProviderContextMessage>
                <ProviderContextBuy>{children}</ProviderContextBuy>
              </ProviderContextMessage>
            </ProviderContextLocal>
          </ProviderContextProduct>
        </ProviderContextMark>
      </body>
    </html>
  );
}
