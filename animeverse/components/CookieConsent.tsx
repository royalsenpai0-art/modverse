"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieConsent() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");

        if (!consent) {
            setShow(true);
        }
    }, []);

    function accept() {
        localStorage.setItem("cookie-consent", "accepted");
        setShow(false);
    }

    function reject() {
        localStorage.setItem("cookie-consent", "rejected");
        setShow(false);
    }

    if (!show) return null;

    return (
        <div className="fixed bottom-5 left-1/2 z-[9999] w-[95%] max-w-xl -translate-x-1/2 rounded-3xl border border-zinc-700 bg-[#111111] p-6 shadow-2xl">

            <h2 className="text-xl font-black text-white">
                🍪 We use Cookies
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
                We use cookies to improve your experience, analyze website traffic,
                and provide better services. By clicking Accept, you agree to our
                use of cookies.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

                <button
                    onClick={accept}
                    className="rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600"
                >
                    Accept All
                </button>

                <button
                    onClick={reject}
                    className="rounded-xl border border-zinc-700 px-5 py-3 font-bold text-white transition hover:bg-zinc-800"
                >
                    Reject
                </button>

                <Link
                    href="/privacy-policy"
                    className="rounded-xl border border-zinc-700 px-5 py-3 font-bold text-orange-400 transition hover:bg-zinc-800"
                >
                    Privacy Policy
                </Link>

            </div>

        </div>
    );
}