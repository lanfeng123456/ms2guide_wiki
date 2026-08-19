"use client";

import { Clock3, Film, ExternalLink, Filter } from "lucide-react";
import { useMemo, useState } from "react";
import { useHomeContent } from "@/lib/use-home-content";

type Scope = "all" | "last7" | "last30";

function toTimestamp(dateText: string): number {
  return new Date(dateText).getTime();
}

function withinDays(dateText: string, now: number, days: number): boolean {
  const target = toTimestamp(dateText);
  return Number.isFinite(target) && now - target <= days * 24 * 60 * 60 * 1000;
}

export function MediaShowcase() {
  const { media } = useHomeContent();
  const [scope, setScope] = useState<Scope>("all");

  const filteredMedia = useMemo(() => {
    const now = Date.now();
    const all = [...media.items];
    const sorted = all.sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date));
    if (scope === "all") return sorted;
    if (scope === "last7") return sorted.filter((item) => withinDays(item.date, now, 7));
    return sorted.filter((item) => withinDays(item.date, now, 30));
  }, [media.items, scope]);

  return (
    <section className="section-block media-showcase page-shell" id="media">
      <div className="section-heading">
        <div>
          <p className="eyebrow"><span />{media.eyebrow}</p>
          <h2>{media.title}</h2>
        </div>
        <p>{media.intro}</p>
      </div>

      <div className="media-filters" role="group" aria-label="media filters">
        <button
          type="button"
          className={`media-filter ${scope === "all" ? "active" : ""}`}
          onClick={() => setScope("all")}
        >
          <Filter size={14} />{media.filters.all}
        </button>
        <button
          type="button"
          className={`media-filter ${scope === "last7" ? "active" : ""}`}
          onClick={() => setScope("last7")}
        >
          <Clock3 size={14} />{media.filters.last7}
        </button>
        <button
          type="button"
          className={`media-filter ${scope === "last30" ? "active" : ""}`}
          onClick={() => setScope("last30")}
        >
          <Clock3 size={14} />{media.filters.last30}
        </button>
      </div>

      <div className="media-grid">
        {filteredMedia.map((item) => (
          <a className="media-card" href={item.href} target="_blank" rel="noopener noreferrer" key={`${item.type}-${item.title}`}>
            <span>{item.type}</span>
            <small>{item.date}</small>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className="media-link">
              Open media <Film size={14} />
              <ExternalLink size={14} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

