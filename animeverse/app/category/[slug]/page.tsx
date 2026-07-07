import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function CategoryPage({
    params,
}: Props) {

    const { slug } = await params;

    const category = decodeURIComponent(slug);

    const { data: games } = await supabase
        .from("games")
        .select("*")
        .eq("category", category)
        .order("updated_at", { ascending: false });

    if (!games || games.length === 0) {
        notFound();
    }

    return (
        <>
            <Header />

            <main className="min-h-screen bg-[#090909] text-white">

                {/* Hero */}

                <section className="border-b border-zinc-800 bg-gradient-to-b from-zinc-900 to-[#090909]">

                    <div className="mx-auto max-w-7xl px-4 py-14">

                        <span className="rounded-full bg-orange-500/20 px-4 py-1 text-sm font-semibold text-orange-400">

                            🎮 Category

                        </span>

                        <h1 className="mt-5 text-5xl font-black">

                            {category} Games

                        </h1>

                        <p className="mt-4 text-zinc-400">

                            {games.length} MOD APK Games Available

                        </p>

                    </div>

                </section>

                <div className="mx-auto max-w-7xl px-4 py-10">

                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
                        {games.map((game) => (

                            <Link
                                key={game.id}
                                href={`/game/${game.slug}`}
                                className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/20"
                            >

                                {/* Banner */}

                                <div className="relative aspect-[3/4] overflow-hidden">

                                    <Image
                                        src={game.banner || game.icon}
                                        alt={game.title}
                                        fill
                                        sizes="(max-width:768px) 50vw,(max-width:1200px) 33vw,20vw"
                                        className="object-cover transition duration-500 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                                    <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">

                                        MOD APK

                                    </span>

                                    <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white backdrop-blur">

                                        ⭐ {game.rating || 5}

                                    </span>

                                </div>

                                {/* Content */}

                                <div className="p-4">

                                    <h2 className="line-clamp-2 text-lg font-bold transition group-hover:text-orange-500">

                                        {game.title}

                                    </h2>

                                    <p className="mt-2 line-clamp-2 text-sm text-zinc-400">

                                        {game.description}

                                    </p>

                                    <div className="mt-4 flex items-center justify-between">

                                        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs">

                                            v{game.version}

                                        </span>

                                        <span className="text-sm font-semibold text-green-500">

                                            {game.size}

                                        </span>

                                    </div>

                                    <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">

                                        <span>

                                            👁 {game.views || 0}

                                        </span>

                                        <span>

                                            ⬇ {game.downloads || 0}

                                        </span>

                                    </div>

                                </div>

                            </Link>

                        ))}
                    </div>

                    {/* Empty State */}

                    {games.length === 0 && (

                        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-700 py-24">

                            <div className="text-6xl">
                                🎮
                            </div>

                            <h2 className="mt-6 text-3xl font-black">

                                No Games Found

                            </h2>

                            <p className="mt-3 text-zinc-400">

                                There are currently no games in this category.

                            </p>

                            <Link
                                href="/categories"
                                className="mt-8 rounded-xl bg-orange-500 px-6 py-3 font-bold transition hover:bg-orange-600"
                            >

                                ← Back to Categories

                            </Link>

                        </div>

                    )}

                    {/* Bottom CTA */}

                    <section className="mt-16 rounded-3xl bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 p-10">

                        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">

                            <div>

                                <h2 className="text-3xl font-black">

                                    Looking for More MOD APK Games?

                                </h2>

                                <p className="mt-3 text-white/80">

                                    Explore our complete collection of the latest MOD APK games with unlimited money, premium unlocked features, and ad-free experience.

                                </p>

                            </div>

                            <Link
                                href="/categories"
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