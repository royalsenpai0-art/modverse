import type { Metadata } from "next";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL("https://YOURDOMAIN.com"),

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

  verification: {
    google: "GOOGLE_VERIFICATION_CODE",
  
  },

  openGraph: {
    title: "MODVerse",
    description: "Download the latest MOD APK games safely and for free.",
    url: "https://YOURDOMAIN.com",
    siteName: "MODVerse",
    images: [
      {
        url: "https://YOURDOMAIN.com/logo.png",
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
    images: ["https://YOURDOMAIN.com/logo.png"],
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
    url: "https://YOURDOMAIN.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://YOURDOMAIN.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MODVerse",
    url: "https://YOURDOMAIN.com",
    logo: "https://YOURDOMAIN.com/logo.png",
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
      </body>
    </html>
  );
}