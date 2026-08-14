import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Search Games",
  robots: {
    index: false,
    follow: true,
  },
};

const popularSearches = [
  "Among Us",
  "Frag Pro Shooter",
  "Subway Surfers",
  "Minecraft",
  "PVZ Fusion",
  "Stumble Guys",
  "Free Fire",
  "Chicken Gun",
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; query?: string }>;
}) {
  // Site links `?query=` bhejte hain, Google SearchAction schema `?q=`
  // use karta hai — dono support karte hain.
  const params = await searchParams;
  const q = (params.q ?? params.query ?? "").trim();

  if (!q) {
    return (
      <>
        <Header />
        <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-10">
          <h1 className="mb-4 text-3xl font-bold text-white">
            Search MOD APK Games
          </h1>

          <p className="mb-8 text-gray-400">
            Search for any game, developer or category to find its MOD APK.
          </p>

          <form
            action="/search"
            method="get"
            className="mb-10 flex max-w-xl gap-3"
          >
            <input
              type="search"
              name="query"
              placeholder="Search games..."
              className="w-full rounded-xl border border-white/10 bg-[#151515] px-4 py-3 text-white outline-none transition focus:border-orange-500"
            />
            <button
              type="submit"
              className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
            >
              Search
            </button>
          </form>

          <p className="mb-4 text-sm font-bold uppercase tracking-[3px] text-orange-500">
            Top Searches
          </p>

          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <Link
                key={term}
                href={`/search?query=${encodeURIComponent(term)}`}
                className="rounded-full border border-white/10 bg-[#151515] px-4 py-2 text-sm text-white transition hover:border-orange-500 hover:text-orange-500"
              >
                {term}
              </Link>
            ))}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { data } = await supabase
    .from("games")
    .select("*")
    .or(
      `title.ilike.%${q}%,developer.ilike.%${q}%,publisher.ilike.%${q}%,category.ilike.%${q}%`,
    )
    .order("created_at", { ascending: false });

  const games = data || [];

  return (
    <>
      <Header />
      <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold text-white">Search Results</h1>

        <p className="mb-8 text-gray-400">
          {games.length} result(s) found for{" "}
          <span className="font-semibold text-orange-500">"{q}"</span>
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {games.map((game) => (
            <Link
              key={game.id}
              href={`/game/${game.slug}`}
              className="overflow-hidden rounded-2xl border border-white/10 bg-[#151515] transition hover:border-orange-500"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={game.banner || game.icon}
                  alt={game.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h2 className="line-clamp-1 text-lg font-bold text-white">
                  {game.title}
                </h2>

                <p className="mt-2 text-sm text-gray-400">{game.version}</p>
              </div>
            </Link>
          ))}
        </div>

        {games.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center">
            <h2 className="text-2xl font-bold text-white">No Games Found</h2>

            <p className="mt-3 text-gray-400">Try another keyword.</p>

            <Link
              href="/search"
              className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
            >
              Search Again
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
