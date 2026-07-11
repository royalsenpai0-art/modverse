import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default async function LatestPage() {

    const { data: games } = await supabase
        .from("games")
        .select("*")
        .eq("popular", true);

    return (
        <>
            <Header />

            <main className="min-h-screen bg-[#090909] text-white">

                {/* Hero */}

                <section className="border-b border-zinc-800 bg-gradient-to-b from-green-600/20 to-transparent">

                    <div className="mx-auto max-w-7xl px-4 py-14">

                        <Link
                            href="/"
                            className="mb-6 inline-flex rounded-xl border border-zinc-700 px-5 py-3 hover:border-green-500"
                        >
                            ← Back Home
                        </Link>

                        <h1 className="text-5xl font-black">
                            Popular Games
                        </h1>

                        <p className="mt-4 max-w-2xl text-zinc-400">
                            Browse the newest MOD APK games updated on MODVerse.
                        </p>

                        <div className="mt-8 inline-flex rounded-xl bg-green-600 px-6 py-3 font-bold">
                            {games?.length || 0} Games Available
                        </div>

                    </div>

                </section>

                {/* Games */}

                <section className="mx-auto max-w-7xl px-4 py-14">

                    <div className="space-y-4">

                        {(games ?? []).map((game) => (

                            <Link
                                key={game.id}
                                href={`/game/${game.slug}`}
                                className="group flex items-center gap-4 rounded-[24px] border border-zinc-800 bg-[#111111] p-4 transition-all duration-300 hover:border-orange-500 hover:bg-[#181818]"
                            >

                                {/* Icon */}

                                <Image
                                    src={game.icon}
                                    alt={game.title}
                                    width={90}
                                    height={90}
                                    className="h-[90px] w-[90px] rounded-[22px] border border-zinc-700 object-cover"
                                />

                                {/* Content */}

                                <div className="min-w-0 flex-1">

                                    <h2 className="line-clamp-2 text-xl font-black transition group-hover:text-orange-500">

                                        {game.title}

                                    </h2>

                                    <p className="mt-2 text-sm text-orange-500">

                                        ⭐ {game.rating || "5.0"} • {game.category}

                                    </p>

                                    <div className="mt-3 flex flex-wrap gap-2">

                                        <span className="rounded-lg bg-zinc-800 px-3 py-1 text-xs font-semibold">

                                            Version {game.version}

                                        </span>

                                        <span className="rounded-lg bg-zinc-800 px-3 py-1 text-xs font-semibold">

                                            {game.size}

                                        </span>

                                        <span className="rounded-lg bg-zinc-800 px-3 py-1 text-xs font-semibold text-green-400">

                                            MOD {game.mod_version}

                                        </span>

                                    </div>

                                    <p className="mt-3 text-xs text-zinc-500">

                                        Updated{" "}
                                        {game.updated_at
                                            ? new Date(game.updated_at).toLocaleDateString()
                                            : "Recently"}

                                    </p>

                                </div>

                                {/* Download Button */}

                                <div className="hidden md:block">

                                    <span className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-sm font-bold text-white transition group-hover:scale-105">

                                        Download

                                    </span>

                                </div>

                            </Link>

                        ))}

                    </div>
                </section>

            </main>

        </>
    );

}