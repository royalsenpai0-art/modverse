"use client";

import Script from "next/script";

export default function MonetagPopunder() {
  return (
    <Script
      id="monetag-popunder"
      src="https://quge5.com/88/tag.min.js"
      strategy="afterInteractive"
      data-zone="258780"
      data-cfasync="false"
    />
  );
}