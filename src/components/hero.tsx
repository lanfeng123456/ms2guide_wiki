"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { useHomeContent } from "@/lib/use-home-content";

export function Hero() {
  const { hero } = useHomeContent();

  return (
    <section className="hero" id="top">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-grid page-shell">
        <div className="hero-copy">
          <p className="eyebrow reveal-step-1"><span />{hero.eyebrow}</p>
          <h1 className="reveal-step-2" aria-label={hero.title}>
            <span>Mortal</span>
            <span>Shell <em>II</em></span>
          </h1>
          <p className="hero-description reveal-step-3">{hero.description}</p>
          <div className="hero-actions reveal-step-4">
            <a className="button button-primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}<ArrowRight size={18} />
            </a>
            <a className="button button-secondary" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </a>
            <a className="text-link" href={hero.tertiaryCta.href}>
              {hero.tertiaryCta.label}<ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div className="hero-media reveal-step-3">
          <Image className="hero-emblem" src="/favicon.png" alt="" width={460} height={460} aria-hidden="true" />
          <a
            className="trailer-card"
            href={hero.trailerUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={hero.trailerAriaLabel}
          >
            <Image
              className="trailer-image"
              src="/images/release-trailer.jpg"
              alt={hero.trailerImageAlt}
              width={1280}
              height={720}
              priority
            />
            <span className="trailer-shade" />
            <span className="trailer-topline">{hero.trailerTopline}</span>
            <span className="trailer-play"><Play size={22} fill="currentColor" /></span>
            <span className="trailer-caption">
              <small>{hero.trailerSmall}</small>
              <strong>{hero.trailerStrong}</strong>
            </span>
          </a>
          <span className="media-index">{hero.mediaIndex}</span>
        </div>
      </div>

      <div className="stat-rail page-shell" aria-label={hero.statsAriaLabel}>
        {hero.stats.map((stat, index) => (
          <div className="stat-item" key={stat}>
            <span>0{index + 1}</span>
            <strong>{stat}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
