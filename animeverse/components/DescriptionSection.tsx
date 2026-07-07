"use client";

import { useState } from "react";

export default function DescriptionSection({
    title,
    text,
}: {
    title: string;
    text: string;
}) {
    const [expanded, setExpanded] = useState(false);

    return (
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

            <h2 className="mb-6 text-3xl font-black">
                {title}
            </h2>

            <p
                className={`leading-8 text-zinc-300 ${expanded ? "" : "line-clamp-4"
                    }`}
            >
                {text}
            </p>

            <button
                onClick={() => setExpanded(!expanded)}
                className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-bold transition hover:bg-green-500"
            >
                {expanded ? "Show Less" : "Read More"}
            </button>

        </section>
    );
}