import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

// Next.js performance controller: ISR caching implementation
// Har 6 ghante baad sitemap build automatic revalidate aur refresh hoga
export const revalidate = 21600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = "https://modversepk.online";

  // Database fetch processing optimization
  // Sirf zaroori data lanes load ki ja rahi hain execution performance ko maintain karne ke liye
  const { data: games } = await supabase
    .from("games")
    .select("slug, updated_at, image_url"); // Advanced tracking attributes shamil hain

  // Dynamic game information portals map configuration
  const gamePages =
    games?.map((game) => ({
      url: `${siteUrl}/game/${game.slug}`,
      lastModified: game.updated_at ? new Date(game.updated_at) : new Date(),
      changeFrequency: "always" as const, // Real-time indexing priority signals for Google crawler
      priority: 0.95, // High crawling target status
    })) || [];

  // Dedicated dynamic target file packages routing setup
  const downloadPages =
    games?.map((game) => ({
      url: `${siteUrl}/download/${game.slug}`,
      lastModified: game.updated_at ? new Date(game.updated_at) : new Date(),
      changeFrequency: "always" as const, // Immediate cache check signal
      priority: 0.85,
    })) || [];

  // Authority operational dynamic map paths setups
  const coreChannels = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "always" as const, priority: 1.0 },
    { url: `${siteUrl}/recently-updated`, lastModified: new Date(), changeFrequency: "always" as const, priority: 0.90 },
    { url: `${siteUrl}/popular`, lastModified: new Date(), changeFrequency: "always" as const, priority: 0.90 },
    { url: `${siteUrl}/trending`, lastModified: new Date(), changeFrequency: "always" as const, priority: 0.90 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.80 },
  ];

  // Global regulatory policy links parameters
  const legalTrustPortals = [
    { url: `${siteUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.30 },
    { url: `${siteUrl}/dmca`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.30 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.30 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.30 },
  ];

  // Structural arrays optimization merge
  return [...coreChannels, ...gamePages, ...downloadPages, ...legalTrustPortals];
}
