import Script from "next/script";

export function AdsterraBanner() {
  return (
    <>
      <div className="adsterra-banner">
        <Script id="adsterra-at-options" strategy="afterInteractive">
          {`
            atOptions = {
              'key' : 'd90b8f25eb42678ad8365102485c3968',
              'format' : 'iframe',
              'height' : 60,
              'width' : 468,
              'params' : {}
            };
          `}
        </Script>
        <Script
          id="adsterra-invoke"
          src="https://www.highperformanceformat.com/d90b8f25eb42678ad8365102485c3968/invoke.js"
          strategy="afterInteractive"
        />
      </div>
    </>
  );
}
