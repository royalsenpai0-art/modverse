"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import MonetagPopunder from "./MonetagPopunder";

export default function AdsWrapper() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <MonetagPopunder />

      <Script id="monetag-inpage" strategy="afterInteractive">
        {`
          (function(s){
            s.dataset.zone='11275943';
            s.src='https://nap5k.com/tag.min.js';
          })([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));
        `}
      </Script>

      <Script id="monetag-vignette" strategy="afterInteractive">
        {`
          (function(s){
            s.dataset.zone='11350536';
            s.src='https://n6wxm.com/vignette.min.js';
          })([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));
        `}
      </Script>
    </>
  );
}