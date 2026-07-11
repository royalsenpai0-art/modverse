import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function DMCAPage() {
    return (
        <>
            <Header />

            <main className="min-h-screen bg-[#0d1117] text-white">

                {/* Hero */}

                <section className="border-b border-zinc-800 bg-gradient-to-b from-green-600/20 to-transparent">

                    <div className="mx-auto max-w-5xl px-5 py-16 text-center">

                        <h1 className="text-5xl font-black">

                            DMCA Policy

                        </h1>

                        <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-300">

                            We respect intellectual property rights and comply with the
                            Digital Millennium Copyright Act (DMCA). If you believe that
                            any content on this website infringes your copyright, please
                            notify us using the information below.

                        </p>

                    </div>

                </section>

                <section className="mx-auto max-w-5xl space-y-8 px-5 py-14">

                    {/* Copyright */}

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-5 text-3xl font-black">

                            © Copyright Policy

                        </h2>

                        <p className="leading-8 text-zinc-300">

                            We do not intentionally host or distribute copyrighted
                            material without permission. If any content violates your
                            copyright, please contact us immediately so we can review
                            the request.

                        </p>

                    </div>

                    {/* How to Submit */}

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-5 text-3xl font-black">

                            📩 How to Submit a DMCA Notice

                        </h2>

                        <p className="leading-8 text-zinc-300">

                            Your request should include the following information:

                        </p>

                        <ul className="mt-6 space-y-4 text-zinc-300">

                            <li>• Your full name.</li>

                            <li>• Proof that you own the copyrighted content.</li>

                            <li>• The exact URL(s) that contain the content.</li>

                            <li>• Your contact information.</li>

                            <li>• A statement confirming your claim is made in good faith.</li>

                        </ul>

                    </div>

                    {/* Review */}

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-5 text-3xl font-black">

                            ⚖ Review Process

                        </h2>

                        <p className="leading-8 text-zinc-300">

                            Once we receive a valid DMCA notice, we will review it as
                            quickly as possible. If the claim is valid, the reported
                            content may be removed or access may be restricted.

                        </p>

                    </div>
                    {/* Counter Notification */}

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-5 text-3xl font-black">

                            🔄 Counter Notification

                        </h2>

                        <p className="leading-8 text-zinc-300">

                            If you believe that content was removed by mistake or
                            misidentification, you may submit a counter notification.
                            Please include all relevant information so we can review
                            your request fairly.

                        </p>

                    </div>

                    {/* False Claims */}

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-5 text-3xl font-black">

                            ⚠ False Claims

                        </h2>

                        <p className="leading-8 text-zinc-300">

                            Submitting false or misleading copyright claims may result
                            in legal consequences. Please ensure that all information
                            provided is accurate and submitted in good faith.

                        </p>

                    </div>

                    {/* Contact */}

                    <div className="rounded-3xl bg-gradient-to-r from-green-600 to-green-500 p-10 text-center">

                        <h2 className="text-4xl font-black">

                            Submit a DMCA Request

                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">

                            If you believe that any content on our website infringes
                            your copyright, please contact us directly. We will review
                            your request as soon as possible.

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