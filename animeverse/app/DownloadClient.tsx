"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Game = {
    id: number;
    slug: string;
    title: string;
    icon: string;
    version: string;
    size: string;
    android_version: string;
    mod_link: string;
};

type Props = {
    game: Game;
    relatedGames?: Game[];
};

export default function DownloadClient({
    game,
    relatedGames = [],
}: Props) {

    const TOTAL_SECONDS = 15;

    const [seconds, setSeconds] = useState(TOTAL_SECONDS);

    const [ready, setReady] = useState(false);

    useEffect(() => {

        if (ready) return;

        const timer = setInterval(() => {

            setSeconds((prev) => {

                if (prev <= 1) {

                    clearInterval(timer);

                    setReady(true);

                    return 0;

                }

                return prev - 1;

            });

        }, 1000);

        return () => clearInterval(timer);

    }, [ready]);

    async function handleDownload() {

        try {

            await fetch("/api/download", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                },

                body: JSON.stringify({

                    id: game.id,

                }),

            });

        } catch (err) {

            console.error(err);

        }

        window.location.href = game.mod_link;

    }

    const progress =
        ((TOTAL_SECONDS - seconds) / TOTAL_SECONDS) * 100;

    return (

        <main className="min-h-screen bg-[#0d1117] text-white">

            {/* HERO */}

            <section className="border-b border-zinc-800 bg-gradient-to-b from-green-600/20 to-transparent">

                <div className="mx-auto max-w-5xl px-5 py-12">

                    <Link
                        href={`/game/${game.slug}`}
                        className="inline-flex rounded-xl border border-zinc-700 px-5 py-2 text-sm transition hover:border-green-500"
                    >
                        ← Back
                    </Link>

                    <div className="mt-10 flex flex-col items-center">

                        <Image
                            src={game.icon}
                            alt={game.title}
                            width={130}
                            height={130}
                            priority
                            className="rounded-[28px] border-4 border-green-500 shadow-2xl"
                        />

                        <h1 className="mt-6 text-center text-3xl font-black md:text-5xl">

                            {game.title}

                        </h1>

                        <div className="mt-5 flex flex-wrap justify-center gap-3">

                            <span className="rounded-full bg-green-600 px-5 py-2">

                                Version {game.version}

                            </span>

                            <span className="rounded-full bg-zinc-800 px-5 py-2">

                                {game.size}

                            </span>

                        </div>

                    </div>

                </div>

            </section>

            {/* COUNTDOWN */}

            <section className="mx-auto max-w-4xl px-5 py-10">

                <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center">

                    <h2 className="text-3xl font-black">

                        Preparing Secure Download

                    </h2>

                    <p className="mt-3 text-zinc-400">

                        Please wait while your download link is unlocked.

                    </p>

                    <div className="mt-8 flex justify-center">

                        <div className="flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-green-500 text-5xl font-black">

                            {ready ? "✓" : seconds}

                        </div>

                    </div>

                    <div className="mx-auto mt-8 max-w-xl overflow-hidden rounded-full bg-zinc-800">

                        <div
                            className="h-3 bg-green-500 transition-all duration-1000"
                            style={{
                                width: `${progress}%`,
                            }}
                        />

                    </div>
                    <div className="mt-10">

                        {ready ? (

                            <button
                                onClick={handleDownload}
                                className="w-full rounded-2xl bg-green-600 py-5 text-xl font-black transition hover:bg-green-500"
                            >
                                ⬇ Download MOD APK
                            </button>

                        ) : (

                            <button
                                disabled
                                className="w-full cursor-not-allowed rounded-2xl bg-zinc-700 py-5 text-xl font-black opacity-70"
                            >
                                Wait {seconds}s...
                            </button>

                        )}

                    </div>

                    {/* Banner Ad */}

                    <div className="mt-8 overflow-hidden rounded-2xl border border-dashed border-zinc-700 bg-zinc-950 p-8">

                        <h3 className="text-xl font-bold">

                            Advertisement

                        </h3>

                        <div className="mt-5 flex h-[90px] items-center justify-center rounded-xl bg-zinc-800 text-zinc-500">

                            Google AdSense 728 × 90

                        </div>

                    </div>

                </div>

            </section>

            {/* HOW TO DOWNLOAD */}

            <section className="mx-auto max-w-4xl px-5 pb-10">

                <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                    <h2 className="mb-8 text-3xl font-black">

                        📥 How to Download

                    </h2>

                    <div className="space-y-6">

                        <div className="flex gap-4">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-black">

                                1

                            </div>

                            <p className="text-zinc-300">

                                Wait until the countdown finishes.

                            </p>

                        </div>

                        <div className="flex gap-4">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-black">

                                2

                            </div>

                            <p className="text-zinc-300">

                                Tap the <strong>Download MOD APK</strong> button.

                            </p>

                        </div>

                        <div className="flex gap-4">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-black">

                                3

                            </div>

                            <p className="text-zinc-300">

                                Your download will start automatically.

                            </p>

                        </div>

                        <div className="flex gap-4">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-black">

                                4

                            </div>

                            <p className="text-zinc-300">

                                Install the APK and enjoy the game.

                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* REQUIREMENTS */}

            <section className="mx-auto max-w-4xl px-5 pb-10">

                <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                    <h2 className="mb-8 text-3xl font-black">

                        📱 Requirements

                    </h2>

                    <div className="overflow-hidden rounded-2xl border border-zinc-800">

                        <table className="w-full">

                            <tbody>

                                <tr className="border-b border-zinc-800">

                                    <td className="bg-zinc-800 px-5 py-4 font-semibold">

                                        Android

                                    </td>

                                    <td className="px-5 py-4">

                                        {game.android_version}

                                    </td>

                                </tr>

                                <tr className="border-b border-zinc-800">

                                    <td className="bg-zinc-800 px-5 py-4 font-semibold">

                                        Version

                                    </td>

                                    <td className="px-5 py-4">

                                        {game.version}

                                    </td>

                                </tr>

                                <tr className="border-b border-zinc-800">

                                    <td className="bg-zinc-800 px-5 py-4 font-semibold">

                                        File Size

                                    </td>

                                    <td className="px-5 py-4">

                                        {game.size}

                                    </td>

                                </tr>

                                <tr>

                                    <td className="bg-zinc-800 px-5 py-4 font-semibold">

                                        Internet

                                    </td>

                                    <td className="px-5 py-4">

                                        Optional

                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </section>
            {/* RELATED GAMES */}

            {relatedGames.length > 0 && (

                <section className="mx-auto max-w-6xl px-5 pb-14">

                    <h2 className="mb-8 text-3xl font-black">

                        🎮 Related Games

                    </h2>

                    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">

                        {relatedGames.map((item) => (

                            <Link
                                key={item.id}
                                href={`/game/${item.slug}`}
                                className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all hover:-translate-y-1 hover:border-green-500"
                            >

                                <div className="relative aspect-square overflow-hidden">

                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width:768px)50vw,20vw"
                                        className="object-cover transition duration-300 group-hover:scale-105"
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

        </main>

    );

}