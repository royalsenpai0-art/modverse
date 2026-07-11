import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
    return (
        <>
            <Header />

            <main className="min-h-screen bg-[#0d1117] text-white">

                {/* Hero */}

                <section className="border-b border-zinc-800 bg-gradient-to-b from-green-600/20 to-transparent">

                    <div className="mx-auto max-w-6xl px-5 py-16 text-center">

                        <h1 className="text-5xl font-black">

                            About Us

                        </h1>

                        <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-300">

                            Welcome to our gaming platform. We provide the latest Android
                            games, MOD APKs, updates, installation guides, and useful
                            information in one place.

                        </p>

                    </div>

                </section>

                {/* About */}

                <section className="mx-auto max-w-6xl px-5 py-14">

                    <div className="grid gap-8 lg:grid-cols-2">

                        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                            <h2 className="mb-5 text-3xl font-black">

                                🎮 Who We Are

                            </h2>

                            <p className="leading-8 text-zinc-300">

                                Our website is dedicated to Android gamers. We regularly
                                publish the latest game versions, update information,
                                installation tutorials, and helpful gaming resources so users
                                can easily find what they need.

                            </p>

                        </div>

                        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                            <h2 className="mb-5 text-3xl font-black">

                                🚀 Our Mission

                            </h2>

                            <p className="leading-8 text-zinc-300">

                                Our goal is to create a clean, fast, and user-friendly gaming
                                platform where visitors can quickly discover updated Android
                                games with clear guides and a smooth download experience.

                            </p>

                        </div>

                    </div>
                    {/* Why Choose Us */}

                    <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-8 text-3xl font-black">

                            ⭐ Why Choose Us?

                        </h2>

                        <div className="grid gap-6 md:grid-cols-2">

                            <div className="rounded-2xl bg-zinc-800 p-6">
                                <h3 className="text-xl font-bold text-green-500">
                                    ⚡ Fast Updates
                                </h3>

                                <p className="mt-3 text-zinc-300">
                                    We regularly update game information to keep everything
                                    up to date.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-zinc-800 p-6">
                                <h3 className="text-xl font-bold text-green-500">
                                    🔒 Secure Downloads
                                </h3>

                                <p className="mt-3 text-zinc-300">
                                    Every download page is designed to provide a simple and
                                    secure experience.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-zinc-800 p-6">
                                <h3 className="text-xl font-bold text-green-500">
                                    📱 Mobile Friendly
                                </h3>

                                <p className="mt-3 text-zinc-300">
                                    Optimized for Android, tablets, desktop and all modern
                                    browsers.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-zinc-800 p-6">
                                <h3 className="text-xl font-bold text-green-500">
                                    🎮 Gaming Focused
                                </h3>

                                <p className="mt-3 text-zinc-300">
                                    Built especially for Android gamers looking for the latest
                                    game updates and guides.
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Advertisement */}

                    <div className="mt-10 rounded-3xl border-2 border-dashed border-zinc-700 bg-zinc-900 p-10 text-center">

                        <h2 className="text-2xl font-black">

                            Advertisement

                        </h2>

                        <p className="mt-3 text-zinc-500">

                            Adsterra / Monetag Banner (728×90)

                        </p>

                    </div>

                    {/* Contact CTA */}

                    <div className="mt-10 rounded-3xl bg-gradient-to-r from-green-600 to-green-500 p-10 text-center">

                        <h2 className="text-4xl font-black">

                            Need Help?

                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">

                            If you have any questions, feedback, or copyright concerns,
                            feel free to contact us anytime.

                        </p>

                        <Link
                            href="/contact"
                            className="mt-8 inline-flex rounded-2xl bg-white px-8 py-4 text-lg font-bold text-black transition hover:scale-105"
                        >
                            Contact Us
                        </Link>

                    </div>

                </section>
                <Footer />
            </main>



        </>
    );
}