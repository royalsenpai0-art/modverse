import type { Metadata } from "next";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL("https://modversepk.online"),

  title: {
    default: "MODVerse",
    template: "%s | MODVerse",
  },

  description:
    "Download the latest MOD APK games safely and for free on MODVerse.",

  keywords: [
    "MOD APK",
    "Game MOD",
    "Android Games",
    "Unlimited Money",
    "MODVerse",
  ],

  

  openGraph: {
    title: "MODVerse",
    description: "Download the latest MOD APK games safely and for free.",
    url: "https://modversepk.online",
    siteName: "MODVerse",
    images: [
      {
        url: "https://modversepk.online/logo.png",
        width: 512,
        height: 512,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "MODVerse",
    description: "Download the latest MOD APK games safely and for free.",
    images: ["https://modversepk.online/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MODVerse",
    url: "https://modversepk.online",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://modversepk.online/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MODVerse",
    url: "https://modversepk.online",
    logo: "https://modversepk.online/logo.png",
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {children}

        <CookieConsent />

        <Toaster
          position="bottom-right"
          reverseOrder={false}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KNERTYSZJJ"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-KNERTYSZJJ');
  `}
        </Script>
      </body>
    </html>
  );
}