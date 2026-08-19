"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { localeFromPathname, type Locale } from "@/data/locales";

export function RouteLocaleSync() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);

  useEffect(() => {
    const lang = locale === "en" ? "en" : locale === "pt-br" ? "pt-BR" : locale;
    document.documentElement.lang = lang;
  }, [locale]);

  return null;
}

