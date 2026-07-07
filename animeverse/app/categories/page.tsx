import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function CategoriesPage() {

    const { data: games } = await supabase
        .from("games")
        .select("category");

    const categories = [...new Set(
        games
            ?.map((g) => g.category)
            .filter(Boolean)
    )];

    return (
        <>
            <Header />

            <main className="min-h-screen bg-[#090909] text-white">

                {/* Hero */}

                <section className="border-b border-zinc-800 bg-gradient-to-b from-zinc-900 to-[#090909]">

                    <div className="mx-auto max-w-7xl px-4 py-14">

                        <span className="rounded-full bg-orange-500/20 px-4 py-1 text-sm font-semibold text-orange-400">

                            🎮 Browse Categories

                        </span>

                        <h1 className="mt-5 text-5xl font-black">

                            Game Categories

                        </h1>

                        <p className="mt-4 max-w-2xl text-zinc-400">

                            Explore all MOD APK games by category.

                        </p>

                    </div>

                </section>

                <div className="mx-auto max-w-7xl px-4 py-10">

                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                        {categories?.map((category) => {

                            const totalGames =
                                games?.filter((g) => g.category === category).length || 0;

                            return (

                                <Link
                                    key={category}
                                    href={`/category/${encodeURIComponent(category)}`}
                                    className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/20"
                                >

                                    <div className="bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 p-8">

                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-4xl backdrop-blur">

                                            🎮

                                        </div>

                                    </div>

                                    <div className="p-5">

                                        <h2 className="text-xl font-bold transition group-hover:text-orange-500">

                                            {category}

                                        </h2>

                                        <p className="mt-2 text-sm text-zinc-400">

                                            {totalGames} Games Available

                                        </p>

                                        <div className="mt-5 flex items-center justify-between">

                                            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs">

                                                MOD APK

                                            </span>

                                            <span className="text-orange-500 font-semibold">

                                                Explore →

                                            </span>

                                        </div>

                                    </div>

                                </Link>

                            );

                        })}
                    </div>

                    {/* Empty State */}

                    {(!categories || categories.length === 0) && (

                        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-700 py-24">

                            <div className="text-6xl">
                                🎮
                            </div>

                            <h2 className="mt-6 text-3xl font-bold">
                                No Categories Found
                            </h2>

                            <p className="mt-3 text-zinc-400">
                                Categories will appear automatically after adding games.
                            </p>

                        </div>

                    )}

                    {/* Bottom CTA */}

                    <section className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 p-10">

                        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">

                            <div>

                                <h2 className="text-3xl font-black">

                                    Can't Find Your Favorite Game?

                                </h2>

                                <p className="mt-3 max-w-2xl text-white/80">

                                    Browse all MOD APK games or use the search bar to find your
                                    favorite Android game instantly.

                                </p>

                            </div>

                            <Link href="/categories"
                                className="rounded-2xl bg-white px-8 py-4 font-bold text-black transition hover:scale-105"
                            >

                                Browse All Games →

                            </Link>

                        </div>

                    </section>

                </div>

            </main>

        </>

    );

}