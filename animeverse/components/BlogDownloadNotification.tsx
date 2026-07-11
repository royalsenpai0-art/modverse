"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, X } from "lucide-react";

interface Props {
    gameTitle: string;
    downloadUrl: string;
}

export default function BlogDownloadNotification({
    gameTitle,
    downloadUrl,
}: Props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    return (
        <div className="fixed bottom-5 left-5 z-[9999] animate-[slideUp_.4s_ease]">

            <div className="w-80 rounded-2xl border border-zinc-700 bg-[#111111] shadow-2xl">

                <div className="flex items-start gap-3 p-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500">

                        <Download className="text-white" size={22} />

                    </div>

                    <div className="flex-1">

                        <h3 className="font-black text-white">
                            Download MOD APK
                        </h3>

                        <p className="mt-1 text-sm text-zinc-400">
                            {gameTitle}
                        </p>

                        <Link
                            href={downloadUrl}
                            className="mt-3 inline-block rounded-xl bg-orange-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-600"
                        >
                            📥 Download Now
                        </Link>

                    </div>

                    <button
                        onClick={() => setShow(false)}
                        className="text-zinc-400 hover:text-white"
                    >
                        <X size={18} />
                    </button>

                </div>

            </div>

        </div>
    );
}