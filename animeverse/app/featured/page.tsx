import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default async function LatestPage() {

    const { data: games } = await supabase
        .from("games")
        .select("*")
        .eq("featured", true);

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
                            Featured Games
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

                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">

                        {games?.map((game) => (

                            <Link
                                key={game.id}
                                href={`/game/${game.slug}`}
                                className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:border-green-500"
                            >

                                <div className="flex justify-center pt-6">
                                    <Image
                                        src={game.icon}
                                        alt={game.title}
                                        width={90}
                                        height={90}
                                        className="rounded-3xl border border-zinc-700 object-cover"
                                    />
                                </div>

                                <div className="p-5 text-center">

                                    <h2 className="mt-4 line-clamp-2 text-lg font-bold">

                                        {game.title}

                                    </h2>

                                    <p className="mt-2 text-sm text-zinc-400">

                                        {game.category}

                                    </p>

                                    <div className="mt-4 flex items-center justify-between">

                                        <span className="rounded-lg bg-green-600 px-3 py-1 text-xs font-bold">

                                            MOD

                                        </span>

                                        <span className="text-sm text-zinc-400">

                                            {game.version}

                                        </span>

                                    </div>

                                </div>

                            </Link>

                        ))}

                    </div>

                </section>

            </main>

        </>
    );

}