import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://YOUR-DOMAIN.com"),

  title: {
    default: "MODVerse - Download MOD APK Games Latest Version",
    template: "%s | MODVerse",
  },

  description:
    "Download the latest MOD APK Games for Android. Get Unlimited Money, Premium Features, Fast Downloads, and Safe APK files only on MODVerse.",

  keywords: [
    "MOD APK",
    "MODVerse",
    "Android Games",
    "APK Download",
    "Unlimited Money",
    "Premium APK",
    "Game MOD",
    "Latest Games",
    "Android MOD",
    "Game Download",
  ],

  authors: [
    {
      name: "MODVerse",
    },
  ],

  creator: "MODVerse",
  publisher: "MODVerse",

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://YOUR-DOMAIN.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",

    url: "https://YOUR-DOMAIN.com",

    siteName: "MODVerse",

    title: "MODVerse - Download MOD APK Games",

    description:
      "Download the latest MOD APK Games with Unlimited Money, Premium Features and Fast Download Servers.",

    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "MODVerse",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "MODVerse",

    description:
      "Download the Latest MOD APK Games for Android.",

    images: ["/logo.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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

    url: "https://YOUR-DOMAIN.com",

    potentialAction: {
      "@type": "SearchAction",

      target:
        "https://YOUR-DOMAIN.com/search?q={search_term_string}",

      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",

    "@type": "Organization",

    name: "MODVerse",

    url: "https://YOUR-DOMAIN.com",

    logo: "https://YOUR-DOMAIN.com/logo.png",
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

      </body>
    </html>
  );
}