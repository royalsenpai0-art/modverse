import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CookiesPage() {
    return (
        <>
            <Header />

            <main className="min-h-screen bg-[#0d1117] text-white">

                {/* Hero */}

                <section className="border-b border-zinc-800 bg-gradient-to-b from-green-600/20 to-transparent">

                    <div className="mx-auto max-w-5xl px-5 py-16 text-center">

                        <h1 className="text-5xl font-black">

                            Cookies Policy

                        </h1>

                        <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-300">

                            This Cookies Policy explains what cookies are, how we use
                            them, and how you can manage your cookie preferences while
                            using our website.

                        </p>

                    </div>

                </section>

                <section className="mx-auto max-w-5xl space-y-8 px-5 py-14">

                    {/* What Are Cookies */}

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-5 text-3xl font-black">

                            🍪 What Are Cookies?

                        </h2>

                        <p className="leading-8 text-zinc-300">

                            Cookies are small text files stored on your device when you
                            visit a website. They help websites remember your
                            preferences, improve performance, and provide a better
                            browsing experience.

                        </p>

                    </div>

                    {/* How We Use Cookies */}

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-5 text-3xl font-black">

                            ⚙ How We Use Cookies

                        </h2>

                        <ul className="space-y-4 text-zinc-300">

                            <li>• Improve website performance.</li>

                            <li>• Remember user preferences.</li>

                            <li>• Measure website traffic.</li>

                            <li>• Display relevant advertisements.</li>

                            <li>• Improve website security.</li>

                        </ul>

                    </div>

                    {/* Third Party Cookies */}

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-5 text-3xl font-black">

                            🌐 Third-Party Cookies

                        </h2>

                        <p className="leading-8 text-zinc-300">

                            Some third-party services such as advertising networks and
                            analytics providers may place cookies on your device to
                            improve their services and measure website performance.

                        </p>

                    </div>
                    {/* Manage Cookies */}

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-5 text-3xl font-black">

                            🛠 Manage Cookies

                        </h2>

                        <p className="leading-8 text-zinc-300">

                            You can control or delete cookies at any time through your
                            browser settings. Disabling cookies may affect certain
                            features and functionality of this website.

                        </p>

                    </div>

                    {/* Updates */}

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-5 text-3xl font-black">

                            🔄 Policy Updates

                        </h2>

                        <p className="leading-8 text-zinc-300">

                            We may update this Cookies Policy from time to time.
                            Any changes will be published on this page immediately.

                        </p>

                    </div>

                    {/* Contact */}

                    <div className="rounded-3xl bg-gradient-to-r from-green-600 to-green-500 p-10 text-center">

                        <h2 className="text-4xl font-black">

                            Questions About Cookies?

                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">

                            If you have any questions regarding our Cookies Policy,
                            feel free to contact us anytime.

                        </p>

                        <a
                            href="https://wa.me/923209104702"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 inline-flex rounded-2xl bg-white px-8 py-4 text-lg font-bold text-black transition hover:scale-105"
                        >
                            💬 Contact on WhatsApp
                        </a>

                    </div>

                </section>
                <Footer />
            </main>



        </>
    );
}