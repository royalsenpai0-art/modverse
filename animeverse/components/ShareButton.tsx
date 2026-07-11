"use client";
import toast from "react-hot-toast";

export default function ShareButtons({ title }: { title: string }) {

    async function shareGame() {

        const url = window.location.href;

        if (navigator.share) {

            try {

                await navigator.share({
                    title,
                    text: `Download ${title} MOD APK`,
                    url,
                });

            } catch { }

        } else {

            await navigator.clipboard.writeText(url);

            alert("Game link copied successfully!");

        }

    }

    async function copyLink() {

        await navigator.clipboard.writeText(window.location.href);

        toast.success("Link copied successfully!");

    }

    return (

        

        <section className="mx-auto mt-12 mb-16 max-w-5xl px-4">

            <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black p-10 shadow-2xl">

                <div className="text-center">

                    <h2 className="text-3xl font-black text-white">

                        📤 Share this MOD APK

                    </h2>

                    <p className="mt-3 text-zinc-400">

                        Help your friends discover this MOD APK by sharing this page.

                    </p>

                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-5">

                    <button
                        onClick={shareGame}
                        className="rounded-2xl bg-orange-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-orange-500/30 transition hover:scale-105 hover:bg-orange-600"
                    >

                        📤 Share Game

                    </button>

                    <button
                        onClick={copyLink}
                        className="rounded-2xl bg-zinc-800 px-8 py-4 text-lg font-bold text-white transition hover:scale-105 hover:bg-zinc-700"
                    >

                        🔗 Copy Link

                    </button>

                </div>

            </div>

        </section>

    );

}