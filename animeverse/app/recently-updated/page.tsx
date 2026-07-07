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

                        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
                            {games.map((game) => (

                                <Link
                                    key={game.id}
                                    href={`/game/${game.slug}`}
                                    className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/20"
                                >

                                    {/* Image */}

                                    <div className="relative aspect-[3/4] overflow-hidden">

                                        <Image
                                            src={game.banner || game.icon}
                                            alt={game.title}
                                            fill
                                            sizes="(max-width:768px) 50vw,(max-width:1200px) 33vw,20vw"
                                            className="object-cover transition duration-500 group-hover:scale-110"
                                        />

                                        {/* Overlay */}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                        {/* MOD Badge */}

                                        <div className="absolute left-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-bold">

                                            MOD

                                        </div>

                                        {/* Version */}

                                        <div className="absolute right-3 top-3 rounded-full bg-orange-600 px-3 py-1 text-xs font-bold">

                                            v{game.version}

                                        </div>

                                        {/* Rating */}

                                        <div className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold backdrop-blur">

                                            ⭐ {game.rating || "5.0"}

                                        </div>

                                    </div>

                                    {/* Content */}

                                    <div className="space-y-3 p-4">

                                        <h2 className="line-clamp-2 text-lg font-bold transition group-hover:text-orange-500">

                                            {game.title}

                                        </h2>

                                        <div className="flex items-center justify-between">

                                            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">

                                                {game.category}

                                            </span>

                                            <span className="text-xs text-green-400">

                                                {game.size}

                                            </span>

                                        </div>

                                        <div className="flex items-center justify-between text-sm">

                                            <span className="text-zinc-400">

                                                ⬇ {game.downloads || 0}

                                            </span>

                                            <span className="text-orange-500">

                                                MOD {game.mod_version}

                                            </span>

                                        </div>

                                        <div className="border-t border-zinc-800 pt-3 text-xs text-zinc-500">

                                            Updated{" "}
                                            {game.updated_at
                                                ? new Date(game.updated_at).toLocaleDateString()
                                                : "Recently"}

                                        </div>

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