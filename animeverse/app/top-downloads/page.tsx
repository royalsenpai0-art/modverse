import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

export default async function TopDownloadsPage() {

    const { data: games } = await supabase
        .from("games")
        .select("*")
        .order("downloads", { ascending: false });

    return (
        <>
            <Header />

            <main className="min-h-screen bg-[#090909] text-white">

                {/* Hero */}

                <section className="border-b border-zinc-800 bg-gradient-to-b from-zinc-900 to-[#090909]">

                    <div className="mx-auto max-w-7xl px-4 py-14">

                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                            <div>

                                <span className="rounded-full bg-orange-500/20 px-4 py-1 text-sm font-semibold text-orange-400">

                                    🔥 Trending Games

                                </span>

                                <h1 className="mt-4 text-5xl font-black">

                                    Top Downloads

                                </h1>

                                <p className="mt-4 max-w-2xl text-zinc-400">

                                    Discover the most downloaded MOD APK games with unlimited
                                    money, premium unlocked features and latest versions.

                                </p>

                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

                                <p className="text-sm text-zinc-500">

                                    Total Games

                                </p>

                                <h2 className="mt-2 text-4xl font-black text-orange-500">

                                    {games?.length || 0}

                                </h2>

                            </div>

                        </div>

                    </div>

                </section>

                <div className="mx-auto max-w-7xl px-4 py-10">

                    {games?.length === 0 ? (

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 py-20 text-center">

                            <h2 className="text-3xl font-bold">

                                No Games Found

                            </h2>

                        </div>

                    ) : (

                        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
                            {(games ?? []).map((game, index) => (

                                <Link
                                    key={game.id}
                                    href={`/game/${game.slug}`}
                                    className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/20"
                                >

                                    {/* Image */}

                                    <div className="relative aspect-[3/4] overflow-hidden">

                                        <Image
                                            src={game.icon || game.icon}
                                            alt={game.title}
                                            fill
                                            sizes="(max-width:768px) 50vw,(max-width:1200px) 33vw,20vw"
                                            className="object-cover transition duration-500 group-hover:scale-110"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                                        {/* Ranking */}

                                        <div className="absolute left-3 top-3 rounded-xl bg-orange-600 px-3 py-2 text-sm font-bold text-white">

                                            #{index + 1}

                                        </div>

                                        {/* MOD */}

                                        <div className="absolute right-3 top-3 rounded-xl bg-green-600 px-3 py-2 text-xs font-bold">

                                            MOD

                                        </div>

                                        {/* Rating */}

                                        <div className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs backdrop-blur">

                                            ⭐ {game.rating || "5.0"}

                                        </div>

                                    </div>

                                    {/* Content */}

                                    <div className="space-y-3 p-4">

                                        <h2 className="line-clamp-2 text-lg font-bold group-hover:text-orange-500">

                                            {game.title}

                                        </h2>

                                        <div className="flex items-center justify-between">

                                            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs">

                                                {game.category}

                                            </span>

                                            <span className="text-green-400 text-xs">

                                                {game.size}

                                            </span>

                                        </div>

                                        <div className="flex items-center justify-between text-sm">

                                            <span className="text-orange-500 font-semibold">

                                                ⬇ {Number(game.downloads || 0).toLocaleString()}

                                            </span>

                                            <span className="text-zinc-400">

                                                v{game.version}

                                            </span>

                                        </div>

                                        <div className="flex items-center justify-between border-t border-zinc-800 pt-3">

                                            <span className="text-xs text-zinc-500">

                                                Updated Recently

                                            </span>

                                            <span className="rounded-lg bg-red-600 px-2 py-1 text-xs font-semibold">

                                                {game.mod_version}

                                            </span>

                                        </div>

                                    </div>

                                </Link>

                            ))}
                        </div>

                    )}

                    {/* Bottom CTA */}

                    <section className="mt-16 overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-r from-orange-600 via-red-600 to-purple-700 p-10">

                        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">

                            <div>

                                <h2 className="text-3xl font-black">

                                    Download the Best MOD APK Games

                                </h2>

                                <p className="mt-3 max-w-2xl text-white/80">

                                    Explore the most downloaded Android MOD APK games with
                                    unlimited money, unlocked premium features, latest versions,
                                    and blazing-fast downloads.

                                </p>

                            </div>

                            <Link
                                href="/recently-updated"
                                className="rounded-2xl bg-white px-8 py-4 text-lg font-bold text-black transition hover:scale-105"
                            >

                                Browse Latest Games →

                            </Link>

                        </div>

                    </section>

                </div>

            </main>

        </>

    );

}