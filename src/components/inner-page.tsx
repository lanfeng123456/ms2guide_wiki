import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen, CircleAlert, ExternalLink } from "lucide-react";
import { getInnerPage, type InnerPageRecord } from "@/data/inner-pages";
import type { Locale } from "@/data/locales";

function statusClass(status: InnerPageRecord["status"]) {
  return status === "Verified" ? "status-verified" : status === "Beta evidence" ? "status-beta" : "status-watch";
}

const labelsByLocale: Record<
  Locale,
  {
    backToIndex: string;
    quickAnswer: string;
    updateWatch: string;
    sources: string;
    related: string;
    disclaimerSuffix: string;
    communityRecord: string;
    evidencePrefix: string;
  }
> = {
  en: {
    backToIndex: "Back to Field Index",
    quickAnswer: "Quick answer",
    updateWatch: "Update watch",
    sources: "Verified sources",
    related: "Related guides",
    communityRecord: "Independent community record",
    evidencePrefix: "Evidence is time-stamped to",
    disclaimerSuffix: "Beta feedback is labeled as beta evidence and is not a permanent formal-release rule.",
  },
  de: {
    backToIndex: "Zurück zum Inhaltsverzeichnis",
    quickAnswer: "Kurze Antwort",
    updateWatch: "Aktualisierungs-Check",
    sources: "Verifizierte Quellen",
    related: "Verwandte Leitfäden",
    communityRecord: "Unabhängige Community-Aufzeichnungen",
    evidencePrefix: "Belege sind mit Uhrzeit versehen seit",
    disclaimerSuffix: "Beta-Feedback ist als Beta-Nachweis markiert und kein dauerhaftes Finalregelformat.",
  },
  fr: {
    backToIndex: "Retour à l'index",
    quickAnswer: "Réponse courte",
    updateWatch: "Surveillance de mise à jour",
    sources: "Sources vérifiées",
    related: "Guides associés",
    communityRecord: "Enregistrement communautaire indépendant",
    evidencePrefix: "Les preuves sont horodatées à",
    disclaimerSuffix: "Les retours bêta sont étiquetés comme preuve bêta et ne sont pas une règle permanente de la version finale.",
  },
  "pt-br": {
    backToIndex: "Voltar ao índice",
    quickAnswer: "Resposta rápida",
    updateWatch: "Acompanhar atualização",
    sources: "Fontes verificadas",
    related: "Guias relacionados",
    communityRecord: "Registro comunitário independente",
    evidencePrefix: "As evidências são registradas em",
    disclaimerSuffix: "Feedback da beta é marcado como evidência beta e não é uma regra permanente da versão final.",
  },
};

const statusByLocale: Record<Locale, Record<InnerPageRecord["status"], string>> = {
  en: {
    Verified: "Verified",
    "Beta evidence": "Beta evidence",
    "Update watch": "Update watch",
  },
  de: {
    Verified: "Verifiziert",
    "Beta evidence": "Beta-Nachweis",
    "Update watch": "Update-Überwachung",
  },
  fr: {
    Verified: "Vérifié",
    "Beta evidence": "Preuve bêta",
    "Update watch": "À surveiller",
  },
  "pt-br": {
    Verified: "Verificado",
    "Beta evidence": "Evidência beta",
    "Update watch": "Acompanhar atualização",
  },
};

const checkedLabelByLocale: Record<Locale, string> = {
  en: "Checked",
  de: "Aktualisiert",
  fr: "Vérifié le",
  "pt-br": "Verificado em",
};

export function InnerPage({ page, locale = "en" }: { page: InnerPageRecord; locale?: Locale }) {
  const labels = labelsByLocale[locale];
  const statusLabel = statusByLocale[locale]?.[page.status] ?? page.status;
  const relatedHrefPrefix = locale === "en" ? "/guides/" : `/${locale}/guides/`;
  const indexHref = locale === "en" ? "/#field-index" : `/${locale}/#field-index`;
  const localeCode: Record<Locale, string> = {
    en: "en-US",
    de: "de-DE",
    fr: "fr-FR",
    "pt-br": "pt-BR",
  };
  const rawCheckedDate = page.checked.replace(/^Checked\s+/i, "");
  const parsedDate = new Date(rawCheckedDate);
  const checkedDate = Number.isNaN(parsedDate.getTime())
    ? rawCheckedDate
    : new Intl.DateTimeFormat(localeCode[locale], {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(parsedDate);
  const relatedLinks = page.related.map((slug) => {
    const localizedRelated = locale === "en" ? undefined : getInnerPage(slug, locale);
    const fallbackLabel = slug.replace("mortal-shell-ii-", "").replaceAll("-", " ");
    const linkedTitle = localizedRelated?.title ? localizedRelated.title.replace(/^Mortal Shell II\s+/i, "") : undefined;
    return {
      href: `${relatedHrefPrefix}${slug}`,
      label: linkedTitle ?? fallbackLabel,
    };
  });
  return (
    <main className="article-shell">
      <div className="article-wrap">
        <Link className="article-back" href={indexHref}><ArrowLeft size={15} /> {labels.backToIndex}</Link>
        <div className="article-kicker"><span />{page.eyebrow}</div>
        <div className="article-heading">
          <div>
            <p className="article-keyword">{page.keyword}</p>
            <h1>{page.title}</h1>
            <p className="article-description">{page.description}</p>
          </div>
          <div className={`article-status ${statusClass(page.status)}`}><span className="status-dot" />{statusLabel}</div>
        </div>
        <div className="article-meta"><span>{checkedLabelByLocale[locale]} {checkedDate}</span><span>{labels.communityRecord}</span></div>

        <section className="article-answer" aria-labelledby="quick-answer">
          <div className="article-answer-icon"><BookOpen size={21} /></div>
          <div><p className="eyebrow eyebrow-light" id="quick-answer"><span />{labels.quickAnswer}</p><p>{page.quickAnswer}</p></div>
        </section>

        <div className="article-grid">
          <div className="article-main">
            {page.sections.map((section, index) => (
              <section className="article-section" key={section.title}>
                <div className="article-section-number">{String(index + 1).padStart(2, "0")}</div>
                <div><h2>{section.title}</h2><p className="article-section-intro">{section.intro}</p><ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>
              </section>
            ))}
          </div>
          <aside className="article-aside">
            <section className="article-side-card article-watch" aria-labelledby="update-watch">
              <CircleAlert size={18} /><h2 id="update-watch">{labels.updateWatch}</h2><p>{page.updateWatch}</p>
            </section>
            <section className="article-side-card" aria-labelledby="sources">
              <p className="eyebrow" id="sources"><span />{labels.sources}</p>
              <div className="source-list">{page.sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">{source.label}<ExternalLink size={14} /></a>)}</div>
            </section>
            <section className="article-side-card" aria-labelledby="related-guides">
              <p className="eyebrow" id="related-guides"><span />{labels.related}</p>
              <div className="related-list">
                {relatedLinks.map((related) => (
                  <Link key={related.href} href={related.href}>
                    {related.label}<ArrowUpRight size={14} />
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </div>

        <div className="article-disclaimer"><CircleAlert size={16} /><p>{labels.evidencePrefix} {checkedDate}. {labels.disclaimerSuffix}</p></div>
      </div>
    </main>
  );
}
