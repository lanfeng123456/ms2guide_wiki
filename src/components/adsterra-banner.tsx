import Script from "next/script";

export function AdsterraBanner() {
  return (
    <div className="adsterra-banner" aria-label="Advertisements">
      <div className="adsterra-slot adsterra-slot-wide">
        <Script id="adsterra-wide-options" strategy="afterInteractive">
          {`
            atOptions = {
              'key' : '2c3fe3a93001bf85947eefe6b471c0f5',
              'format' : 'iframe',
              'height' : 90,
              'width' : 728,
              'params' : {}
            };
          `}
        </Script>
        <Script
          id="adsterra-wide-invoke"
          src="https://www.highperformanceformat.com/2c3fe3a93001bf85947eefe6b471c0f5/invoke.js"
          strategy="afterInteractive"
        />
      </div>

      <div className="adsterra-slot adsterra-slot-container">
        <Script
          id="adsterra-container-invoke"
          src="https://pl30941417.effectivecpmnetwork.com/63418b900539f6089a243273d124426c/invoke.js"
          strategy="afterInteractive"
          async
          data-cfasync="false"
        />
        <div id="container-63418b900539f6089a243273d124426c" />
      </div>
    </div>
  );
}
