"use client";

import { ArrowRight } from "lucide-react";
import { useHomeContent } from "@/lib/use-home-content";
import { usePathname } from "next/navigation";
import { localeFromPathname } from "@/data/locales";

export function AboutGame() {
  const { about } = useHomeContent();
  const locale = localeFromPathname(usePathname());
  const ctaHref = locale === "en" ? "#field-index" : `/${locale}/#field-index`;

  return (
    <section className="about-section page-shell" id="about">
      <div className="about-copy">
        <p className="eyebrow"><span />{about.eyebrow}</p>
        <h2>{about.title}</h2>
        {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <a className="text-link" href={ctaHref}>{about.ctaLabel}<ArrowRight size={16} /></a>
      </div>
      <dl className="fact-grid">
        {about.stats.map((stat, index) => (
          <div key={stat.label}>
            <span>0{index + 1}</span>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
      <p className="about-watermark" aria-hidden="true">{about.watermark}</p>
    </section>
  );
}
