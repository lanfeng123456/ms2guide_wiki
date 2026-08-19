import type { Metadata } from "next";
import { Archivo, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { RouteLocaleSync } from "@/components/route-locale-sync";

const archivo = Archivo({
  variable: "--font-interface",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mortal Shell 2 Guide — Mortal Shell II Wiki",
  description:
    "Mortal Shell 2 Guide with beginner walkthroughs, Shell builds, boss strategies, weapon upgrades, Tarstone locations, achievements, and fast travel tips for the official launch.",
  keywords:
    "mortal shell 2 guide",
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Mortal Shell 2 Guide — Mortal Shell II Wiki",
    description:
      "Independent field archive for Mortal Shell 2, with Shell overviews, weapons, bosses, Tarstones, achievements, and exploration.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${archivo.variable} ${cormorant.variable}`}>
        <RouteLocaleSync />
        {children}
      </body>
    </html>
  );
}
