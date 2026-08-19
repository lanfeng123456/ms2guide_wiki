"use client";

import { ChevronDown } from "lucide-react";
import { useHomeContent } from "@/lib/use-home-content";

export function QuickFaq() {
  const { faq } = useHomeContent();

  return (
    <section className="section-block quick-faq page-shell" id="quick-faq">
      <div className="section-heading">
        <div>
          <p className="eyebrow"><span />{faq.eyebrow}</p>
          <h2>{faq.title}</h2>
        </div>
        <p>{faq.intro}</p>
      </div>
      <div className="faq-list">
        {faq.items.map((item) => (
          <details className="faq-item" key={item.question}>
            <summary>
              <span>{item.question}</span>
              <ChevronDown size={16} />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

