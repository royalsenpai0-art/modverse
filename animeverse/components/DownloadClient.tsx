"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface DownloadClientProps {
    downloadUrl: string;
    gameId: number;
}

export default function DownloadClient({
    downloadUrl,
    gameId,
}: DownloadClientProps) {
    const [time, setTime] = useState(10);
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (time <= 0) {
            setReady(true);
            return;
        }

        const timer = setTimeout(() => {
            setTime((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [time]);

    async function handleDownload() {
        if (loading) return;

        setLoading(true);

        try {
            const key = `download-${gameId}`;

            if (!localStorage.getItem(key)) {
                const { data } = await supabase
                    .from("games")
                    .select("downloads")
                    .eq("id", gameId)
                    .single();

                const currentDownloads = data?.downloads ?? 0;

                await supabase
                    .from("games")
                    .update({
                        downloads: currentDownloads + 1,
                    })
                    .eq("id", gameId);

                localStorage.setItem(key, "true");
            }
        } catch (error) {
            console.error(error);
        }

        // Monetag Direct Link
        window.open("https://omg10.com/4/11275829", "_blank");

        // APK Download (300ms baad)
        setTimeout(() => {
            window.location.href = downloadUrl;
        }, 300);

        setLoading(false);
    }

    return (
        <div className="mt-10 rounded-3xl border border-zinc-800 bg-[#111111] p-6 shadow-xl">

            <div className="mb-6 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-orange-500"></div>

                <h2 className="text-2xl font-black text-white">
                    Download
                </h2>
            </div>

            {!ready ? (
                <div className="text-center">

                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-orange-500 text-4xl font-black text-orange-500">
                        {time}
                    </div>

                    <p className="mt-6 text-zinc-400">
                        Please wait while we prepare your download...
                    </p>

                </div>
            ) : (
                <button
                    onClick={handleDownload}
                    disabled={loading}
                    className="flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-lg font-black text-white transition duration-300 hover:scale-105 disabled:opacity-60"
                >
                    {loading ? "Preparing..." : "📥 Download Now"}
                </button>
            )}

        </div>
    );
}