"use client";

import Script from "next/script";

export default function InPagePush() {
  return (
    <Script id="monetag-inpage-push" strategy="afterInteractive">
      {`
(function(s){
  s.dataset.zone='11275856';
  s.src='https://nap5k.com/tag.min.js';
})([document.documentElement, document.body]
  .filter(Boolean)
  .pop()
  .appendChild(document.createElement('script')));
      `}
    </Script>
  );
}