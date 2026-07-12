// components/MonetagAds.tsx
"use client";

import Script from "next/script";

export default function MonetagAds() {
  return (
    <Script
      src="https://quge5.com/88/tag.min.js"
      data-zone="258781"
      strategy="afterInteractive"
    />
  );
}