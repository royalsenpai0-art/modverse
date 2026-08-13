import type { MetadataRoute } from "next";
import { getGameCategories } from "@/lib/game-utils";
import { supabase } from "@/lib/supabase";

const siteUrl = "https://modversepk.online";

export const revalidate = 21_600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [gamesResponse, blogsResponse] = await Promise.all([
    supabase.from("games").select("slug,updated_at,category"),
    supabase.from("blogs").select("slug,updated_at"),
  ]);

  const games = gamesResponse.data ?? [];
  const blogs = blogsResponse.data ?? [];
  const now = new Date();

  const corePages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: `${siteUrl}/categories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/latest`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/recently-updated`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/featured`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/popular`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/trending`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/top-downloads`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.2,
    },
    {
      url: `${siteUrl}/dmca`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.2,
    },
    {
      url: `${siteUrl}/cookies`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.2,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = [
    ...new Set(games.flatMap((game) => getGameCategories(game.category))),
  ].map((category) => ({
    url: `${siteUrl}/category/${encodeURIComponent(category)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const gamePages: MetadataRoute.Sitemap = games.map((game) => ({
    url: `${siteUrl}/game/${game.slug}`,
    lastModified: game.updated_at ? new Date(game.updated_at) : now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${siteUrl}/blog/${blog.slug}`,
    lastModified: blog.updated_at ? new Date(blog.updated_at) : now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...corePages, ...categoryPages, ...gamePages, ...blogPages];
}
