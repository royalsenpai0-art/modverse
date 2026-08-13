import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  displayVersion,
  getCategoryKey,
  getGameCategories,
  getGameSummary,
  normalizeCategory,
} from "@/lib/game-utils";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{ slug: string }>;
};

type Game = {
  id: number;
  title: string;
  slug: string;
  icon: string | null;
  category: string | null;
  description: string | null;
  short_description: string | null;
  version: string | null;
  size: string | null;
  views: number | null;
  downloads: number | null;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = normalizeCategory(decodeURIComponent(slug));

  return {
    title: `${category} MOD APK Games`,
    description: `Browse the latest ${category} MOD APK games, versions, and download information.`,
    alternates: { canonical: `/category/${encodeURIComponent(category)}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = normalizeCategory(decodeURIComponent(slug));
  const categoryKey = getCategoryKey(category);

  const { data, error } = await supabase
    .from("games")
    .select(
      "id,title,slug,icon,category,description,short_description,version,size,views,downloads",
    )
    .order("updated_at", { ascending: false });

  const games = ((data ?? []) as Game[]).filter((game) =>
    getGameCategories(game.category).some(
      (item) => getCategoryKey(item) === categoryKey,
    ),
  );

  if (error || !games.length) notFound();

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#090909] text-white">
        <section className="border-b border-zinc-800 bg-gradient-to-b from-zinc-900 to-[#090909]">
          <div className="mx-auto max-w-7xl px-4 py-14">
            <span className="rounded-full bg-orange-500/20 px-4 py-1 text-sm font-semibold text-orange-400">
              🎮 Category
            </span>
            <h1 className="mt-5 text-4xl font-black md:text-5xl">
              {category} Games
            </h1>
            <p className="mt-4 text-zinc-400">
              {games.length}{" "}
              {games.length === 1 ? "MOD APK game" : "MOD APK games"} available
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {games.map((game) => {
              const summary = getGameSummary({
                shortDescription: game.short_description,
                description: game.description,
              });

              return (
                <Link
                  key={game.id}
                  href={`/game/${game.slug}`}
                  className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/20"
                >
                  <div className="flex flex-col items-center pt-6">
                    <Image
                      src={game.icon || "/logo.png"}
                      alt={game.title}
                      width={90}
                      height={90}
                      className="h-[90px] w-[90px] rounded-3xl border border-zinc-700 object-cover transition duration-300 group-hover:scale-110"
                    />
                    <span className="mt-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                      MOD APK
                    </span>
                  </div>

                  <div className="p-5 text-center">
                    <h2 className="line-clamp-2 text-lg font-bold transition group-hover:text-orange-500">
                      {game.title}
                    </h2>
                    {summary && (
                      <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
                        {summary}
                      </p>
                    )}

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs">
                        {displayVersion(game.version)}
                      </span>
                      <span className="text-xs text-green-400">
                        {game.size || "—"}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                      <span>👁 {game.views?.toLocaleString() || 0}</span>
                      <span>⬇ {game.downloads?.toLocaleString() || 0}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <section className="mt-16 rounded-3xl bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 p-8 text-center md:p-10">
            <h2 className="text-3xl font-black">Looking for Something Else?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/80">
              Browse every category or search by game title to find what you
              need.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/categories"
                className="rounded-2xl bg-white px-6 py-3 font-bold text-black transition hover:scale-105"
              >
                All Categories
              </Link>
              <Link
                href="/search"
                className="rounded-2xl border border-white/50 px-6 py-3 font-bold transition hover:bg-white/10"
              >
                Search Games
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
