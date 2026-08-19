"use client";

import { Languages } from "lucide-react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { localeFromPathname, localeLabels, locales, localizedPath, type Locale } from "@/data/locales";

const languageSwitcherLabel: Record<Locale, string> = {
  en: "Language",
  de: "Sprache",
  fr: "Langue",
  "pt-br": "Idioma",
};

export function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const activeLocale = localeFromPathname(pathname);
  const label = languageSwitcherLabel[activeLocale];

  useEffect(() => {
    document.documentElement.lang = activeLocale === "pt-br" ? "pt-BR" : activeLocale;
  }, [activeLocale]);

  return (
    <div className="locale-switcher">
      <Languages size={16} aria-hidden="true" />
      <label className="sr-only" htmlFor="site-language">{label}</label>
      <select id="site-language" value={activeLocale} onChange={(event) => router.push(localizedPath(pathname, event.target.value as Locale))}>
        {locales.map((locale) => <option key={locale} value={locale}>{localeLabels[locale]}</option>)}
      </select>
    </div>
  );
}
