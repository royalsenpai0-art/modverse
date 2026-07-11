import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
    return (
        <>
            <Header />

            <main className="min-h-screen bg-[#0d1117] text-white">

                {/* Hero */}

                <section className="border-b border-zinc-800 bg-gradient-to-b from-green-600/20 to-transparent">

                    <div className="mx-auto max-w-5xl px-5 py-16 text-center">

                        <h1 className="text-5xl font-black">
                            Privacy Policy
                        </h1>

                        <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-300">
                            Your privacy is important to us. This Privacy Policy explains
                            how we collect, use, and protect your information when you use
                            our website.
                        </p>

                    </div>

                </section>

                <section className="mx-auto max-w-5xl space-y-8 px-5 py-14">

                    {/* Information */}

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-5 text-3xl font-black">
                            📌 Information We Collect
                        </h2>

                        <p className="leading-8 text-zinc-300">

                            We may collect basic information such as browser type,
                            device information, pages visited, and general analytics
                            data to improve the user experience.

                        </p>

                    </div>

                    {/* Cookies */}

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-5 text-3xl font-black">
                            🍪 Cookies
                        </h2>

                        <p className="leading-8 text-zinc-300">

                            Our website uses cookies to improve functionality,
                            analyze traffic, and provide a better browsing experience.
                            You can disable cookies through your browser settings.

                        </p>

                    </div>

                    {/* Third Party */}

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-5 text-3xl font-black">
                            🌐 Third-Party Services
                        </h2>

                        <p className="leading-8 text-zinc-300">

                            We may use third-party services such as analytics providers
                            and advertising networks to improve our website.
                            These services may collect anonymous usage information
                            according to their own privacy policies.

                        </p>

                    </div>
                    {/* Data Security */}

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-5 text-3xl font-black">
                            🔒 Data Security
                        </h2>

                        <p className="leading-8 text-zinc-300">

                            We take reasonable measures to protect user information.
                            However, no method of transmission or storage over the
                            internet is 100% secure, so we cannot guarantee absolute
                            security.

                        </p>

                    </div>

                    {/* External Links */}

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-5 text-3xl font-black">
                            🔗 External Links
                        </h2>

                        <p className="leading-8 text-zinc-300">

                            Our website may contain links to third-party websites.
                            We are not responsible for the privacy practices or
                            content of those external websites.

                        </p>

                    </div>

                    {/* Children's Privacy */}

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-5 text-3xl font-black">
                            👦 Children's Privacy
                        </h2>

                        <p className="leading-8 text-zinc-300">

                            Our website is not intended for children under the age of
                            13. We do not knowingly collect personal information from
                            children.

                        </p>

                    </div>

                    {/* Policy Updates */}

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-5 text-3xl font-black">
                            🔄 Changes to This Policy
                        </h2>

                        <p className="leading-8 text-zinc-300">

                            We may update this Privacy Policy from time to time.
                            Any changes will be posted on this page with immediate
                            effect.

                        </p>

                    </div>

                    {/* Contact */}

                    <div className="rounded-3xl bg-gradient-to-r from-green-600 to-green-500 p-10 text-center">

                        <h2 className="text-4xl font-black">

                            Questions About Privacy?

                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">

                            If you have any questions regarding this Privacy Policy,
                            feel free to contact us through WhatsApp.

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