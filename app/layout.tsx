import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AnuncioBar from "@/components/AnuncioBar";
import FooterClient from "@/components/FooterClient";

export const metadata: Metadata = {
  title: "llum & glow — velas artesanales",
  description: "Velas artesanales elaboradas con cera de soja natural, mechas de algodón y fragancias únicas para transformar tu hogar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-[#f6f4f1] text-[#1b1b1b]">
        <AnuncioBar />
        <Navbar />
        <main className="flex-1">{children}</main>

        <FooterClient />
      </body>
    </html>
  );
}
