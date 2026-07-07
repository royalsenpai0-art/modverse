import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-zinc-800 bg-[#09090b]">

            {/* Top Gradient */}

            <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-500" />

            <div className="mx-auto max-w-7xl px-5 py-14">

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

                    {/* Logo */}

                    <div>

                        <h2 className="text-4xl font-black">

                            <span className="text-orange-500">MOD</span>Verse

                        </h2>

                        <p className="mt-5 leading-8 text-zinc-400">

                            MODVerse provides the latest Android MOD APK games with
                            fast downloads, safe files and daily updates.

                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">

                            <span className="rounded-full border border-green-500 px-4 py-2 text-sm">

                                📱 Android

                            </span>

                            <span className="rounded-full border border-yellow-500 px-4 py-2 text-sm">

                                ⚡ Fast Download

                            </span>

                            <span className="rounded-full border border-blue-500 px-4 py-2 text-sm">

                                🔒 Safe

                            </span>

                        </div>

                    </div>

                    {/* Navigation */}

                    <div>

                        <h3 className="mb-5 text-2xl font-bold">

                            Navigation

                        </h3>

                        <div className="space-y-4">

                            <Link href="/" className="block text-zinc-400 hover:text-orange-500">
                                Home
                            </Link>

                            <Link href="/featured" className="block text-zinc-400 hover:text-orange-500">
                                Featured
                            </Link>

                            <Link href="/trending" className="block text-zinc-400 hover:text-orange-500">
                                Trending
                            </Link>

                            <Link href="/popular" className="block text-zinc-400 hover:text-orange-500">
                                Top Downloads
                            </Link>

                            <Link href="/latest" className="block text-zinc-400 hover:text-orange-500">
                                Recently Updated
                            </Link>

                            <Link href="/blog" className="block text-zinc-400 hover:text-orange-500">
                                Blog
                            </Link>

                        </div>

                    </div>
                    {/* Categories */}

                    <div>

                        <h3 className="mb-5 text-2xl font-bold">

                            Categories

                        </h3>

                        <div className="space-y-4">

                            <Link href="/category/Action" className="block text-zinc-400 hover:text-orange-500">
                                ⚔️ Action
                            </Link>

                            <Link href="/category/Adventure" className="block text-zinc-400 hover:text-orange-500">
                                🗺 Adventure
                            </Link>

                            <Link href="/category/Racing" className="block text-zinc-400 hover:text-orange-500">
                                🏎 Racing
                            </Link>

                            <Link href="/category/RPG" className="block text-zinc-400 hover:text-orange-500">
                                🛡 RPG
                            </Link>

                            <Link href="/category/Strategy" className="block text-zinc-400 hover:text-orange-500">
                                ♟ Strategy
                            </Link>

                            <Link href="/categories" className="block font-semibold text-orange-500 hover:text-orange-400">
                                View All →
                            </Link>

                        </div>

                    </div>

                    {/* Website */}

                    <div>

                        <h3 className="mb-5 text-2xl font-bold">

                            Website

                        </h3>

                        <div className="space-y-4">

                            <Link href="/about" className="block text-zinc-400 hover:text-orange-500">
                                About
                            </Link>

                            <Link href="/contact" className="block text-zinc-400 hover:text-orange-500">
                                Contact
                            </Link>

                            <Link href="/privacy-policy" className="block text-zinc-400 hover:text-orange-500">
                                Privacy Policy
                            </Link>

                            <Link href="/dmca" className="block text-zinc-400 hover:text-orange-500">
                                DMCA
                            </Link>

                            <Link href="/cookies" className="block text-zinc-400 hover:text-orange-500">
                                Cookies Policy
                            </Link>

                            <a
                                href="https://wa.me/923209104702"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex rounded-xl bg-green-600 px-4 py-3 font-semibold transition hover:bg-green-500"
                            >
                                💬 WhatsApp Support
                            </a>

                        </div>

                    </div>

                </div>

                <div className="my-10 border-t border-zinc-800"></div>

                {/* Bottom */}

                <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">

                    <p className="max-w-3xl text-center text-sm leading-7 text-zinc-500 lg:text-left">

                        © 2026 <span className="font-semibold text-white">MODVerse</span>.
                        All Rights Reserved.<br />

                        MODVerse is an independent website created for educational and
                        informational purposes. All trademarks, logos and game names belong
                        to their respective owners.

                    </p>

                    <div className="flex flex-wrap justify-center gap-3">

                        <span className="rounded-full border border-zinc-700 px-4 py-2 text-sm">
                            📱 Android
                        </span>

                        <span className="rounded-full border border-zinc-700 px-4 py-2 text-sm">
                            ⚡ Fast Download
                        </span>

                        <span className="rounded-full border border-zinc-700 px-4 py-2 text-sm">
                            🔒 Safe
                        </span>

                        <span className="rounded-full border border-zinc-700 px-4 py-2 text-sm">
                            🚀 Updated Daily
                        </span>

                    </div>

                </div>

            </div>

        </footer>
    );
}