import { AboutGame } from "@/components/about-game";
import { FinalCta } from "@/components/final-cta";
import { GuideIndex } from "@/components/guide-index";
import { Hero } from "@/components/hero";
import { ReleasesUpdates } from "@/components/releases-updates";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MediaShowcase } from "@/components/media-showcase";
import { QuickFaq } from "@/components/quick-faq";
import { QuickHub } from "@/components/quick-hub";
import { StartHere } from "@/components/start-here";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <StartHere />
        <GuideIndex />
        <QuickHub />
        <QuickFaq />
        <ReleasesUpdates />
        <MediaShowcase />
        <AboutGame />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
