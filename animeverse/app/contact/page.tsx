import Header from "@/components/Header";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function ContactPage() {

    return (
        <>

            <Header />

            <main className="min-h-screen bg-[#0d1117] text-white">

                {/* Hero */}

                <section className="border-b border-zinc-800 bg-gradient-to-b from-green-600/20 to-transparent">

                    <div className="mx-auto max-w-5xl px-5 py-16 text-center">

                        <h1 className="text-5xl font-black">

                            Contact Us

                        </h1>

                        <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-300">

                            Have questions, suggestions, business inquiries, or copyright
                            concerns? We're here to help.

                        </p>

                    </div>

                </section>

                <section className="mx-auto max-w-5xl px-5 py-14">

                    <div className="grid gap-8 lg:grid-cols-2">

                        {/* WhatsApp */}

                        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                            <h2 className="mb-5 text-3xl font-black">

                                💬 WhatsApp

                            </h2>

                            <p className="leading-8 text-zinc-300">

                                Need quick support? Contact us directly on WhatsApp.

                            </p>

                            <a
                                href="https://wa.me/923209104702"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 inline-flex rounded-2xl bg-[#25D366] px-8 py-4 text-lg font-bold text-white transition hover:scale-105"
                            >

                                Chat on WhatsApp

                            </a>

                        </div>

                        {/* Email */}

                        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                            <h2 className="mb-5 text-3xl font-black">

                                📧 Email

                            </h2>

                            <p className="leading-8 text-zinc-300">

                                For business inquiries, DMCA requests, partnerships,
                                or general support, please contact us by email.

                            </p>

                            <p className="mt-8 rounded-xl bg-zinc-800 p-4 text-green-400">

                                your@email.com

                            </p>

                        </div>

                    </div>
                    {/* Response Time */}

                    <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                        <h2 className="mb-6 text-3xl font-black">

                            ⏰ Response Time

                        </h2>

                        <div className="grid gap-6 md:grid-cols-2">

                            <div className="rounded-2xl bg-zinc-800 p-6">

                                <h3 className="text-xl font-bold text-green-500">

                                    General Support

                                </h3>

                                <p className="mt-3 text-zinc-300">

                                    We usually reply within 24 hours.

                                </p>

                            </div>

                            <div className="rounded-2xl bg-zinc-800 p-6">

                                <h3 className="text-xl font-bold text-green-500">

                                    DMCA Requests

                                </h3>

                                <p className="mt-3 text-zinc-300">

                                    Copyright complaints are reviewed as quickly as possible.

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Advertisement */}



                    {/* Contact CTA */}

                    <div className="mt-10 rounded-3xl bg-gradient-to-r from-green-600 to-green-500 p-10 text-center">

                        <h2 className="text-4xl font-black">

                            We're Always Ready to Help

                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">

                            If you need support, have suggestions, or want to report an issue,
                            don't hesitate to contact us.

                        </p>

                        <a
                            href="https://wa.me/923209104702"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 inline-flex rounded-2xl bg-white px-8 py-4 text-lg font-bold text-black transition hover:scale-105"
                        >
                            💬 Chat on WhatsApp
                        </a>

                    </div>

                </section>
                <Footer />
            </main>


        </>
    );

}