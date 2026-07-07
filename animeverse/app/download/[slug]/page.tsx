import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import DownloadClient from "@/app/DownloadClient";


type Props = {
    params: Promise<{
        slug: string;
    }>;
};

// ======================
// SEO
// ======================

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {

    const { slug } = await params;

    const { data: game } = await supabase
        .from("games")
        .select("*")
        .eq("slug", decodeURIComponent(slug))
        .single();

    if (!game) {
        return {
            title: "Download Not Found",
        };
    }

    return {
        title:
            game.seo_title ||
            `${game.title} MOD APK Download Latest Version`,

        description:
            game.seo_description ||
            game.description?.slice(0, 160),

        keywords:
            game.seo_keywords?.split(",") || [],

        openGraph: {
            title: game.title,
            description: game.description,
            images: [game.banner],
        },

        twitter: {
            card: "summary_large_image",
            title: game.title,
            description: game.description,
            images: [game.banner],
        },
    };
}

// ======================
// PAGE
// ======================

export default async function DownloadPage({
    params,
}: Props) {

    const { slug } = await params;

    const { data: game } = await supabase
        .from("games")
        .select("*")
        .eq("slug", decodeURIComponent(slug))
        .single();

    if (!game) {
        notFound();
    }

    const { data: relatedGames } = await supabase
        .from("games")
        .select("*")
        .eq("category", game.category)
        .neq("id", game.id)
        .limit(6);

    return (
        <>
            <Header />

            <main>
                <DownloadClient
                    game={game}
                    relatedGames={relatedGames ?? []}
                />
            </main>


        </>
    );
}