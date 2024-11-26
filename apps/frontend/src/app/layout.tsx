import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
const font = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Controle de Compras",
  description: "Compras de uma Forma Fácil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="pt-BR">
      <body className={font.className}>{children}</body>
    </html>
  );
}
