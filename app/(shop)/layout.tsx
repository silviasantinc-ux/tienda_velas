import AnuncioBar from "@/components/AnuncioBar";
import Navbar from "@/components/Navbar";
import FooterClient from "@/components/FooterClient";
import type { ReactNode } from "react";

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AnuncioBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <FooterClient />
    </>
  )
}
