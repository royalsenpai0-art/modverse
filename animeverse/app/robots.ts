import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {

  const siteUrl = "https://modverse.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",

        disallow: [
          "/admin",
          "/api",
        ],
      },
    ],

    sitemap: `${siteUrl}/sitemap.xml`,

    host: siteUrl,
  };
}