import Navbar from "@/components/Navbar";
import FooterClient from "@/components/FooterClient";
import CookieBanner from "@/components/CookieBanner";
import ProximamenteBanner from "@/components/ProximamenteBanner";
import type { ReactNode } from "react";

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <ProximamenteBanner />
      <main className="flex-1">{children}</main>
      <FooterClient />
      <CookieBanner />
    </>
  )
}
