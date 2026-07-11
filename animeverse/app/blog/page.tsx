import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default async function BlogPage() {

    const { data: blogs } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <>
            <Header />

            <main className="min-h-screen bg-[#090909] text-white">

                <div className="mx-auto max-w-7xl px-6 py-10">

                    <h1 className="mb-10 text-5xl font-black">
                        📝 Latest Blogs
                    </h1>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                        {blogs?.map((blog) => (

                            <Link
                                key={blog.id}
                                href={`/blog/${blog.slug}`}
                                className="overflow-hidden rounded-3xl border border-zinc-800 bg-[#111111] transition hover:scale-105"
                            >

                                <Image
                                    src={blog.banner}
                                    alt={blog.title}
                                    width={600}
                                    height={350}
                                    className="h-52 w-full object-cover"
                                />

                                <div className="p-6">

                                    <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold">
                                        {blog.category}
                                    </span>

                                    <h2 className="mt-4 text-2xl font-black">
                                        {blog.title}
                                    </h2>

                                    <p className="mt-3 line-clamp-3 text-zinc-400">
                                        {blog.short_description}
                                    </p>

                                    <div className="mt-5 flex items-center justify-between text-sm text-zinc-500">

                                        <span>
                                            👁 {blog.views}
                                        </span>

                                        <span>
                                            {new Date(
                                                blog.created_at
                                            ).toLocaleDateString()}
                                        </span>

                                    </div>

                                </div>

                            </Link>

                        ))}

                    </div>

                </div>

            </main>

            <Footer />
        </>
    );
}