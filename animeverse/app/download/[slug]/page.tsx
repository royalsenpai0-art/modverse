import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DownloadClient from "@/components/DownloadClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import increaseDownload from "@/components/DownloadCounter";
import WhatsAppSticky from "@/components/WhatsAppSticky";

export default async function DownloadPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const { data: game } = await supabase
        .from("games")
        .select("*")
        .eq("slug", slug)
        .single();

    if (!game) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#090909] text-white">



                <h1 className="text-3xl font-black">
                    Download Not Found
                </h1>
            </main>
        );


    }
    const { data: relatedGames } = await supabase
        .from("games")
        .select("*")
        .eq("category", game.category)
        .neq("id", game.id)
        .limit(6);
    return (



        <main className="min-h-screen bg-[#090909] text-white">
            <Header />
            <Breadcrumb
                items={[
                    {
                        label: "Home",
                        href: "/",
                    },
                    {
                        label: game.category,
                        href: `/category/${encodeURIComponent(game.category)}`,
                    },
                    {
                        label: game.title,
                        href: `/game/${game.slug}`,
                    },
                    {
                        label: "Download",
                    },
                ]}
            />
            <section className="mx-auto max-w-5xl px-4 py-12">

                <div className="rounded-[32px] border border-zinc-800 bg-[#111111] p-8 shadow-2xl">

                    <div className="flex flex-col items-center text-center">

                        {/* Game Icon */}

                        <Image
                            src={game.icon}
                            alt={game.title}
                            width={150}
                            height={150}
                            className="rounded-[30px] border-4 border-orange-500 shadow-xl"
                        />

                        {/* Title */}

                        <h1 className="mt-6 text-3xl font-black leading-tight md:text-5xl">

                            {game.title}

                        </h1>

                        <p className="mt-3 text-orange-500">

                            ⭐ {game.rating || "5.0"} • {game.category}

                        </p>

                        {/* Info */}

                        <div className="mt-6 flex flex-wrap justify-center gap-3">

                            <span className="rounded-xl bg-zinc-800 px-4 py-2 text-sm font-semibold">

                                Version {game.version}

                            </span>

                            <span className="rounded-xl bg-zinc-800 px-4 py-2 text-sm font-semibold">

                                {game.size}

                            </span>

                            <span className="rounded-xl bg-zinc-800 px-4 py-2 text-sm font-semibold">

                                Android {game.android_version}

                            </span>

                        </div>
                        {/* Download Button */}

                        <div className="mt-8 w-full max-w-md">

                            <Link
                                href="#download-section"
                                className="flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-lg font-black text-white shadow-lg transition duration-300 hover:scale-[1.02]"
                            >
                                📥 Download MOD APK
                            </Link>

                        </div>

                        {/* Download Info */}

                        <p className="mt-4 text-sm text-zinc-400">

                            Latest Version • Fast Download • Safe & Verified

                        </p>

                    </div>

                </div>

            </section>

            {/* ================= FILE INFORMATION ================= */}

            <section
                id="download-section"
                className="mx-auto mt-8 max-w-5xl px-4"
            >

                <div className="rounded-[28px] border border-zinc-800 bg-[#111111] p-6">

                    <div className="mb-6 flex items-center gap-3">

                        <div className="h-8 w-1 rounded-full bg-orange-500" />

                        <h2 className="text-2xl font-black">

                            File Information

                        </h2>

                    </div>

                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                        <div className="rounded-2xl bg-[#181818] p-4 text-center">

                            <p className="text-xs uppercase text-zinc-500">

                                Version

                            </p>

                            <h3 className="mt-2 font-bold">

                                {game.version}

                            </h3>

                        </div>

                        <div className="rounded-2xl bg-[#181818] p-4 text-center">

                            <p className="text-xs uppercase text-zinc-500">

                                Size

                            </p>

                            <h3 className="mt-2 font-bold">

                                {game.size}

                            </h3>

                        </div>

                        <div className="rounded-2xl bg-[#181818] p-4 text-center">

                            <p className="text-xs uppercase text-zinc-500">

                                Android

                            </p>

                            <h3 className="mt-2 font-bold">

                                {game.android_version}

                            </h3>

                        </div>

                        <div className="rounded-2xl bg-[#181818] p-4 text-center">

                            <p className="text-xs uppercase text-zinc-500">

                                Updated

                            </p>

                            <h3 className="mt-2 break-words font-bold">

                                {game.updated_at || "Latest"}

                            </h3>

                        </div>

                    </div>
                </div>

            </section>

            {/* ================= COUNTDOWN ================= */}

            <section className="mx-auto mt-8 max-w-5xl px-4">

                <DownloadClient
                    downloadUrl={game.mod_link}
                    gameId={game.id}
                />

            </section>

            {/* ================= SAFE DOWNLOAD ================= */}

            <section className="mx-auto mt-8 max-w-5xl px-4">

                <div className="rounded-[28px] border border-green-600/40 bg-green-500/10 p-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 font-black text-white">

                            ✓

                        </div>

                        <h2 className="text-2xl font-black">

                            Safe Download

                        </h2>

                    </div>

                    <p className="mt-5 leading-8 text-zinc-300">

                        This file has been checked before publishing.
                        It is safe to download and regularly updated with
                        the latest version.

                    </p>

                </div>

            </section>

            {/* ================= HOW TO INSTALL ================= */}

            <section className="mx-auto mt-8 max-w-5xl px-4">

                <div className="rounded-[28px] border border-zinc-800 bg-[#111111] p-6">

                    <div className="mb-6 flex items-center gap-3">

                        <div className="h-8 w-1 rounded-full bg-orange-500" />

                        <h2 className="text-2xl font-black">

                            Installation Guide

                        </h2>

                    </div>

                    <div className="space-y-4">

                        <div className="rounded-xl bg-[#181818] p-4">

                            1. Download the APK file.

                        </div>

                        <div className="rounded-xl bg-[#181818] p-4">

                            2. Enable "Install Unknown Apps".

                        </div>

                        <div className="rounded-xl bg-[#181818] p-4">

                            3. Install the APK normally.

                        </div>

                        <div className="rounded-xl bg-[#181818] p-4">

                            4. Open the game and enjoy.

                        </div>

                    </div>

                </div>

            </section>
            {/* ================= RELATED GAMES ================= */}

            <section className="mx-auto mt-10 max-w-5xl px-4">

                <div className="mb-6 flex items-center gap-3">

                    <div className="h-8 w-1 rounded-full bg-orange-500" />

                    <h2 className="text-2xl font-black">

                        Related Games

                    </h2>

                </div>

                <div className="space-y-4">

                    {relatedGames?.map((item) => (

                        <Link
                            key={item.id}
                            href={`/game/${item.slug}`}
                            className="group flex items-center gap-4 rounded-[24px] border border-zinc-800 bg-[#111111] p-4 transition-all duration-300 hover:border-orange-500 hover:bg-[#181818]"
                        >

                            <Image
                                src={item.icon}
                                alt={item.title}
                                width={80}
                                height={80}
                                className="rounded-2xl border border-zinc-700"
                            />

                            <div className="min-w-0 flex-1">

                                <h3 className="line-clamp-2 text-lg font-black">

                                    {item.title}

                                </h3>

                                <p className="mt-2 text-sm text-orange-500">

                                    ⭐ {item.rating || "5.0"} • {item.category}

                                </p>

                                <div className="mt-3 flex flex-wrap gap-2">

                                    <span className="rounded-lg bg-zinc-800 px-3 py-1 text-xs font-semibold">

                                        v{item.version}

                                    </span>

                                    <span className="rounded-lg bg-zinc-800 px-3 py-1 text-xs font-semibold">

                                        {item.size}

                                    </span>

                                </div>

                            </div>

                            <div className="hidden sm:block rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3 text-sm font-bold text-white">

                                View

                            </div>

                        </Link>

                    ))}

                </div>

            </section>
            {/* ================= FAQ ================= */}

            <section className="mx-auto mt-10 max-w-5xl px-4">

                <div className="mb-6 flex items-center gap-3">

                    <div className="h-8 w-1 rounded-full bg-orange-500" />

                    <h2 className="text-2xl font-black">

                        Frequently Asked Questions

                    </h2>

                </div>

                <div className="space-y-4">

                    <details className="rounded-2xl border border-zinc-800 bg-[#111111] p-5">

                        <summary className="cursor-pointer text-lg font-bold">
                            Is this APK safe?
                        </summary>

                        <p className="mt-4 leading-7 text-zinc-400">
                            Yes. Every APK is verified before publishing to help provide a safe download experience.
                        </p>

                    </details>

                    <details className="rounded-2xl border border-zinc-800 bg-[#111111] p-5">

                        <summary className="cursor-pointer text-lg font-bold">
                            Is this MOD APK free?
                        </summary>

                        <p className="mt-4 leading-7 text-zinc-400">
                            Yes. You can download this MOD APK completely free.
                        </p>

                    </details>

                    <details className="rounded-2xl border border-zinc-800 bg-[#111111] p-5">

                        <summary className="cursor-pointer text-lg font-bold">
                            Why is there a countdown?
                        </summary>

                        <p className="mt-4 leading-7 text-zinc-400">
                            The countdown prepares your download link and helps improve the download experience.
                        </p>

                    </details>

                </div>

            </section>

            {/* ================= SUPPORT ================= */}

            <section className="mx-auto mt-10 mb-20 max-w-5xl px-4">

                <div className="rounded-[28px] bg-gradient-to-r from-orange-500 to-red-500 p-8 text-center">

                    <h2 className="text-3xl font-black text-white">

                        Enjoy Your Game!

                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-orange-100">

                        Thank you for downloading from our website.
                        We regularly update games with the latest MOD versions.

                    </p>

                    <Link
                        href="/"
                        className="mt-8 inline-flex h-12 items-center justify-center rounded-2xl bg-white px-8 font-bold text-orange-600 transition hover:scale-105"
                    >
                        Browse More Games
                    </Link>

                </div>

            </section>
            <WhatsAppSticky />
            
            <Footer />

        </main>

    );
}
