"use client";

import { ArrowRight } from "lucide-react";
import { useHomeContent } from "@/lib/use-home-content";

export function GuideIndex() {
  const localizedContent = useHomeContent();
  return (
    <section className="field-index" id="field-index" data-testid="field-index">
      <div className="page-shell">
        <div className="section-heading index-heading">
          <div>
            <p className="eyebrow"><span />{localizedContent.guideIndex.eyebrow}</p>
            <h2>{localizedContent.guideIndex.title}</h2>
          </div>
          <p>{localizedContent.guideIndex.description}</p>
        </div>

        <div className="index-groups">
          {localizedContent.guideGroups.map((group) => (
            <div className="index-group" key={group.title}>
              <div className="index-group-title">
                <span>{group.marker}</span>
                <h3>{group.title}</h3>
              </div>
              <div className="index-links">
                {group.items.map((item) => (
                  <a href={item.href} key={item.label}>
                    <span>
                      <strong>{item.label}</strong>
                      <small>{item.description}</small>
                    </span>
                    <ArrowRight size={17} />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
