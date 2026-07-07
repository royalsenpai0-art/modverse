import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import DescriptionSection from "@/components/DescriptionSection";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

// ================= SEO =================

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { slug } = await params;

    const { data: game } = await supabase
        .from("games")
        .select("*")
        .eq("slug", decodeURIComponent(slug))
        .single();

    if (!game) {
        return {
            title: "Game Not Found | MODVerse",
        };
    }

    return {
        title:
            game.seo_title ||
            `${game.title} MOD APK ${game.mod_version} Download`,

        description:
            game.seo_description ||
            game.description?.slice(0, 160),

        keywords:
            game.seo_keywords?.split(",") || [],

        openGraph: {
            title: game.title,
            description: game.description,
            images: [game.banner],
        },

        twitter: {
            card: "summary_large_image",
            title: game.title,
            description: game.description,
            images: [game.banner],
        },
    };
}

// ================= PAGE =================

export default async function GamePage({
    params,
}: Props) {

    const { slug } = await params;

    const { data: game } = await supabase
        .from("games")
        .select("*")
        .eq("slug", decodeURIComponent(slug))
        .single();

    if (!game) {
        notFound();
    }

    // Increase Views

    await supabase
        .from("games")
        .update({
            views: (game.views || 0) + 1,
        })
        .eq("id", game.id);

    // Related Games

    const { data: relatedGames } = await supabase
        .from("games")
        .select("*")
        .eq("category", game.category)
        .neq("id", game.id)
        .limit(6);

    return (
        <>
            <Header />

            <main className="min-h-screen bg-[#090909] text-white">

                {/* ================= HERO ================= */}

                <section className="relative overflow-hidden border-b border-zinc-800">

                    <div className="absolute inset-0">

                        <Image
                            src={game.banner || game.icon}
                            alt={game.title}
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover opacity-20 blur-sm"
                        />

                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#090909]/70 to-[#090909]" />

                    </div>

                    <div className="relative mx-auto max-w-7xl px-4 py-12 lg:py-16">

                        <Link
                            href="/"
                            className="mb-8 inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-5 py-3 font-semibold backdrop-blur transition hover:border-green-500 hover:bg-green-600"
                        >
                            ← Back to Home
                        </Link>

                        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
                            {/* ================= LEFT ================= */}

                            <div>

                                <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl">

                                    <div className="relative aspect-square">

                                        <Image
                                            src={game.icon || game.banner}
                                            alt={game.title}
                                            fill
                                            sizes="280px"
                                            className="object-cover"
                                        />

                                    </div>

                                </div>

                            </div>

                            {/* ================= RIGHT ================= */}

                            <div className="flex flex-col justify-center">

                                <div className="mb-4 flex flex-wrap gap-2">

                                    <span className="rounded-full bg-green-600 px-4 py-2 text-xs font-bold">

                                        MOD APK

                                    </span>

                                    <span className="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold">

                                        {game.category}

                                    </span>

                                    <span className="rounded-full bg-orange-500 px-4 py-2 text-xs font-bold">

                                        Version {game.version}

                                    </span>

                                </div>

                                <h1 className="text-4xl font-black leading-tight lg:text-6xl">

                                    {game.title}

                                </h1>

                                <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">

                                    {game.short_description ||
                                        game.description?.slice(0, 180)}

                                </p>

                                {/* ================= STATS ================= */}

                                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">

                                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

                                        <p className="text-sm text-zinc-400">

                                            Downloads

                                        </p>

                                        <h3 className="mt-2 text-xl font-bold">

                                            ⬇ {game.downloads || 0}

                                        </h3>

                                    </div>

                                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

                                        <p className="text-sm text-zinc-400">

                                            Views

                                        </p>

                                        <h3 className="mt-2 text-xl font-bold">

                                            👁 {game.views || 0}

                                        </h3>

                                    </div>

                                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

                                        <p className="text-sm text-zinc-400">

                                            Rating

                                        </p>

                                        <h3 className="mt-2 text-xl font-bold">

                                            ⭐ {game.rating || "5.0"}

                                        </h3>

                                    </div>

                                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

                                        <p className="text-sm text-zinc-400">

                                            APK Size

                                        </p>

                                        <h3 className="mt-2 text-xl font-bold">

                                            📦 {game.size}

                                        </h3>

                                    </div>

                                </div>

                                {/* ================= DOWNLOAD BUTTON ================= */}

                                <div className="mt-10">

                                    <Link
                                        href={`/download/${game.slug}`}
                                        className="inline-flex items-center rounded-2xl bg-green-600 px-8 py-4 text-lg font-bold transition hover:scale-105 hover:bg-green-500"
                                    >

                                        ⬇ Download MOD APK

                                    </Link>

                                </div>

                                {/* ================= ADVERTISEMENT ================= */}

                                <section className="mt-8 rounded-2xl border border-dashed border-zinc-700 bg-zinc-900 p-5">

                                    <p className="mb-3 text-center text-sm font-semibold text-zinc-500">

                                        Advertisement

                                    </p>

                                    <div className="flex min-h-[90px] items-center justify-center rounded-xl bg-zinc-800 text-zinc-500">

                                        {/* Adsterra / Monetag Banner Code Here */}

                                        728 × 90 Banner Ad

                                    </div>

                                </section>

                            </div>

                        </div>

                    </div>

                </section>
                {/* ================= MAIN CONTENT ================= */}

                <div className="mx-auto max-w-7xl px-4 py-14">

                    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

                        {/* ================= LEFT SIDE ================= */}

                        <div className="space-y-8">

                            {/* ================= GAME BANNER ================= */}


                            {/* ================= MOD FEATURES ================= */}

                            <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                                <h2 className="mb-8 text-3xl font-black">

                                    🚀 MOD Features

                                </h2>

                                <div className="space-y-4">

                                    {game.mod_features
                                        ?.split("\n")
                                        .filter(Boolean)
                                        .map((feature: string, index: number) => (

                                            <div
                                                key={index}
                                                className="flex items-center gap-4 border-b border-zinc-800 pb-4 last:border-none"
                                            >

                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 font-bold">

                                                    ✓

                                                </div>

                                                <span className="text-lg">

                                                    {feature}

                                                </span>

                                            </div>

                                        ))}

                                </div>

                            </section>

                            {/* ================= GAME INFORMATION ================= */}

                            <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                                <h2 className="mb-8 text-3xl font-black">

                                    📋 Game Information

                                </h2>

                                <div className="grid gap-5 md:grid-cols-2">

                                    <div className="flex justify-between border-b border-zinc-800 pb-3">
                                        <span className="text-zinc-400">Developer</span>
                                        <span>{game.developer}</span>
                                    </div>

                                    <div className="flex justify-between border-b border-zinc-800 pb-3">
                                        <span className="text-zinc-400">Publisher</span>
                                        <span>{game.publisher}</span>
                                    </div>

                                    <div className="flex justify-between border-b border-zinc-800 pb-3">
                                        <span className="text-zinc-400">Category</span>
                                        <span>{game.category}</span>
                                    </div>

                                    <div className="flex justify-between border-b border-zinc-800 pb-3">
                                        <span className="text-zinc-400">Latest Version</span>
                                        <span>{game.version}</span>
                                    </div>

                                    <div className="flex justify-between border-b border-zinc-800 pb-3">
                                        <span className="text-zinc-400">MOD Version</span>
                                        <span>{game.mod_version}</span>
                                    </div>

                                    <div className="flex justify-between border-b border-zinc-800 pb-3">
                                        <span className="text-zinc-400">Android</span>
                                        <span>{game.android}</span>
                                    </div>

                                    <div className="flex justify-between border-b border-zinc-800 pb-3">
                                        <span className="text-zinc-400">APK Size</span>
                                        <span>{game.size}</span>
                                    </div>

                                    <div className="flex justify-between border-b border-zinc-800 pb-3">
                                        <span className="text-zinc-400">Updated</span>
                                        <span>
                                            {new Date(game.updated_at).toLocaleDateString()}
                                        </span>
                                    </div>

                                </div>

                            </section>
                            {/* ================= RELATED GAMES ================= */}

                            {relatedGames && relatedGames.length > 0 && (

                                <section>

                                    <div className="mb-8 flex items-center justify-between">

                                        <h2 className="text-3xl font-black">

                                            🎮 Related Games

                                        </h2>

                                        <Link
                                            href={`/category/${encodeURIComponent(game.category)}`}
                                            className="font-semibold text-green-500 hover:text-green-400"
                                        >

                                            View All →

                                        </Link>

                                    </div>

                                    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">

                                        {relatedGames.map((item) => (

                                            <Link
                                                key={item.id}
                                                href={`/game/${item.slug}`}
                                                className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:border-green-500"
                                            >

                                                <div className="relative aspect-square">

                                                    <Image
                                                        src={item.icon || item.banner}
                                                        alt={item.title}
                                                        fill
                                                        sizes="200px"
                                                        className="object-cover"
                                                    />

                                                </div>

                                                <div className="p-4">

                                                    <h3 className="line-clamp-2 font-bold">

                                                        {item.title}

                                                    </h3>

                                                    <p className="mt-2 text-sm text-green-500">

                                                        Version {item.version}

                                                    </p>

                                                </div>

                                            </Link>

                                        ))}

                                    </div>

                                </section>

                            )}

                            {/* ================= DESCRIPTION ================= */}

                            <DescriptionSection
                                title="📝 Description"
                                text={game.description}
                            />

                        </div>

                        {/* ================= RIGHT SIDEBAR ================= */}

                        <aside className="space-y-8">

                            {/* Advertisement */}

                            <section className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-900 p-8 text-center">

                                <h3 className="mb-4 text-xl font-bold">

                                    📢 Advertisement

                                </h3>

                                <div className="flex h-[250px] items-center justify-center rounded-2xl bg-zinc-800 text-zinc-500">

                                    {/* Paste Adsterra / Monetag Banner Here */}

                                    300 × 250 Banner Ad

                                </div>

                            </section>

                            {/* Quick Info */}

                            <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                                <h2 className="mb-6 text-2xl font-black">

                                    ⚡ Quick Info

                                </h2>

                                <div className="space-y-4">

                                    <div className="flex justify-between">

                                        <span className="text-zinc-400">

                                            Views

                                        </span>

                                        <span>

                                            👁 {game.views || 0}

                                        </span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span className="text-zinc-400">

                                            Downloads

                                        </span>

                                        <span>

                                            ⬇ {game.downloads || 0}

                                        </span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span className="text-zinc-400">

                                            Rating

                                        </span>

                                        <span>

                                            ⭐ {game.rating || "5.0"}

                                        </span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span className="text-zinc-400">

                                            APK Size

                                        </span>

                                        <span>

                                            📦 {game.size}

                                        </span>

                                    </div>

                                </div>

                            </section>

                        </aside>

                    </div>
                    {/* ================= FAQ ================= */}

                    <section className="mt-14 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-8 text-3xl font-black">

                            ❓ Frequently Asked Questions

                        </h2>

                        <div className="space-y-5">

                            <details className="group rounded-2xl border border-zinc-800 bg-zinc-800 p-5">

                                <summary className="cursor-pointer list-none font-bold">

                                    Is this MOD APK safe?

                                </summary>

                                <p className="mt-4 leading-8 text-zinc-400">

                                    Yes. Every MOD APK uploaded on MODVerse is manually checked before publishing.

                                </p>

                            </details>

                            <details className="group rounded-2xl border border-zinc-800 bg-zinc-800 p-5">

                                <summary className="cursor-pointer list-none font-bold">

                                    Does this MOD APK require Root?

                                </summary>

                                <p className="mt-4 leading-8 text-zinc-400">

                                    No. This MOD APK works perfectly without Root.

                                </p>

                            </details>

                            <details className="group rounded-2xl border border-zinc-800 bg-zinc-800 p-5">

                                <summary className="cursor-pointer list-none font-bold">

                                    How do I update this game?

                                </summary>

                                <p className="mt-4 leading-8 text-zinc-400">

                                    Download the latest MOD APK from MODVerse and install it over your current version.

                                </p>

                            </details>

                        </div>

                    </section>

                    {/* ================= TAGS ================= */}

                    <section className="mt-14 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-6 text-3xl font-black">

                            🏷 Tags

                        </h2>

                        <div className="flex flex-wrap gap-3">

                            {game.seo_keywords
                                ?.split(",")
                                .filter(Boolean)
                                .map((tag: string, index: number) => (

                                    <span
                                        key={index}
                                        className="rounded-full border border-zinc-700 bg-zinc-800 px-5 py-3 text-sm transition hover:border-green-500"
                                    >

                                        #{tag.trim()}

                                    </span>

                                ))}

                        </div>

                    </section>

                </div>

            </main>

            {/* <Footer /> */}

        </>

    );

}