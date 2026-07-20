
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppSticky from "@/components/WhatsAppSticky";
import type { Metadata } from "next";
import ShareButtons from "@/components/ShareButton";
import Breadcrumb from "@/components/Breadcrumb";
import { supabase } from "@/lib/supabase";
import ViewCounter from "@/components/ViewCounter";
import increaseDownload from "@/components/DownloadCounter";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {

    const { slug } = await params;

    const { data: game } = await supabase
        .from("games")
        .select("*")
        .eq("slug", slug)
        .single();

    if (!game) {
        return {
            title: "Game Not Found | MODVerse",
        };
    }

    const url = `https://modversepk.online/game/${game.slug}`;

    return {
        title: game.seo_title || game.title,

        description: game.seo_description,

        keywords: game.seo_keywords
            ?.split(",")
            .map((k: string) => k.trim()),

        alternates: {
            canonical: url,
        },

        openGraph: {
            title: game.seo_title || game.title,
            description: game.seo_description,
            url,
            siteName: "MODVerse",
            images: [
                {
                    url: game.banner,
                    width: 1200,
                    height: 630,
                },
            ],
            type: "website",
        },

        twitter: {
            card: "summary_large_image",
            title: game.seo_title || game.title,
            description: game.seo_description,
            images: [game.icon],
        },
    };
}
export default async function GamePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {

    const { slug } = await params;

    const { data: game } = await supabase
        .from("games")
        .select("*")
        .eq("slug", slug)
        .single();

    if (!game) {

        return (

            <main className="flex min-h-screen items-center justify-center bg-[#090909] text-white">

                <h1 className="text-3xl font-black">

                    Game Not Found

                </h1>

            </main>

        );

    }
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",

        name: game.title,

        applicationCategory: "GameApplication",

        operatingSystem: game.android,

        softwareVersion: game.version,

        description:
            game.seo_description ||
            game.short_description,

        image: game.banner,

        url: `https://modversepk.online/game/${game.slug}`,

        author: {
            "@type": "Organization",
            name: game.developer,
        },

        publisher: {
            "@type": "Organization",
            name: game.publisher,
        },

        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: game.rating || 5,
            ratingCount: game.total_rating || 1,
        },
    };
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": game.faq1_question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": game.faq1_answer,
                },
            },
            {
                "@type": "Question",
                "name": game.faq2_question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": game.faq2_answer,
                },
            },
            {
                "@type": "Question",
                "name": game.faq3_question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": game.faq3_answer,
                },
            },
            {
                "@type": "Question",
                "name": game.faq4_question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": game.faq4_answer,
                },
            },
        ],
    };
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://modversepk.online",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: game.category,
                item: `https://modversepk.online/category/${game.category
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: game.title,
                item: `https://modversepk.online/game/${game.slug}`,
            },
        ],
    };
    const categories = game.category
        ?.split(",")
        .map((c: string) => c.trim());

    const { data: relatedGames } = await supabase
        .from("games")
        .select("*")
        .or(
            categories
                .map((c: string) => `category.ilike.%${c}%`)
                .join(",")
        )
        .neq("id", game.id)
        .limit(6);;

    return (

        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
            <Header />

            <ViewCounter id={game.id} />

            <main className="min-h-screen bg-[#090909] text-white">
                {/* ================= HERO ================= */}
                {game.category.split(",").map((cat: string, index: number) => (
                    <span key={cat}>
                        {index > 0 && <span className="mx-2">›</span>}
                        <Link
                            href={`/category/${encodeURIComponent(cat.trim())}`}
                            className="hover:text-orange-500"
                        >
                            {cat.trim()}
                        </Link>
                    </span>
                ))}
                {/* ================= HERO ================= */}

                <section className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-b from-zinc-900 via-[#111111] to-[#090909]">

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.18),transparent_55%)]" />

                    <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-12">
                        {/* Back Button */}

                        <div className="mb-6 flex w-full max-w-6xl">

                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 font-bold text-white transition hover:border-orange-500 hover:bg-orange-500"
                            >
                                ← Back to Home
                            </Link>

                        </div>
                        {/* Banner */}

                        <div className="w-full overflow-hidden rounded-3xl border border-zinc-800 shadow-2xl">

                            <Image
                                src={game.banner}
                                alt={game.title}
                                width={1400}
                                height={700}
                                priority
                                className="h-auto w-full object-cover"
                            />

                        </div>

                        {/* Icon */}

                        <div className="-mt-16 rounded-[30px] border-4 border-orange-500 bg-zinc-900 p-2 shadow-2xl">

                            <Image
                                src={game.icon}
                                alt={game.title}
                                width={140}
                                height={140}
                                className="rounded-[24px]"
                            />

                        </div>

                        {/* Title */}

                        <h1 className="mt-6 text-center text-3xl font-black md:text-5xl">

                            {game.title}

                        </h1>

                        {/* Version */}

                        <div className="mt-4 flex flex-wrap justify-center gap-3">

                            <span className="rounded-full bg-orange-500 px-4 py-2 text-sm font-bold">

                                Version {game.version}

                            </span>

                            <span className="rounded-full bg-zinc-800 px-4 py-2 text-sm font-bold">

                                MOD {game.mod_version}

                            </span>

                        </div>

                        {/* Rating / Views / Downloads */}

                        <div className="mt-8 flex flex-wrap justify-center gap-4">

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-3">

                                ⭐ <span className="font-bold">{game.rating || "5.0"}</span>

                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-3">

                                👁 <span className="font-bold">

                                    {(game.views || 0).toLocaleString()}

                                </span>

                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-3">

                                ⬇ <span className="font-bold">

                                    {(game.downloads || 0).toLocaleString()}

                                </span>

                            </div>

                        </div>

                        {/* Download Button */}

                        <Link
                            href={`/download/${game.slug}`}
                            className="mt-8 flex h-14 w-full max-w-md items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-lg font-black transition duration-300 hover:scale-105"
                        >

                            📥 Download MOD APK

                        </Link>

                    </div>

                </section>

                {/* ================= DESCRIPTION ================= */}

                <section className="mx-auto mt-10 max-w-6xl px-4">

                    <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

                        <h2 className="mb-6 text-3xl font-black">
                            📖 About {game.title}
                        </h2>

                        <p className="leading-8 text-zinc-300">
                            {game.short_description}
                        </p>

                    </div>

                </section>



                {/* ================= MOD FEATURES ================= */}

                <section className="mx-auto mt-8 max-w-6xl px-4">

                    <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

                        <h2 className="mb-6 text-3xl font-black text-orange-500">
                            🚀 MOD Features
                        </h2>

                        <div className="grid gap-4 md:grid-cols-2">

                            {game.mod_features
                                ?.split("\n")
                                .filter(Boolean)
                                .map((feature: string, index: number) => (

                                    <div
                                        key={index}
                                        className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
                                    >

                                        <span className="text-xl text-green-500">
                                            ✅
                                        </span>

                                        <span className="font-medium text-zinc-200">
                                            {feature}
                                        </span>

                                    </div>

                                ))}

                        </div>

                    </div>

                </section>

                {/* ================= SCREENSHOTS ================= */}

                <section className="mx-auto mt-8 max-w-6xl px-4">

                    <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

                        <h2 className="mb-6 text-3xl font-black">
                            📸 Screenshots
                        </h2>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">

                            {[
                                game.screenshot1,
                                game.screenshot2,
                                game.screenshot3,
                                game.screenshot4,
                                game.screenshot5,
                            ]
                                .filter(Boolean)
                                .map((image: string, index: number) => (

                                    <a
                                        key={index}
                                        href={image}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group overflow-hidden rounded-2xl border border-zinc-800"
                                    >

                                        <Image
                                            src={image}
                                            alt={`Screenshot ${index + 1}`}
                                            width={500}
                                            height={900}
                                            className="h-auto w-full transition duration-500 group-hover:scale-105"
                                        />

                                    </a>

                                ))}

                        </div>

                    </div>

                </section>

                {/* ================= WHAT'S NEW ================= */}

                <section className="mx-auto mt-8 max-w-6xl px-4">

                    <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

                        <h2 className="mb-6 text-3xl font-black text-green-500">
                            🆕 What's New
                        </h2>

                        <div className="space-y-3">

                            {game.whats_new
                                ?.split("\n")
                                .filter(Boolean)
                                .map((item: string, index: number) => (

                                    <div
                                        key={index}
                                        className="flex items-start gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
                                    >

                                        <span className="mt-1 text-green-500">
                                            ✔
                                        </span>

                                        <span className="text-zinc-300">
                                            {item}
                                        </span>

                                    </div>

                                ))}

                        </div>

                    </div>

                </section>

                {/* ================= GAME INFORMATION ================= */}

                <section className="mx-auto mt-8 max-w-6xl px-4">

                    <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

                        <h2 className="mb-8 text-3xl font-black">
                            🎮 Game Information
                        </h2>

                        <div className="grid gap-5 md:grid-cols-2">

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                                <p className="text-sm text-zinc-500">Developer</p>
                                <h3 className="mt-2 text-lg font-bold">{game.developer}</h3>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                                <p className="text-sm text-zinc-500">Publisher</p>
                                <h3 className="mt-2 text-lg font-bold">{game.publisher}</h3>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                                <p className="text-sm text-zinc-500">Android</p>
                                <h3 className="mt-2 text-lg font-bold">{game.android}</h3>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                                <p className="text-sm text-zinc-500">Size</p>
                                <h3 className="mt-2 text-lg font-bold">{game.size}</h3>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                                <p className="text-sm text-zinc-500">Category</p>
                                <h3 className="mt-2 text-lg font-bold">{game.category}</h3>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                                <p className="text-sm text-zinc-500">Version</p>
                                <h3 className="mt-2 text-lg font-bold">{game.version}</h3>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                                <p className="text-sm text-zinc-500">MOD Version</p>
                                <h3 className="mt-2 text-lg font-bold">{game.mod_version}</h3>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                                <p className="text-sm text-zinc-500">Updated</p>
                                <h3 className="mt-2 text-lg font-bold">
                                    {game.updated_at
                                        ? new Date(game.updated_at).toLocaleDateString()
                                        : "Recently"}
                                </h3>
                            </div>

                        </div>

                    </div>

                </section>

                {/* ================= FAQ ================= */}

                <section className="mx-auto mt-8 max-w-6xl px-4">

                    <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

                        <h2 className="mb-8 text-3xl font-black">
                            ❓ Frequently Asked Questions
                        </h2>

                        <div className="space-y-4">

                            {[
                                {
                                    q: game.faq1_question,
                                    a: game.faq1_answer,
                                },
                                {
                                    q: game.faq2_question,
                                    a: game.faq2_answer,
                                },
                                {
                                    q: game.faq3_question,
                                    a: game.faq3_answer,
                                },
                                {
                                    q: game.faq4_question,
                                    a: game.faq4_answer,
                                },
                            ]
                                .filter((item) => item.q && item.a)
                                .map((item, index) => (

                                    <details
                                        key={index}
                                        className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
                                    >

                                        <summary className="cursor-pointer list-none text-lg font-bold transition group-open:text-orange-500">

                                            {item.q}

                                        </summary>

                                        <p className="mt-4 leading-8 text-zinc-300">

                                            {item.a}

                                        </p>

                                    </details>

                                ))}

                        </div>

                    </div>

                </section>

                {/* ================= EXTRA LINKS ================= */}

                <section className="mx-auto mt-8 max-w-6xl px-4">

                    <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

                        <h2 className="mb-8 text-3xl font-black">

                            🔗 Useful Links

                        </h2>

                        <div className="grid gap-4 md:grid-cols-3">

                            {game.playstore_link && (

                                <a
                                    href={game.playstore_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center rounded-2xl bg-green-600 px-6 py-4 text-lg font-bold transition hover:scale-105"
                                >

                                    📱 Google Play

                                </a>

                            )}

                            {game.original_link && (

                                <a
                                    href={game.original_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-4 text-lg font-bold transition hover:scale-105"
                                >

                                    📦 Original APK

                                </a>

                            )}

                            {game.mirror_link && (

                                <a
                                    href={game.mirror_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center rounded-2xl bg-purple-600 px-6 py-4 text-lg font-bold transition hover:scale-105"
                                >

                                    🌐 Mirror Link

                                </a>

                            )}

                        </div>

                    </div>

                </section>

                {/* ================= RELATED GAMES ================= */}

                <section className="mx-auto mt-10 max-w-6xl px-4">

                    <div className="mb-8 flex items-center justify-between">

                        <h2 className="text-3xl font-black">
                            🎮 Related Games
                        </h2>

                        <Link
                            href="/"
                            className="font-bold text-orange-500 transition hover:text-orange-400"
                        >
                            View All →
                        </Link>

                    </div>

                    <div className="space-y-4">

                        {relatedGames?.map((item) => (

                            <Link
                                key={item.id}
                                href={`/game/${item.slug}`}
                                className="group flex overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/20"
                            >

                                {/* Image */}

                                {/* Icon */}

                                <div className="flex items-center justify-center px-5">
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        width={90}
                                        height={90}
                                        className="h-[90px] w-[90px] rounded-[22px] border border-zinc-700 object-cover transition duration-300 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content */}

                                <div className="flex flex-1 flex-col justify-between p-5">

                                    <div>

                                        <h3 className="line-clamp-2 text-lg font-black transition group-hover:text-orange-500 md:text-2xl">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-sm text-zinc-400">
                                            {item.category}
                                        </p>

                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-3 text-xs md:text-sm">

                                        <span>⭐ {item.rating || "5.0"}</span>

                                        <span>👁 {(item.views || 0).toLocaleString()}</span>

                                        <span>⬇ {(item.downloads || 0).toLocaleString()}</span>

                                    </div>

                                    <div className="mt-4">

                                        <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                                            MOD APK
                                        </span>

                                    </div>

                                </div>

                            </Link>

                        ))}

                    </div>
                </section>

                {/* ================= CTA ================= */}

                <section className="mx-auto mt-16 max-w-6xl px-4 pb-14">

                    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 p-10 text-center">

                        <h2 className="text-4xl font-black">

                            Want More MOD APK Games?

                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-white/90">

                            Explore hundreds of premium MOD APK games with Unlimited Money,
                            Unlocked Features, No Ads and the latest updates.

                        </p>

                        <Link
                            href="/recently-updated"
                            className="mt-8 inline-flex rounded-2xl bg-white px-8 py-4 text-lg font-black text-black transition hover:scale-105"
                        >

                            Browse More Games →

                        </Link>

                    </div>

                </section>

                {/* ================= SHARE & STATS ================= */}

                <section className="mx-auto mt-10 max-w-6xl px-4">

                    <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

                        <h2 className="mb-8 text-3xl font-black">
                            📊 Game Statistics
                        </h2>

                        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">

                            <div className="rounded-2xl bg-zinc-900 p-6 text-center">
                                <p className="text-4xl">⭐</p>
                                <h3 className="mt-3 text-2xl font-black">
                                    {game.rating || "5.0"}
                                </h3>
                                <p className="text-zinc-400">
                                    Rating
                                </p>
                            </div>

                            <div className="rounded-2xl bg-zinc-900 p-6 text-center">
                                <p className="text-4xl">⬇</p>
                                <h3 className="mt-3 text-2xl font-black">
                                    {(game.downloads || 0).toLocaleString()}
                                </h3>
                                <p className="text-zinc-400">
                                    Downloads
                                </p>
                            </div>

                            <div className="rounded-2xl bg-zinc-900 p-6 text-center">
                                <p className="text-4xl">👁</p>
                                <h3 className="mt-3 text-2xl font-black">
                                    {(game.views || 0).toLocaleString()}
                                </h3>
                                <p className="text-zinc-400">
                                    Views
                                </p>
                            </div>

                            <div className="rounded-2xl bg-zinc-900 p-6 text-center">
                                <p className="text-4xl">📱</p>
                                <h3 className="mt-3 text-2xl font-black">
                                    {game.android}
                                </h3>
                                <p className="text-zinc-400">
                                    Android
                                </p>
                            </div>

                        </div>

                    </div>

                </section>

                {/* ================= SHARE ================= */}

                <ShareButtons title={game.title} />




                {/* ================= SEO CONTENT ================= */}

                <section className="mx-auto mb-16 mt-10 max-w-6xl px-4">

                    <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black p-8">

                        {/* SEO Description */}

                        <h2 className="mb-4 text-3xl font-black text-white">

                            📝 About This MOD APK

                        </h2>

                        <div
                            className="prose prose-invert max-w-none prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-zinc-300 prose-p:leading-8 prose-strong:text-white prose-a:text-orange-500"
                            dangerouslySetInnerHTML={{
                                __html: game.description || "",
                            }}
                        />
                        {/* Tags */}

                        <h2 className="mt-10 mb-5 text-3xl font-black text-white">

                            🏷 Tags

                        </h2>

                        <div className="flex flex-wrap gap-3">

                            {game.seo_keywords
                                ?.split(",")
                                .map((tag: string, index: number) => (

                                    <span
                                        key={index}
                                        className="rounded-full border border-orange-500 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-400 transition hover:bg-orange-500 hover:text-white"
                                    >

                                        #{tag.trim()}

                                    </span>

                                ))}

                        </div>

                    </div>

                </section>
                <WhatsAppSticky />
                <Footer />
            </main>

        </>
    );

}