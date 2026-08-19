"use client";

import { ArrowRight, Clock3, Filter } from "lucide-react";
import { useMemo, useState } from "react";
import { useHomeContent } from "@/lib/use-home-content";

type UpdateScope = "all" | "last7" | "last30";

function toTimestamp(value: string): number {
  return new Date(value).getTime();
}

function inScope(dateValue: string, now: number, days: number): boolean {
  const target = toTimestamp(dateValue);
  return Number.isFinite(target) && now - target <= days * 24 * 60 * 60 * 1000;
}

export function ReleasesUpdates() {
  const { updates } = useHomeContent();
  const [scope, setScope] = useState<UpdateScope>("all");

  const filteredItems = useMemo(() => {
    const now = Date.now();
    const list = [...updates.items];
    if (scope === "all") return list.sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date));
    if (scope === "last7") return list.filter((entry) => inScope(entry.date, now, 7)).sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date));
    return list.filter((entry) => inScope(entry.date, now, 30)).sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date));
  }, [updates.items, scope]);

  return (
    <section className="section-block release-updates page-shell" id="updates">
      <div className="section-heading">
        <div>
          <p className="eyebrow"><span />{updates.eyebrow}</p>
          <h2>{updates.title}</h2>
        </div>
        <p>{updates.intro}</p>
      </div>

      <div className="media-filters" role="group" aria-label="update filters">
        <button
          type="button"
          className={`media-filter ${scope === "all" ? "active" : ""}`}
          onClick={() => setScope("all")}
        >
          <Filter size={14} />{updates.filters.all}
        </button>
        <button
          type="button"
          className={`media-filter ${scope === "last7" ? "active" : ""}`}
          onClick={() => setScope("last7")}
        >
          <Clock3 size={14} />{updates.filters.last7}
        </button>
        <button
          type="button"
          className={`media-filter ${scope === "last30" ? "active" : ""}`}
          onClick={() => setScope("last30")}
        >
          <Clock3 size={14} />{updates.filters.last30}
        </button>
      </div>

      <div className="release-updates-grid">
        {filteredItems.map((update) => (
          <a className="release-card" href={update.href} key={update.title}>
            <small>{update.tag}</small>
            <span>{update.date}</span>
            <h3>{update.title}</h3>
            <p>{update.description}</p>
            <ArrowRight size={14} />
          </a>
        ))}
      </div>
    </section>
  );
}
