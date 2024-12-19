import { ProviderContextLocal } from "@/data/contexts/local/context-local";
import { ProviderContextMark } from "@/data/contexts/mark/context-mark";
import { ProviderContextProduct } from "@/data/contexts/product/context-product";
import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { ProviderContextBuy } from "@/data/contexts/buy/context-buy";
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
              <ProviderContextBuy>{children}</ProviderContextBuy>
            </ProviderContextLocal>
          </ProviderContextProduct>
        </ProviderContextMark>
      </body>
    </html>
  );
}
