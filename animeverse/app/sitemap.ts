import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const siteUrl = "https://modverse.com";

  const { data: games } = await supabase
    .from("games")
    .select("slug, updated_at");

  const gamePages =
    games?.map((game) => ({
      url: `${siteUrl}/game/${game.slug}`,
      lastModified: game.updated_at
        ? new Date(game.updated_at)
        : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })) || [];

  const downloadPages =
    games?.map((game) => ({
      url: `${siteUrl}/download/${game.slug}`,
      lastModified: game.updated_at
        ? new Date(game.updated_at)
        : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })) || [];

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${siteUrl}/recently-updated`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${siteUrl}/popular`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${siteUrl}/trending`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    ...gamePages,
    ...downloadPages,
  ];
}