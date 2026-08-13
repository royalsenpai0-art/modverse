import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { displayVersion } from "@/lib/game-utils";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Search Games",
  description:
    "Search MODVerse for Android games, MOD APK versions, developers, and categories.",
  robots: { index: false, follow: true },
};

type SearchParams = Promise<{ q?: string; query?: string }>;

type Game = {
  id: number;
  title: string;
  slug: string;
  banner: string | null;
  icon: string | null;
  version: string | null;
  category: string | null;
};

function normalizeSearchTerm(value?: string) {
  return (value ?? "")
    .replace(/[^\p{L}\p{N}\s'-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q, query } = await searchParams;
  // `query` remains supported temporarily so old shared links continue to work.
  const searchTerm = normalizeSearchTerm(q || query);

  let games: Game[] = [];

  if (searchTerm) {
    const { data } = await supabase
      .from("games")
      .select("id,title,slug,banner,icon,version,category")
      .or(
        `title.ilike.%${searchTerm}%,developer.ilike.%${searchTerm}%,publisher.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`,
      )
      .order("updated_at", { ascending: false })
      .limit(48);

    games = (data ?? []) as Game[];
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#090909] px-4 py-10 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-[#111111] p-7 md:p-10">
            <p className="text-sm font-bold uppercase tracking-[3px] text-orange-500">
              Game Search
            </p>
            <h1 className="mt-3 text-3xl font-black md:text-5xl">
              {searchTerm ? "Search Results" : "Find Your Next Game"}
            </h1>
            <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
              {searchTerm
                ? `${games.length} ${games.length === 1 ? "result" : "results"} found for “${searchTerm}”.`
                : "Search by game title, developer, publisher, or category."}
            </p>
          </div>

          {!searchTerm ? (
            <div className="mt-8 rounded-3xl border border-dashed border-zinc-700 bg-zinc-900/50 p-10 text-center">
              <h2 className="text-2xl font-bold">What are you looking for?</h2>
              <p className="mt-3 text-zinc-400">
                Use the search icon in the header to start searching.
              </p>
              <Link
                href="/categories"
                className="mt-6 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-bold transition hover:bg-orange-600"
              >
                Browse Categories
              </Link>
            </div>
          ) : games.length ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {games.map((game) => (
                <Link
                  key={game.id}
                  href={`/game/${game.slug}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#151515] transition hover:-translate-y-1 hover:border-orange-500"
                >
                  <div className="relative aspect-[16/9] bg-zinc-800">
                    <Image
                      src={game.banner || game.icon || "/logo.png"}
                      alt={game.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <h2 className="line-clamp-2 text-lg font-bold text-white">
                      {game.title}
                    </h2>
                    <p className="mt-2 text-sm text-orange-400">
                      {game.category || "Game"}
                    </p>
                    <p className="mt-2 text-sm text-zinc-400">
                      {displayVersion(game.version)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-zinc-700 py-20 text-center">
              <h2 className="text-2xl font-bold text-white">No Games Found</h2>
              <p className="mt-3 text-zinc-400">
                Try a different title, developer, or category.
              </p>
              <Link
                href="/categories"
                className="mt-6 inline-flex rounded-xl border border-orange-500 px-6 py-3 font-bold text-orange-400 transition hover:bg-orange-500 hover:text-white"
              >
                Browse Categories
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
