"use client";

import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useHomeContent } from "@/lib/use-home-content";

export function FinalCta() {
  const { finalCta } = useHomeContent();

  return (
    <section className="final-cta page-shell">
      <Image src="/favicon.png" alt="" width={360} height={360} aria-hidden="true" />
      <div>
        <p className="eyebrow eyebrow-light"><span />{finalCta.eyebrow}</p>
        <h2>{finalCta.title}</h2>
        <p>{finalCta.description}</p>
      </div>
      <div className="final-actions">
        <a className="button button-ink" href={finalCta.primary.href}>{finalCta.primary.label}<ArrowRight size={18} /></a>
        <a href={finalCta.secondary.href} target="_blank" rel="noopener noreferrer">
          {finalCta.secondary.label}<ExternalLink size={16} />
        </a>
      </div>
    </section>
  );
}
