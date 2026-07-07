import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

type Props = {
    params: Promise<{
        genre: string;
    }>;
};

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { genre } = await params;
    const decodedGenre = decodeURIComponent(genre).trim();

    return {
        title: `${decodedGenre} Anime - Watch Online HD`,
        description: `Watch the best ${decodedGenre} Anime online in HD quality with Hindi, English and Japanese audio.`,
        alternates: {
            canonical: `http://localhost:3000/genre/${encodeURIComponent(
                decodedGenre
            )}`,
        },
    };
}

export default async function GenrePage({ params }: Props) {
    const { genre } = await params;

    const decodedGenre = decodeURIComponent(genre).trim();

    const { data: anime, error } = await supabase
        .from("anime")
        .select("*")
        .ilike("genre", decodedGenre)
        .order("created_at", { ascending: false });

    console.log("Genre:", decodedGenre);
    console.log("Error:", error);
    console.log("Anime:", anime);

    return (
        <>
            <Header />

            <main className="min-h-screen bg-[#0f0f0f] text-white">
                <div className="max-w-7xl mx-auto px-4 py-8">

                    <h1 className="text-4xl font-bold mb-2">
                        {decodedGenre} Anime
                    </h1>

                    <p className="text-zinc-400 mb-8">
                        {anime?.length ?? 0} Anime Found
                    </p>

                    {anime && anime.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">

                            {anime.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/anime/${item.slug}`}
                                    className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-red-600 transition"
                                >
                                    <div className="relative aspect-[3/4]">

                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width:768px) 50vw, (max-width:1200px) 25vw, 20vw"
                                            className="object-cover"
                                        />

                                    </div>

                                    <div className="p-3">

                                        <h2 className="font-bold line-clamp-2">
                                            {item.title}
                                        </h2>

                                        <p className="text-red-500 mt-2">
                                            Episode {item.episode}
                                        </p>

                                    </div>
                                </Link>
                            ))}

                        </div>
                    ) : (
                        <div className="text-center py-20">

                            <h2 className="text-3xl font-bold">
                                No Anime Found
                            </h2>

                            <p className="text-zinc-400 mt-3">
                                There are no anime in this genre.
                            </p>

                        </div>
                    )}

                </div>
            </main>
        </>
    );
}