"use client";

import { usePathname } from "next/navigation";
import { getLocalizedHomeContent, localeFromPathname } from "@/data/locales";

export function useHomeContent() {
  return getLocalizedHomeContent(localeFromPathname(usePathname()));
}
