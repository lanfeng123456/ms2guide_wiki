import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "../page";
import { locales, type Locale } from "@/data/locales";

const metadataByLocale: Record<string, Metadata> = {
  de: {
    title: "Mortal Shell 2 Guide — Leitfäden, Hüllen & Bosse",
    description:
      "Unabhängiges Mortal Shell 2 Guide mit Einsteiger-Leitfäden, Hüllen, Waffen, Bossen, Tarsteinen, Erfolgen und aktuellen Veröffentlichungsinformationen.",
    openGraph: {
      title: "Mortal Shell 2 Guide — Leitfäden, Hüllen & Bosse",
      description:
        "Unabhängiges Mortal Shell 2 Guide mit Einsteiger-Leitfäden, Hüllen, Waffen, Bossen, Tarsteinen, Erfolgen und aktuellen Veröffentlichungsinformationen.",
      type: "website",
    },
  },
  fr: {
    title: "Mortal Shell 2 Guide — Guides, enveloppes et boss",
    description:
      "Wiki indépendant de Mortal Shell 2 Guide avec guides pour débutants, enveloppes, armes, boss, Tarstones, succès et informations de sortie actualisées.",
    openGraph: {
      title: "Mortal Shell 2 Guide — Guides, enveloppes et boss",
      description:
        "Wiki indépendant de Mortal Shell 2 Guide avec guides pour débutants, enveloppes, armes, boss, Tarstones, succès et informations de sortie actualisées.",
      type: "website",
    },
  },
  "pt-br": {
    title: "Mortal Shell 2 Guide — Guias, carcaças e chefes",
    description:
      "Wiki independente de Mortal Shell 2 Guide com guias para iniciantes, carcaças, armas, chefes, Tarstones, conquistas e informações atualizadas de lançamento.",
    openGraph: {
      title: "Mortal Shell 2 Guide — Guias, carcaças e chefes",
      description:
        "Wiki independente de Mortal Shell 2 Guide com guias para iniciantes, carcaças, armas, chefes, Tarstones, conquistas e informações atualizadas de lançamento.",
      type: "website",
    },
  },
};

export function generateStaticParams() {
  return locales.filter((locale) => locale !== "en").map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return metadataByLocale[locale] ?? {};
}

export default async function LocalizedHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale) || locale === "en") notFound();
  return <HomePage />;
}
