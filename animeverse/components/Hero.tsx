"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search, Flame } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Game {
    id: number;
    title: string;
    slug: string;
    icon: string;
    category: string;
}

export default function Hero() {

    const router = useRouter();

    const searchRef = useRef<HTMLDivElement>(null);

    const [query, setQuery] = useState("");

    const [loading, setLoading] = useState(false);

    const [results, setResults] = useState<Game[]>([]);

    const [showDropdown, setShowDropdown] = useState(false);

    function handleSearch() {

        if (!query.trim()) return;

        router.push(`/search?query=${encodeURIComponent(query.trim())}`);

    }

    useEffect(() => {

        const timer = setTimeout(async () => {

            if (query.trim().length < 2) {

                setResults([]);

                return;

            }

            setLoading(true);

            const { data } = await supabase

                .from("games")

                .select("id,title,slug,icon,category")

                .ilike("title", `%${query}%`)

                .limit(6);

            setResults(data || []);

            setLoading(false);

            setShowDropdown(true);

        }, 250);

        return () => clearTimeout(timer);

    }, [query]);

    useEffect(() => {

        function outside(e: MouseEvent) {

            if (
                searchRef.current &&
                !searchRef.current.contains(e.target as Node)
            ) {

                setShowDropdown(false);

            }

        }

        document.addEventListener("mousedown", outside);

        return () =>
            document.removeEventListener("mousedown", outside);

    }, []);

    return (

        <section className="relative overflow-hidden border-b border-zinc-800 bg-[#090909]">

            {/* Background */}

            <div className="absolute inset-0">

                <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-orange-500/15 blur-[140px]" />

                <div className="absolute -left-32 bottom-0 h-[220px] w-[220px] rounded-full bg-orange-500/10 blur-[110px]" />

                <div className="absolute right-0 top-10 h-[240px] w-[240px] rounded-full bg-yellow-500/10 blur-[120px]" />

            </div>

            <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 py-16 text-center">

                <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2">

                    <Flame size={16} className="text-orange-400" />

                    <span className="text-sm font-bold text-orange-400">

                        Updated Every Day

                    </span>

                </div>

                <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-6xl">

                    Best

                    <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">

                        MOD APK

                    </span>

                    Games & Apps

                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">

                    Download Premium Android MOD APK Games with
                    Unlimited Money, Premium Unlocked,
                    No Ads and many more amazing features.

                </p>

                <div
                    ref={searchRef}
                    className="relative mt-8 w-full max-w-3xl"
                >

                    <div className="flex overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => {
                                if (results.length) setShowDropdown(true);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                            placeholder="Search Games, Apps..."
                            className="flex-1 bg-transparent px-6 py-5 text-base text-white placeholder:text-zinc-500 outline-none"
                        />

                        <button
                            onClick={handleSearch}
                            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 px-8 font-bold text-white transition hover:from-orange-600 hover:to-orange-700"
                        >
                            <Search size={20} />
                            Search
                        </button>

                    </div>

                    {/* Live Search */}

                    {showDropdown && (

                        <div className="absolute left-0 right-0 top-[76px] z-50 overflow-hidden rounded-2xl border border-zinc-800 bg-[#111111] shadow-2xl">

                            {loading && (

                                <div className="px-6 py-5 text-center text-zinc-400">

                                    Searching...

                                </div>

                            )}

                            {!loading && results.length === 0 && query.length >= 2 && (

                                <div className="px-6 py-5 text-center text-zinc-500">

                                    No Games Found

                                </div>

                            )}

                            {!loading &&
                                results.map((game) => (

                                    <Link
                                        key={game.id}
                                        href={`/game/${game.slug}`}
                                        onClick={() => setShowDropdown(false)}
                                        className="flex items-center gap-4 border-b border-zinc-800 px-5 py-4 transition hover:bg-zinc-900"
                                    >

                                        <img
                                            src={game.icon || "/placeholder.png"}
                                            alt={game.title}
                                            className="h-14 w-14 rounded-xl object-cover"
                                        />

                                        <div className="flex-1 text-left">

                                            <h3 className="font-bold text-white">

                                                {game.title}

                                            </h3>

                                            <p className="mt-1 text-sm text-orange-400">

                                                {game.category}

                                            </p>

                                        </div>

                                    </Link>

                                ))}

                        </div>

                    )}

                </div>

                {/* Top Searches */}

                <div className="mt-8">

                    <p className="mb-4 text-xs font-bold uppercase tracking-[4px] text-zinc-500">

                        Top Searches

                    </p>

                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            "Among Us",
                            "Frag Pro Shooter",
                            "Subway Surfers",
                            "Minecraft",
                            "PVZ Fusion",
                            "Stumble Guys",
                            "Free Fire",
                            "Chicken Gun",
                        ].map((game) => (

                            <Link
                                key={game}
                                href={`/search?query=${encodeURIComponent(game)}`}
                                className="rounded-full border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-semibold text-zinc-300 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                            >

                                {game}

                            </Link>

                        ))}

                    </div>

                </div>

                {/* Bottom Text */}

                <p className="mt-8 text-sm text-zinc-500">

                    ✔ Safe Downloads &nbsp; • &nbsp;
                    ✔ Daily Updates &nbsp; • &nbsp;
                    ✔ Premium MOD APK

                </p>

            </div>

        </section>

    );

}