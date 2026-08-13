import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getGameCategories } from "@/lib/game-utils";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Game Categories",
  description:
    "Browse MOD APK games by genre, including action, racing, arcade, strategy, and more.",
  alternates: { canonical: "/categories" },
};

const categoryIcons: Record<string, string> = {
  Action: "⚔️",
  Adventure: "🗺️",
  Arcade: "🕹️",
  Casual: "🎲",
  Multiplayer: "👥",
  Offline: "📴",
  Online: "🌐",
  Puzzle: "🧩",
  Racing: "🏎️",
  RPG: "🛡️",
  Simulation: "🚜",
  Sports: "⚽",
  Strategy: "♟️",
};

export default async function CategoriesPage() {
  const { data: games, error } = await supabase
    .from("games")
    .select("category");

  const categoryCounts = new Map<string, number>();

  for (const game of games ?? []) {
    for (const category of getGameCategories(game.category)) {
      categoryCounts.set(category, (categoryCounts.get(category) ?? 0) + 1);
    }
  }

  const categories = [...categoryCounts.entries()].sort(([first], [second]) =>
    first.localeCompare(second),
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#090909] text-white">
        <section className="border-b border-zinc-800 bg-gradient-to-b from-zinc-900 to-[#090909]">
          <div className="mx-auto max-w-7xl px-4 py-14">
            <span className="rounded-full bg-orange-500/20 px-4 py-1 text-sm font-semibold text-orange-400">
              🎮 Browse Categories
            </span>
            <h1 className="mt-5 text-4xl font-black md:text-5xl">
              Game Categories
            </h1>
            <p className="mt-4 max-w-2xl text-zinc-400">
              Explore all MOD APK games by category.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-10">
          {error ? (
            <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center">
              <h2 className="text-2xl font-bold">
                Categories are temporarily unavailable
              </h2>
              <p className="mt-3 text-zinc-300">
                Please try again in a moment.
              </p>
            </div>
          ) : categories.length ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {categories.map(([category, count]) => (
                <Link
                  key={category}
                  href={`/category/${encodeURIComponent(category)}`}
                  className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/20"
                >
                  <div className="bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 p-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl backdrop-blur">
                      {categoryIcons[category] || "🎮"}
                    </div>
                  </div>

                  <div className="p-5">
                    <h2 className="text-xl font-bold transition group-hover:text-orange-500">
                      {category}
                    </h2>
                    <p className="mt-2 text-sm text-zinc-400">
                      {count} {count === 1 ? "Game" : "Games"} Available
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs">
                        MOD APK
                      </span>
                      <span className="font-semibold text-orange-500">
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-700 py-24 text-center">
              <div className="text-6xl">🎮</div>
              <h2 className="mt-6 text-3xl font-bold">No Categories Found</h2>
              <p className="mt-3 text-zinc-400">
                Categories will appear after games are published.
              </p>
            </div>
          )}

          <section className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 p-8 text-center md:p-10">
            <h2 className="text-3xl font-black">
              Can&apos;t Find Your Favorite Game?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/80">
              Use the search bar to find a specific Android game, version, or
              genre.
            </p>
            <Link
              href="/search"
              className="mt-7 inline-flex rounded-2xl bg-white px-8 py-4 font-bold text-black transition hover:scale-105"
            >
              Search Games →
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
