"use client";

import Image from "next/image";
import { ExternalLink, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { useHomeContent } from "@/lib/use-home-content";
import { localeFromPathname, localizedPath } from "@/data/locales";

export function SiteHeader() {
  const pathname = usePathname();
  const { header } = useHomeContent();
  const locale = localeFromPathname(pathname);

  const toLocalized = (href: string) => {
    if (href.startsWith("#")) return locale === "en" ? href : `/${locale}${href}`;
    return localizedPath(href, locale);
  };

  return (
    <>
      <div className="release-bar">
        <span className="release-pulse" aria-hidden="true" />
        <span>{header.releaseLabel}</span>
        <a href={toLocalized(header.releaseHref)}>{header.releaseDateLabel}</a>
      </div>
      <header className="site-header">
        <a className="brand" href={toLocalized("#top")} aria-label={header.brandAriaLabel}>
          <Image src="/favicon.png" alt="" width={44} height={44} priority />
          <span>
            <strong>Mortal Shell II</strong>
            <small>{header.brandName}</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label={header.primaryNavLabel}>
          {header.navItems.map(([label, href]) => (
            <a href={toLocalized(href)} key={label}>{label}</a>
          ))}
        </nav>

        <div className="header-actions">
          <LocaleSwitcher />
          <a className="play-link" href="https://mortalshell.com/" target="_blank" rel="noopener noreferrer">
            {header.playGameLabel}
            <ExternalLink size={15} />
          </a>
          <details className="mobile-menu">
            <summary aria-label={header.mobileSummaryLabel}><Menu size={22} /></summary>
            <nav aria-label={header.mobileNavLabel}>
              {header.navItems.map(([label, href]) => (
                <a href={toLocalized(href)} key={label}>{label}</a>
              ))}
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
