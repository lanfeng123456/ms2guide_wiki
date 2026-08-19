"use client";

import { ArrowRight } from "lucide-react";
import { useHomeContent } from "@/lib/use-home-content";

export function QuickHub() {
  const { quickHub } = useHomeContent();

  return (
    <section className="section-block quick-hub page-shell" id="quick-hub">
      <div className="section-heading quick-hub-heading">
        <div>
          <p className="eyebrow"><span />{quickHub.eyebrow}</p>
          <h2>{quickHub.title}</h2>
        </div>
        <p>{quickHub.description}</p>
      </div>
      <div className="quick-hub-grid">
        {quickHub.cards.map((card) => (
          <a className="quick-hub-card" href={card.href} key={card.label}>
            <span>{card.label}</span>
            <p>{card.description}</p>
            <ArrowRight size={14} />
          </a>
        ))}
      </div>
    </section>
  );
}

