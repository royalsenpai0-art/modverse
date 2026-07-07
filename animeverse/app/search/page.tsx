import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;


    let games: any[] = [];

    if (q) {
        const { data } = await supabase
            .from("games")
            .select("*")
            .or(
                `title.ilike.%${q}%,developer.ilike.%${q}%,publisher.ilike.%${q}%,category.ilike.%${q}%`
            )
            .order("created_at", { ascending: false });

        const games = data || [];

        return (
            <main className="mx-auto max-w-7xl px-4 py-10">

                <h1 className="mb-8 text-3xl font-bold text-white">
                    Search Results
                </h1>

                <p className="mb-8 text-gray-400">
                    {games.length} result(s) found for{" "}
                    <span className="font-semibold text-orange-500">
                        "{q}"
                    </span>
                </p>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    {games.map((game) => (

                        <Link
                            key={game.id}
                            href={`/game/${game.slug}`}
                            className="overflow-hidden rounded-2xl border border-white/10 bg-[#151515] transition hover:border-orange-500"
                        >

                            <div className="relative aspect-[16/9]">

                                <Image
                                    src={game.banner || game.icon}
                                    alt={game.title}
                                    fill
                                    className="object-cover"
                                />

                            </div>

                            <div className="p-4">

                                <h2 className="line-clamp-1 text-lg font-bold text-white">
                                    {game.title}
                                </h2>

                                <p className="mt-2 text-sm text-gray-400">
                                    {game.version}
                                </p>

                            </div>

                        </Link>

                    ))}

                </div>

                {games.length === 0 && (

                    <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center">

                        <h2 className="text-2xl font-bold text-white">
                            No Games Found
                        </h2>

                        <p className="mt-3 text-gray-400">
                            Try another keyword.
                        </p>

                    </div>

                )}

            </main>
        );
    }
}