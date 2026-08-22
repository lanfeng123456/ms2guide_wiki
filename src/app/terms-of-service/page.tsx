export const metadata = {
  alternates: { canonical: "/terms-of-service" },
  title: "Terms of Service | Mortal Shell II Wiki",
  description:
    "Terms of service for using the Mortal Shell II Field Archive, including usage scope, content limits, and contributor guidelines.",
};

export default function TermsOfServicePage() {
  return (
    <main className="page-shell content-page">
      <section className="section-block">
        <h1>Terms of Service</h1>
        <p>
          This guide site provides fan-created summaries, route notes, and game information pages for non-commercial use.
        </p>
        <p>
          Game assets and names belong to their respective owners. Information is presented for reference and may not be
          fully complete before full launch.
        </p>
        <p>
          We do not promise game-account-related guarantees. All gameplay strategies are based on available public evidence
          and may change with updates.
        </p>
        <p>Use any external links at your own risk and follow platform rules for store, social, and video services.</p>
      </section>
    </main>
  );
}
