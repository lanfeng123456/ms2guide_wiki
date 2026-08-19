"use client";

import { ArrowUpRight } from "lucide-react";
import { useHomeContent } from "@/lib/use-home-content";

export function StartHere() {
  const { start } = useHomeContent();

  return (
    <section className="section-block start-section page-shell" data-testid="start-here">
      <div className="section-heading">
        <div>
          <p className="eyebrow"><span />{start.eyebrow}</p>
          <h2>{start.title}</h2>
        </div>
        <p>{start.intro}</p>
      </div>

      <div className="start-grid">
        {start.cards.map((card) => (
          <article className="start-card" key={card.number}>
            <div className="card-topline">
              <span className="card-number">{card.number}</span>
              <span className="card-tag">{card.tag}</span>
            </div>
            <div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
            <a href={card.href} aria-label={`${start.openLabel} ${card.title}`}><ArrowUpRight size={18} /></a>
          </article>
        ))}
      </div>
    </section>
  );
}
