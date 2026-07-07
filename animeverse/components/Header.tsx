"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
    Search,
    Menu,
    X,
    ChevronDown,
    Flame,
    Clock3,
    Newspaper,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Game = {
    id: number;
    title: string;
    slug: string;
    icon: string;
    banner: string;
    version: string;
    category: string;
};

const categories = [
    { name: "Action", icon: "⚔️" },
    { name: "Adventure", icon: "🗺️" },
    { name: "Arcade", icon: "🕹️" },
    { name: "Puzzle", icon: "🧩" },
    { name: "Racing", icon: "🏎️" },
    { name: "RPG", icon: "🛡️" },
    { name: "Sports", icon: "⚽" },
    { name: "Simulation", icon: "🚜" },
    { name: "Strategy", icon: "♟️" },
    { name: "Casual", icon: "🎲" },
];

export default function Header() {

    const [mobileMenu, setMobileMenu] = useState(false);

    const [categoryOpen, setCategoryOpen] = useState(false);

    const [mobileSearch, setMobileSearch] = useState(false);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);

    const [results, setResults] = useState<Game[]>([]);

    const categoryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        function close(e: MouseEvent) {

            if (
                categoryRef.current &&
                !categoryRef.current.contains(e.target as Node)
            ) {

                setCategoryOpen(false);

            }

        }

        document.addEventListener("mousedown", close);

        return () =>
            document.removeEventListener("mousedown", close);

    }, []);

    useEffect(() => {

        if (search.trim().length < 2) {

            setResults([]);

            return;

        }

        const timer = setTimeout(async () => {

            setLoading(true);

            const { data } = await supabase

                .from("games")

                .select("id,title,slug,icon,banner,version,category")

                .ilike("title", `%${search}%`)

                .limit(6);

            setResults(data || []);

            setLoading(false);

        }, 250);

        return () => clearTimeout(timer);

    }, [search]);

    return (

        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090909]/95 backdrop-blur-xl">

            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
                {/* ================= LOGO ================= */}

                <Link href="/" className="flex items-center gap-3">

                    <Image
                        src="/logo.png"
                        alt="MODVerse"
                        width={48}
                        height={48}
                        priority
                        className="rounded-xl"
                    />

                    <div>

                        <h1 className="text-2xl font-black tracking-wide">

                            <span className="text-white">
                                MOD
                            </span>

                            <span className="text-orange-500">
                                Verse
                            </span>

                        </h1>

                        <p className="text-xs tracking-widest text-zinc-400">
                            PREMIUM MOD APK
                        </p>

                    </div>

                </Link>
                {/* ================= DESKTOP NAVIGATION ================= */}

                <nav className="hidden items-center gap-8 lg:flex">

                    <Link
                        href="/"
                        className="font-semibold text-white transition hover:text-orange-400"
                    >
                        Home
                    </Link>

                    {/* Categories */}

                    <div
                        className="relative"
                        ref={categoryRef}
                    >

                        <button
                            onClick={() =>
                                setCategoryOpen(!categoryOpen)
                            }
                            className="flex items-center gap-1 font-semibold text-white transition hover:text-orange-400"
                        >

                            Categories

                            <ChevronDown
                                size={18}
                                className={`transition ${categoryOpen
                                    ? "rotate-180"
                                    : ""
                                    }`}
                            />

                        </button>

                        {categoryOpen && (

                            <div className="absolute left-0 top-14 w-72 overflow-hidden rounded-2xl border border-zinc-800 bg-[#111111] shadow-2xl">

                                {categories.map((item) => (

                                    <Link
                                        key={item.name}
                                        href={`/category/${encodeURIComponent(item.name)}`}
                                        onClick={() =>
                                            setCategoryOpen(false)
                                        }
                                        className="flex items-center gap-4 px-5 py-4 text-white transition hover:bg-orange-500/10 hover:text-orange-400"
                                    >

                                        <span className="text-2xl">

                                            {item.icon}

                                        </span>

                                        <span className="font-medium">

                                            {item.name}

                                        </span>

                                    </Link>

                                ))}

                            </div>

                        )}

                    </div>

                    <Link
                        href="/recently-updated"
                        className="flex items-center gap-2 font-semibold text-white transition hover:text-orange-400"
                    >

                        <Clock3 size={17} />

                        Recently Updated

                    </Link>

                    <Link
                        href="/top-downloads"
                        className="flex items-center gap-2 font-semibold text-white transition hover:text-orange-400"
                    >

                        <Flame size={17} />

                        Top Downloads

                    </Link>

                    <Link
                        href="/blog"
                        className="flex items-center gap-2 font-semibold text-white transition hover:text-orange-400"
                    >

                        <Newspaper size={17} />

                        Blog

                    </Link>

                </nav>

                {/* ================= RIGHT SIDE ================= */}

                <div className="flex items-center gap-3">
                    {/* ================= DESKTOP SEARCH ================= */}

                    <div className="relative hidden lg:block">

                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search MOD APK Games..."
                            className="h-12 w-80 rounded-2xl border border-zinc-700 bg-[#151515] pl-11 pr-10 text-white placeholder:text-zinc-500 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                        />

                        {loading && (

                            <div className="absolute right-4 top-1/2 -translate-y-1/2">

                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-orange-500 border-t-transparent"></div>

                            </div>

                        )}

                        {search.length > 1 && (

                            <div className="absolute top-14 left-0 w-full overflow-hidden rounded-2xl border border-zinc-700 bg-[#111111] shadow-2xl">

                                {!loading && results.length === 0 && (

                                    <div className="p-5 text-center text-zinc-400">

                                        No games found 😔

                                    </div>

                                )}

                                {results.map((game) => (

                                    <Link
                                        key={game.id}
                                        href={`/game/${game.slug}`}
                                        onClick={() => {
                                            setSearch("");
                                            setResults([]);
                                        }}
                                        className="flex items-center gap-3 border-b border-zinc-800 p-3 transition hover:bg-orange-500/10"
                                    >

                                        <img
                                            src={game.icon || game.banner}
                                            alt={game.title}
                                            className="h-14 w-14 rounded-xl object-cover"
                                        />

                                        <div className="flex-1">

                                            <h3 className="font-bold text-white">

                                                {game.title}

                                            </h3>

                                            <p className="text-sm text-orange-400">

                                                {game.category}

                                            </p>

                                            <p className="text-xs text-zinc-500">

                                                Version {game.version}

                                            </p>

                                        </div>

                                    </Link>

                                ))}

                            </div>

                        )}

                    </div>

                    {/* ================= MOBILE SEARCH ================= */}

                    <button
                        onClick={() =>
                            setMobileSearch(!mobileSearch)
                        }
                        className="rounded-xl border border-zinc-700 bg-[#151515] p-3 text-white transition hover:border-orange-500 lg:hidden"
                    >

                        <Search size={20} />

                    </button>

                    {/* ================= MOBILE MENU ================= */}

                    <button
                        onClick={() =>
                            setMobileMenu(!mobileMenu)
                        }
                        className="rounded-xl border border-zinc-700 bg-[#151515] p-3 text-white transition hover:border-orange-500 lg:hidden"
                    >

                        {mobileMenu ? (
                            <X size={22} />
                        ) : (
                            <Menu size={22} />
                        )}

                    </button>

                </div>

            </div>

            {/* ================= MOBILE SEARCH BAR ================= */}

            {mobileSearch && (

                <div className="border-t border-zinc-800 bg-[#090909] px-4 py-4 lg:hidden">

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search MOD APK Games..."
                            className="h-12 w-full rounded-2xl border border-zinc-700 bg-[#151515] pl-11 pr-4 text-white placeholder:text-zinc-500 outline-none focus:border-orange-500"
                        />

                    </div>
                    {/* ================= MOBILE SEARCH RESULTS ================= */}

                    {search.length > 1 && (

                        <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-700 bg-[#111111]">

                            {loading && (

                                <div className="flex items-center justify-center p-5">

                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-orange-500 border-t-transparent"></div>

                                </div>

                            )}

                            {!loading && results.length === 0 && (

                                <div className="p-5 text-center text-zinc-400">

                                    No games found 😔

                                </div>

                            )}

                            {results.map((game) => (

                                <Link
                                    key={game.id}
                                    href={`/game/${game.slug}`}
                                    onClick={() => {
                                        setMobileSearch(false);
                                        setSearch("");
                                        setResults([]);
                                    }}
                                    className="flex items-center gap-3 border-b border-zinc-800 p-3 transition hover:bg-orange-500/10"
                                >

                                    <img
                                        src={game.icon || game.banner}
                                        alt={game.title}
                                        className="h-14 w-14 rounded-xl object-cover"
                                    />

                                    <div className="flex-1">

                                        <h3 className="font-bold text-white">

                                            {game.title}

                                        </h3>

                                        <p className="text-sm text-orange-400">

                                            {game.category}

                                        </p>

                                        <p className="text-xs text-zinc-500">

                                            Version {game.version}

                                        </p>

                                    </div>

                                </Link>

                            ))}

                        </div>

                    )}

                </div>

            )}

            {/* ================= MOBILE MENU ================= */}

            {mobileMenu && (

                <div className="border-t border-zinc-800 bg-[#090909] lg:hidden">

                    <div className="space-y-2 px-4 py-5">

                        <Link
                            href="/"
                            onClick={() => setMobileMenu(false)}
                            className="block rounded-xl px-4 py-3 font-medium text-white transition hover:bg-orange-500/10 hover:text-orange-400"
                        >
                            🏠 Home
                        </Link>

                        <div className="rounded-2xl border border-zinc-800">

                            <div className="border-b border-zinc-800 px-4 py-3 font-bold text-orange-400">

                                📂 Categories

                            </div>

                            {categories.map((item) => (

                                <Link
                                    key={item.name}
                                    href={`/category/${encodeURIComponent(item.name)}`}
                                    onClick={() => setMobileMenu(false)}
                                    className="flex items-center gap-3 px-4 py-3 text-white transition hover:bg-orange-500/10 hover:text-orange-400"
                                >

                                    <span className="text-xl">

                                        {item.icon}

                                    </span>

                                    <span>

                                        {item.name}

                                    </span>

                                </Link>

                            ))}

                        </div>

                        <Link
                            href="/recently-updated"
                            onClick={() => setMobileMenu(false)}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-white transition hover:bg-orange-500/10 hover:text-orange-400"
                        >

                            <Clock3 size={18} />

                            Recently Updated

                        </Link>

                        <Link
                            href="/top-downloads"
                            onClick={() => setMobileMenu(false)}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-white transition hover:bg-orange-500/10 hover:text-orange-400"
                        >

                            <Flame size={18} />

                            Top Downloads

                        </Link>

                        <Link
                            href="/blog"
                            onClick={() => setMobileMenu(false)}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-white transition hover:bg-orange-500/10 hover:text-orange-400"
                        >

                            <Newspaper size={18} />

                            Blog

                        </Link>

                    </div>

                </div>

            )}
        </header>

    );

}