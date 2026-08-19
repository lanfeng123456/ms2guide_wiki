"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useHomeContent } from "@/lib/use-home-content";
import { localeFromPathname } from "@/data/locales";

export function SiteFooter() {
  const localizedContent = useHomeContent();
  const locale = localeFromPathname(usePathname());
  const aboutHref = locale === "en" ? "#field-index" : `/${locale}/#field-index`;
  return (
    <footer className="site-footer">
      <div className="footer-grid page-shell">
        <div className="footer-about">
          <div className="footer-brand">
            <Image src="/favicon.png" alt="" width={46} height={46} />
            <span><strong>Mortal Shell II</strong><small>{localizedContent.footer.brandName}</small></span>
          </div>
          <p>{localizedContent.footer.about}</p>
        </div>
        <div>
          <h2>{localizedContent.footer.officialTitle}</h2>
          <nav aria-label={localizedContent.footer.officialLinksLabel}>
            {localizedContent.footer.official.map((link) => (
              <a href={link.href} target="_blank" rel="noopener noreferrer" key={link.label}>
                {link.label}<ArrowUpRight size={14} />
              </a>
            ))}
          </nav>
        </div>
        <div>
          <h2>{localizedContent.footer.archiveTitle}</h2>
          <nav aria-label={localizedContent.footer.archiveLinksLabel}>
            <a href={aboutHref}>{localizedContent.footer.allGuidesLabel}</a>
            <a href="/privacy-policy">{localizedContent.footer.privacyPolicyLabel}</a>
            <a href="/terms-of-service">{localizedContent.footer.termsOfServiceLabel}</a>
          </nav>
        </div>
      </div>
      <div className="footer-bottom page-shell">
        <span>{localizedContent.footer.copyright}</span>
        <span>{localizedContent.footer.rights}</span>
      </div>
    </footer>
  );
}
