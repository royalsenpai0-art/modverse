import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButton";
import WhatsAppSticky from "@/components/WhatsAppSticky";
import BlogDownloadNotification from "@/components/BlogDownloadNotification";

import { supabase } from "@/lib/supabase";

import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {

    const { slug } = await params;

    const { data: blog } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

    if (!blog) {
        return {
            title: "Blog Not Found",
        };
    }

    return {
        title: blog.seo_title || blog.title,

        description: blog.seo_description,

        keywords: blog.seo_keywords
            ?.split(",")
            .map((k: string) => k.trim()),
    };
}

export default async function BlogPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {

    const { slug } = await params;

    const { data: blog } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

    if (!blog) {

        return (
            <main className="flex min-h-screen items-center justify-center bg-[#090909] text-white">

                <h1 className="text-4xl font-black">

                    Blog Not Found

                </h1>

            </main>
        );

    }

    // Related Game
    const { data: game } = await supabase
        .from("games")
        .select("title, slug, icon")
        .eq("id", blog.game_id)
        .single();

    // Related Blogs
    const { data: relatedBlogs } = await supabase
        .from("blogs")
        .select("*")
        .eq("category", blog.category)
        .neq("id", blog.id)
        .limit(4);
    return (
        <>
            <Header />

            <main className="min-h-screen bg-[#090909] text-white">

                <div className="mx-auto max-w-5xl px-5 py-10">

                    {/* Banner */}

                    <div className="overflow-hidden rounded-3xl border border-zinc-800">

                        <Image
                            src={blog.banner}
                            alt={blog.title}
                            width={1400}
                            height={700}
                            priority
                            className="h-auto w-full object-cover"
                        />

                    </div>

                    {/* Category */}

                    <div className="mt-8">

                        <span className="rounded-full bg-orange-500/20 px-4 py-2 text-sm font-bold text-orange-400">

                            📂 {blog.category}

                        </span>

                    </div>

                    {/* Title */}

                    <h1 className="mt-6 text-4xl font-black leading-tight lg:text-5xl">

                        {blog.title}

                    </h1>

                    {/* Author */}

                    <div className="mt-5 flex flex-wrap gap-6 text-sm text-zinc-400">

                        <span>👤 {blog.author}</span>

                        <span>👁 {blog.views} Views</span>

                        <span>📅 {new Date(blog.created_at).toLocaleDateString()}</span>

                    </div>

                    {/* Share */}

                    <div className="mt-8">

                        <ShareButtons title={blog.title} />

                    </div>

                    {/* Blog */}

                   
                    <article className="prose prose-invert mt-10 max-w-none whitespace-pre-line leading-8">

                        {blog.content}

                    </article>
                    {/* Related Blogs */}

                    <section className="mt-20">

                        <h2 className="mb-8 text-3xl font-black">

                            📚 Related Blogs

                        </h2>

                        <div className="grid gap-6 md:grid-cols-2">

                            {relatedBlogs?.map((item) => (

                                <Link
                                    key={item.id}
                                    href={`/blog/${item.slug}`}
                                    className="rounded-2xl border border-zinc-800 bg-[#111111] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20"
                                >

                                    <h3 className="line-clamp-2 text-xl font-black">

                                        {item.title}

                                    </h3>

                                    <p className="mt-3 line-clamp-3 text-zinc-400">

                                        {item.short_description}

                                    </p>

                                </Link>

                            ))}

                        </div>

                    </section>

                </div>

                <Footer />
            </main>

            {/* Floating Download Notification */}

            {game && (
                <BlogDownloadNotification
                    gameTitle={game.title}
                    downloadUrl={`/download/${game.slug}`}
                />
            )}

            <WhatsAppSticky />


        </>
    );

}