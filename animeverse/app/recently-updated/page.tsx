import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

export default async function RecentlyUpdatedPage() {

    const { data: games, error } = await supabase
        .from("games")
        .select("*")
        .order("updated_at", { ascending: false });

    if (error) {
        console.log(error);
    }

    return (
        <>
            <Header />

            <main className="min-h-screen bg-[#090909] text-white">

                {/* Hero */}

                <section className="border-b border-zinc-800 bg-gradient-to-b from-zinc-900 to-[#090909]">

                    <div className="mx-auto max-w-7xl px-4 py-14">

                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                            <div>

                                <span className="rounded-full bg-orange-500/20 px-4 py-1 text-sm font-semibold text-orange-400">

                                    🔥 Latest Updates

                                </span>

                                <h1 className="mt-4 text-4xl font-black md:text-5xl">

                                    Recently Updated Games

                                </h1>

                                <p className="mt-3 max-w-2xl text-zinc-400">

                                    Download the newest MOD APK Games updated with
                                    latest versions, bug fixes and unlocked premium features.

                                </p>

                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-5">

                                <p className="text-sm text-zinc-500">

                                    Total Updated Games

                                </p>

                                <h2 className="mt-2 text-4xl font-black text-orange-500">

                                    {games?.length || 0}

                                </h2>

                            </div>

                        </div>

                    </div>

                </section>

                <div className="mx-auto max-w-7xl px-4 py-10">

                    {!games || games.length === 0 ? (

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 py-20 text-center">

                            <h2 className="text-3xl font-bold">

                                No Games Found

                            </h2>

                            <p className="mt-4 text-zinc-400">

                                There are no recently updated games available.

                            </p>

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {games.map((game) => (

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

                    )}

                    {/* Bottom CTA */}

                    <section className="mt-16 overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-r from-orange-600 via-red-600 to-purple-700 p-10">

                        <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">

                            <div>

                                <h2 className="text-3xl font-black">

                                    Looking for More MOD APK Games?

                                </h2>

                                <p className="mt-3 max-w-2xl text-white/80">

                                    Browse hundreds of premium MOD APK games with unlimited money,
                                    unlocked features, no ads and the latest updates.

                                </p>

                            </div>


                            <Link href="/categories"
                                className="rounded-2xl bg-white px-8 py-4 text-lg font-bold text-black transition hover:scale-105"
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