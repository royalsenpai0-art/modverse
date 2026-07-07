import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: games } = await supabase
    .from("games")
    .select("slug, updated_at");

  const gameUrls =
    games?.map((game) => ({
      url: `https://YOUR-DOMAIN.com/game/${game.slug}`,
      lastModified: game.updated_at
        ? new Date(game.updated_at)
        : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })) || [];

  return [
    {
      url: "https://YOUR-DOMAIN.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://YOUR-DOMAIN.com/about",
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: "https://YOUR-DOMAIN.com/contact",
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: "https://YOUR-DOMAIN.com/privacy-policy",
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: "https://YOUR-DOMAIN.com/dmca",
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: "https://YOUR-DOMAIN.com/cookies",
      lastModified: new Date(),
      priority: 0.5,
    },
    ...gameUrls,
  ];
}