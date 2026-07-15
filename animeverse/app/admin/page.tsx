"use client";

import { useEffect, useState } from "react";
import TiptapEditor from "@/components/TiptapEditor";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface Game {
    id: number;

    title: string;
    slug: string;

    screenshot2: string;
    screenshot3: string;
    screenshot4: string;
    screenshot5: string;

    short_description: string;
    description: string;

    icon: string;
    banner: string;

    screenshots: string[];

    version: string;
    mod_version: string;

    developer: string;
    publisher: string;

    android: string;
    size: string;

    rating: string;
    downloads: string;

    category: string;
    tags: string;

    playstore_link: string;
    original_link: string;
    mod_link: string;
    mirror_link: string;

    mod_features: string;
    whats_new: string;

    faq1_question: string;
    faq1_answer: string;

    faq2_question: string;
    faq2_answer: string;

    faq3_question: string;
    faq3_answer: string;

    faq4_question: string;
    faq4_answer: string;

    seo_title: string;
    seo_description: string;
    seo_keywords: string;

    featured: boolean;
    trending: boolean;
    popular: boolean;

    created_at: string;
    updated_at: string;
}

interface Blog {

    id: number;

    title: string;

    slug: string;

    short_description: string;

    content: string;

    banner: string;

    author: string;

    category: string;

    tags: string;

    seo_title: string;

    seo_description: string;

    seo_keywords: string;

    featured: boolean;

    views: number;

    game_id: number | null;
    game_slug: string;

    created_at: string;

    updated_at: string;

}

export default function AdminPage() {
    const [games, setGames] = useState<Game[]>([]);
    const [editingGame, setEditingGame] = useState<Game | null>(null);

    const [search, setSearch] = useState("");



    // =====================
    // BASIC INFORMATION
    // =====================

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");

    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");

    // =====================
    // IMAGES
    // =====================

    const [iconFile, setIconFile] = useState<File | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);

    const [screenshot1, setScreenshot1] = useState<File | null>(null);
    const [screenshot2, setScreenshot2] = useState<File | null>(null);
    const [screenshot3, setScreenshot3] = useState<File | null>(null);
    const [screenshot4, setScreenshot4] = useState<File | null>(null);
    const [screenshot5, setScreenshot5] = useState<File | null>(null);
    const [screenshot6, setScreenshot6] = useState<File | null>(null);


    //   ==================blog===========
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

    const [blogTitle, setBlogTitle] = useState("");

    const [blogSlug, setBlogSlug] = useState("");

    const [blogShortDescription, setBlogShortDescription] = useState("");

    const [blogContent, setBlogContent] = useState("");

    const [blogBanner, setBlogBanner] = useState<File | null>(null);

    const [blogAuthor, setBlogAuthor] = useState("MODVerse");

    const [blogCategory, setBlogCategory] = useState("");

    const [blogTags, setBlogTags] = useState("");

    const [blogSeoTitle, setBlogSeoTitle] = useState("");

    const [blogSeoDescription, setBlogSeoDescription] = useState("");

    const [blogSeoKeywords, setBlogSeoKeywords] = useState("");

    const [blogFeatured, setBlogFeatured] = useState(false);
    // =====================
    // GAME INFO
    // =====================

    const [version, setVersion] = useState("");
    const [modVersion, setModVersion] = useState("");

    const [developer, setDeveloper] = useState("");
    const [publisher, setPublisher] = useState("");

    const [android, setAndroid] = useState("");
    const [size, setSize] = useState("");

    const [rating, setRating] = useState("5.0");
    const [downloads, setDownloads] = useState("0");

    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");

    useEffect(() => {
        loadGames();
    }, []);
    // =====================
    // DOWNLOAD LINKS
    // =====================

    const [playstore, setPlaystore] = useState("");
    const [originalApk, setOriginalApk] = useState("");
    const [modApk, setModApk] = useState("");
    const [mirror, setMirror] = useState("");

    // =====================
    // MOD CONTENT
    // =====================

    const [modFeatures, setModFeatures] = useState("");
    const [whatsNew, setWhatsNew] = useState("");


    // BloG Dropdown
    const gamesList = games;
    const [gameId, setGameId] = useState<number | null>(null);
    const [gameSlug, setGameSlug] = useState("");
    // =====================
    // FAQ
    // =====================

    const [faq1Question, setFaq1Question] = useState("");
    const [faq1Answer, setFaq1Answer] = useState("");

    const [faq2Question, setFaq2Question] = useState("");
    const [faq2Answer, setFaq2Answer] = useState("");

    const [faq3Question, setFaq3Question] = useState("");
    const [faq3Answer, setFaq3Answer] = useState("");

    const [faq4Question, setFaq4Question] = useState("");
    const [faq4Answer, setFaq4Answer] = useState("");

    // =====================
    // SEO
    // =====================

    const [seoTitle, setSeoTitle] = useState("");
    const [seoDescription, setSeoDescription] = useState("");
    const [seoKeywords, setSeoKeywords] = useState("");

    // =====================
    // HOMEPAGE
    // =====================

    const [featured, setFeatured] = useState(false);
    const [trending, setTrending] = useState(false);
    const [popular, setPopular] = useState(false);

    useEffect(() => {
        loadGames();
    }, []);

    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
                router.replace("/login");
            }
        }

        checkAuth();
    }, [router]);

    // =====================
    // LOAD GAMES
    // =====================

    async function loadGames() {
        const { data, error } = await supabase
            .from("games")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            console.error(error);
            return;
        }

        setGames(data || []);
    }
    // ========================
    // blog
    // ===================
    async function loadBlogs() {

        const { data } = await supabase

            .from("blogs")

            .select("*")

            .order("created_at", {
                ascending: false,
            });

        if (data) {

            setBlogs(data);

        }

    }

    async function deleteBlog(id: number) {

        if (!confirm("Delete this blog?")) return;

        const { error } = await supabase
            .from("blogs")
            .delete()
            .eq("id", id);

        if (error) {

            alert(error.message);

            return;

        }

        loadBlogs();

    }
    function editBlog(blog: Blog) {

        setEditingBlog(blog);

        setBlogTitle(blog.title);

        setBlogSlug(blog.slug);

        setGameId(blog.game_id);
        setGameSlug(blog.game_slug);

        setBlogShortDescription(blog.short_description);

        setBlogContent(blog.content);

        setBlogAuthor(blog.author);

        setBlogCategory(blog.category);

        setBlogTags(blog.tags);

        setBlogSeoTitle(blog.seo_title);

        setBlogSeoDescription(blog.seo_description);

        setBlogSeoKeywords(blog.seo_keywords);

        setBlogFeatured(blog.featured);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    }
    // =====================
    // IMAGE UPLOAD
    // =====================

    async function uploadImage(file: File | null) {
        if (!file) return "";

        const ext = file.name.split(".").pop();

        const fileName = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(2)}.${ext}`;

        const { error } = await supabase.storage
            .from("games")
            .upload(fileName, file, {
                cacheControl: "3600",
                upsert: true,
            });

        if (error) {
            alert(error.message);
            return "";
        }

        const { data } = supabase.storage
            .from("games")
            .getPublicUrl(fileName);

        return data.publicUrl;
    }
    // =====================
    // AUTO SLUG
    // =====================

    useEffect(() => {
        if (!editingGame) {
            setSlug(
                title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "")
            );
        }
    }, [title, editingGame]);

    // =====================
    // RESET FORM
    // =====================

    function resetForm() {
        setEditingGame(null);

        setTitle("");
        setSlug("");

        setShortDescription("");
        setDescription("");

        setIconFile(null);
        setBannerFile(null);

        setScreenshot1(null);
        setScreenshot2(null);
        setScreenshot3(null);
        setScreenshot4(null);
        setScreenshot5(null);
        setScreenshot6(null);

        setVersion("");
        setModVersion("");

        setDeveloper("");
        setPublisher("");

        setAndroid("");
        setSize("");

        setRating("5.0");
        setDownloads("0");

        setCategory("");
        setTags("");

        setPlaystore("");
        setOriginalApk("");
        setModApk("");
        setMirror("");

        setModFeatures("");
        setWhatsNew("");

        setFaq1Question("");
        setFaq1Answer("");

        setFaq2Question("");
        setFaq2Answer("");

        setFaq3Question("");
        setFaq3Answer("");

        setFaq4Question("");
        setFaq4Answer("");

        setSeoTitle("");
        setSeoDescription("");
        setSeoKeywords("");

        setFeatured(false);
        setTrending(false);
        setPopular(false);
    }

    // =====================
    // SEARCH
    // =====================

    const filteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(search.toLowerCase())
    );

    // =====================
    // SCREENSHOTS
    // =====================

    async function uploadScreenshots() {

        return {

            screenshots: screenshot1 ? await uploadImage(screenshot1) : "",

            screenshot2: screenshot2 ? await uploadImage(screenshot2) : "",

            screenshot3: screenshot3 ? await uploadImage(screenshot3) : "",

            screenshot4: screenshot4 ? await uploadImage(screenshot4) : "",

            screenshot5: screenshot5 ? await uploadImage(screenshot5) : "",

        };

    }

    // =====================
    // SAVE GAME
    // =====================

    async function uploadGame(e: React.FormEvent) {
        e.preventDefault();

        let icon = editingGame?.icon || "";
        let banner = editingGame?.banner || "";

        if (iconFile) icon = await uploadImage(iconFile);
        if (bannerFile) banner = await uploadImage(bannerFile);

        const images = await uploadScreenshots();
        const gameData = {
            title,
            slug,

            short_description: shortDescription,
            description,

            icon,
            banner,

            screenshots: images.screenshots || editingGame?.screenshots || "",

            screenshot2: images.screenshot2 || editingGame?.screenshot2 || "",

            screenshot3: images.screenshot3 || editingGame?.screenshot3 || "",

            screenshot4: images.screenshot4 || editingGame?.screenshot4 || "",

            screenshot5: images.screenshot5 || editingGame?.screenshot5 || "",
            version,
            mod_version: modVersion,

            developer,
            publisher,

            android,
            size,

            rating,
            downloads,

            category,
            tags,

            playstore_link: playstore,
            original_link: originalApk,
            mod_link: modApk,
            mirror_link: mirror,

            mod_features: modFeatures,
            whats_new: whatsNew,

            faq1_question: faq1Question,
            faq1_answer: faq1Answer,

            faq2_question: faq2Question,
            faq2_answer: faq2Answer,

            faq3_question: faq3Question,
            faq3_answer: faq3Answer,

            faq4_question: faq4Question,
            faq4_answer: faq4Answer,

            seo_title: seoTitle,
            seo_description: seoDescription,
            seo_keywords: seoKeywords,

            featured,
            trending,
            popular,

            updated_at: new Date().toISOString(),
        };

        if (editingGame) {

            const { data, error } = await supabase
                .from("games")
                .update(gameData)
                .eq("id", editingGame.id)
                .select();

            console.log("UPDATE DATA:", data);
            console.log("UPDATE ERROR:", error);

            if (error) {
                alert(error.message);
                return;
            }

            alert("✅ Game Updated Successfully");

        } else {

            const { error } = await supabase
                .from("games")
                .insert([
                    {
                        ...gameData,
                        created_at: new Date().toISOString(),
                    },
                ]);

            if (error) {
                alert(error.message);
                return;
            }

            alert("✅ Game Uploaded Successfully");
        }
        useEffect(() => {
            resetForm();
            loadGames();
            loadBlogs();

        }, []);
    }
    // =====================
    // DELETE GAME
    // =====================

    async function deleteGame(id: number) {

        if (!confirm("Delete this game?")) return;

        const { error } = await supabase
            .from("games")
            .delete()
            .eq("id", id);

        if (error) {
            alert(error.message);
            return;
        }

        loadGames();
    }

    // ==================
    // blog
    // ==================
    async function uploadBlog(e: React.FormEvent) {

        e.preventDefault();

        let banner = editingBlog?.banner || "";

        if (blogBanner) {

            banner = await uploadImage(blogBanner);

        }

        const blogData = {

            title: blogTitle,

            slug: blogSlug,

            short_description: blogShortDescription,

            content: blogContent,

            banner,

            author: blogAuthor,

            category: blogCategory,

            tags: blogTags,

            game_id: gameId,
            game_slug: gameSlug,

            seo_title: blogSeoTitle,

            seo_description: blogSeoDescription,

            seo_keywords: blogSeoKeywords,

            featured: blogFeatured,

            updated_at: new Date().toISOString(),

        };

        if (editingBlog) {

            const { error } = await supabase

                .from("blogs")

                .update(blogData)

                .eq("id", editingBlog.id);

            if (error) {

                alert(error.message);

                return;

            }

            alert("✅ Blog Updated Successfully");

        } else {

            const { error } = await supabase

                .from("blogs")

                .insert([

                    {

                        ...blogData,

                        created_at: new Date().toISOString(),

                    },

                ]);

            if (error) {

                alert(error.message);

                return;

            }

            alert("✅ Blog Published Successfully");

        }

        resetBlogForm();

        loadBlogs();

    }
    function resetBlogForm() {

        setEditingBlog(null);

        setBlogTitle("");

        setBlogSlug("");

        setBlogShortDescription("");

        setBlogContent("");

        setGameId(null);
        setGameSlug("");


        setBlogBanner(null);

        setBlogAuthor("MODVerse");

        setBlogCategory("");

        setBlogTags("");

        setBlogSeoTitle("");

        setBlogSeoDescription("");

        setBlogSeoKeywords("");

        setBlogFeatured(false);

    }
    // =====================
    // EDIT GAME
    // =====================

    function editGame(game: Game) {

        setEditingGame(game);

        setTitle(game.title);
        setSlug(game.slug);

        setShortDescription(game.short_description);
        setDescription(game.description);

        setVersion(game.version);
        setModVersion(game.mod_version);

        setDeveloper(game.developer);
        setPublisher(game.publisher);

        setAndroid(game.android);
        setSize(game.size);

        setRating(game.rating);
        setDownloads(game.downloads);

        setCategory(game.category);
        setTags(game.tags);

        setPlaystore(game.playstore_link);
        setOriginalApk(game.original_link);
        setModApk(game.mod_link);
        setMirror(game.mirror_link);

        setModFeatures(game.mod_features);
        setWhatsNew(game.whats_new);

        setFaq1Question(game.faq1_question);
        setFaq1Answer(game.faq1_answer);

        setFaq2Question(game.faq2_question);
        setFaq2Answer(game.faq2_answer);

        setFaq3Question(game.faq3_question);
        setFaq3Answer(game.faq3_answer);

        setFaq4Question(game.faq4_question);
        setFaq4Answer(game.faq4_answer);

        setSeoTitle(game.seo_title);
        setSeoDescription(game.seo_description);
        setSeoKeywords(game.seo_keywords);

        setFeatured(game.featured);
        setTrending(game.trending);
        setPopular(game.popular);
    }
    return (
        <main className="min-h-screen bg-[#090909] text-white">

            {/* Header */}

            <div className="border-b border-zinc-800 bg-[#111111]">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

                    <div>

                        <h1 className="text-4xl font-black">

                            🎮 MODVerse

                        </h1>

                        <p className="mt-2 text-zinc-400">

                            Manage Games, SEO, Screenshots & Downloads

                        </p>

                    </div>

                    <button
                        onClick={resetForm}
                        className="rounded-xl bg-orange-500 px-6 py-3 font-bold transition hover:bg-orange-600"
                    >

                        + New Game

                    </button>

                </div>

            </div>

            <div className="mx-auto max-w-7xl px-6 py-10">

                {/* Search */}

                <div className="mb-8">

                    <input
                        type="text"
                        placeholder="Search Games..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#111111] px-5 outline-none focus:border-orange-500"
                    />

                </div>
                <form
                    onSubmit={uploadBlog}
                    className="mt-10 rounded-3xl border border-zinc-800 bg-[#111111] p-8"
                >

                    <h2 className="mb-8 text-3xl font-black">
                        📝 Blog Publisher
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">

                        <input
                            placeholder="Blog Title"
                            value={blogTitle}
                            onChange={(e) => setBlogTitle(e.target.value)}
                            className="rounded-xl bg-zinc-900 p-4"
                        />

                        <input
                            placeholder="Slug"
                            value={blogSlug}
                            onChange={(e) => setBlogSlug(e.target.value)}
                            className="rounded-xl bg-zinc-900 p-4"
                        />
                        <div className="space-y-2">
                            <label className="font-semibold">
                                Related Game
                            </label>
                            <p className="text-red-500">
                                Total Games: {gamesList.length}
                            </p>
                            <select
                                value={gameId ?? ""}
                                onChange={(e) => {
                                    const selected = gamesList.find(
                                        (g) => g.id === Number(e.target.value)
                                    );

                                    setGameId(selected?.id || null);
                                    setGameSlug(selected?.slug || "");
                                }}
                            >
                                <option value="">Select Game</option>

                                {gamesList.map((game) => (
                                    <option key={game.id} value={game.id}>
                                        {game.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <input
                            placeholder="Author"
                            value={blogAuthor}
                            onChange={(e) => setBlogAuthor(e.target.value)}
                            className="rounded-xl bg-zinc-900 p-4"
                        />

                        <input
                            placeholder="Category"
                            value={blogCategory}
                            onChange={(e) => setBlogCategory(e.target.value)}
                            className="rounded-xl bg-zinc-900 p-4"
                        />

                        <input
                            placeholder="Tags (comma separated)"
                            value={blogTags}
                            onChange={(e) => setBlogTags(e.target.value)}
                            className="rounded-xl bg-zinc-900 p-4 md:col-span-2"
                        />

                        <textarea
                            rows={3}
                            placeholder="Short Description"
                            value={blogShortDescription}
                            onChange={(e) => setBlogShortDescription(e.target.value)}
                            className="rounded-xl bg-zinc-900 p-4 md:col-span-2"
                        />

                        <textarea
                            rows={12}
                            placeholder="Full Blog Content"
                            value={blogContent}
                            onChange={(e) => setBlogContent(e.target.value)}
                            className="rounded-xl bg-zinc-900 p-4 md:col-span-2"
                        />

                        <div className="md:col-span-2">

                            <label className="mb-2 block font-bold">
                                Blog Banner
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setBlogBanner(e.target.files?.[0] || null)
                                }
                            />

                        </div>

                        <input
                            placeholder="SEO Title"
                            value={blogSeoTitle}
                            onChange={(e) => setBlogSeoTitle(e.target.value)}
                            className="rounded-xl bg-zinc-900 p-4 md:col-span-2"
                        />

                        <textarea
                            rows={3}
                            placeholder="SEO Description"
                            value={blogSeoDescription}
                            onChange={(e) => setBlogSeoDescription(e.target.value)}
                            className="rounded-xl bg-zinc-900 p-4 md:col-span-2"
                        />

                        <textarea
                            rows={2}
                            placeholder="SEO Keywords"
                            value={blogSeoKeywords}
                            onChange={(e) => setBlogSeoKeywords(e.target.value)}
                            className="rounded-xl bg-zinc-900 p-4 md:col-span-2"
                        />

                        <label className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                checked={blogFeatured}
                                onChange={(e) =>
                                    setBlogFeatured(e.target.checked)
                                }
                            />

                            Featured Blog

                        </label>

                    </div>

                    <button
                        type="submit"
                        className="mt-8 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 py-4 text-xl font-black"
                    >
                        {editingBlog ? "Update Blog" : "Publish Blog"}
                    </button>

                </form>

                <div className="mt-12 rounded-3xl border border-zinc-800 bg-[#111111] p-8">

                    <h2 className="mb-8 text-3xl font-black">
                        📝 All Blogs
                    </h2>

                    <div className="space-y-5">

                        {blogs.map((blog) => (

                            <div
                                key={blog.id}
                                className="flex flex-col gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 md:flex-row md:items-center"
                            >

                                <img
                                    src={blog.banner}
                                    alt={blog.title}
                                    className="h-28 w-full rounded-xl object-cover md:w-48"
                                />

                                <div className="flex-1">

                                    <h3 className="text-2xl font-black">
                                        {blog.title}
                                    </h3>

                                    <p className="mt-2 text-sm text-zinc-400">
                                        {blog.short_description}
                                    </p>

                                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-500">

                                        <span>
                                            👁 {blog.views}
                                        </span>

                                        <span>
                                            📂 {blog.category}
                                        </span>

                                        {blog.featured && (
                                            <span className="rounded-full bg-orange-500 px-3 py-1 text-white">
                                                ⭐ Featured
                                            </span>
                                        )}

                                    </div>

                                </div>

                                <div className="flex gap-3">

                                    <button
                                        onClick={() => editBlog(blog)}
                                        className="rounded-xl bg-blue-600 px-5 py-3 font-bold"
                                    >
                                        ✏ Edit
                                    </button>

                                    <button
                                        onClick={() => deleteBlog(blog.id)}
                                        className="rounded-xl bg-red-600 px-5 py-3 font-bold"
                                    >
                                        🗑 Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>
                {/* Form */}

                <form
                    onSubmit={uploadGame}
                    className="space-y-8"
                >

                    {/* Basic Information */}

                    <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

                        <h2 className="mb-8 text-2xl font-black text-orange-500">

                            Basic Information

                        </h2>

                        <div className="grid gap-6 md:grid-cols-2">

                            <div>

                                <label className="mb-2 block font-semibold">

                                    Game Title

                                </label>

                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="h-14 w-full rounded-xl border border-zinc-700 bg-[#090909] px-4"
                                />

                            </div>

                            <div>

                                <label className="mb-2 block font-semibold">

                                    Slug

                                </label>

                                <input
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className="h-14 w-full rounded-xl border border-zinc-700 bg-[#090909] px-4"
                                />

                            </div>

                        </div>

                        <div className="mt-6">

                            <label className="mb-2 block font-semibold">

                                Short Description

                            </label>

                            <textarea
                                rows={3}
                                value={shortDescription}
                                onChange={(e) => setShortDescription(e.target.value)}
                                className="w-full rounded-xl border border-zinc-700 bg-[#090909] p-4"
                            />

                        </div>

                        <div className="mt-6">

                            <label className="mb-2 block font-semibold">

                                Full Description

                            </label>

                            <TiptapEditor
                                value={description}
                                onChange={setDescription}
                            />

                        </div>

                    </div>
                    {/* Images */}

                    <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

                        <h2 className="mb-8 text-2xl font-black text-orange-500">

                            Images

                        </h2>

                        <div className="grid gap-6 md:grid-cols-2">

                            <div>

                                <label className="mb-3 block font-semibold">

                                    Game Icon

                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setIconFile(e.target.files?.[0] || null)
                                    }
                                    className="w-full rounded-xl border border-zinc-700 bg-[#090909] p-4"
                                />

                            </div>

                            <div>

                                <label className="mb-3 block font-semibold">

                                    Game Banner

                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setBannerFile(e.target.files?.[0] || null)
                                    }
                                    className="w-full rounded-xl border border-zinc-700 bg-[#090909] p-4"
                                />

                            </div>

                        </div>

                        <h3 className="mt-10 mb-5 text-xl font-bold">

                            Game Screenshots

                        </h3>

                        <div className="grid gap-5 md:grid-cols-3">

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setScreenshot1(e.target.files?.[0] || null)
                                }
                                className="rounded-xl border border-zinc-700 bg-[#090909] p-4"
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setScreenshot2(e.target.files?.[0] || null)
                                }
                                className="rounded-xl border border-zinc-700 bg-[#090909] p-4"
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setScreenshot3(e.target.files?.[0] || null)
                                }
                                className="rounded-xl border border-zinc-700 bg-[#090909] p-4"
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setScreenshot4(e.target.files?.[0] || null)
                                }
                                className="rounded-xl border border-zinc-700 bg-[#090909] p-4"
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setScreenshot5(e.target.files?.[0] || null)
                                }
                                className="rounded-xl border border-zinc-700 bg-[#090909] p-4"
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setScreenshot6(e.target.files?.[0] || null)
                                }
                                className="rounded-xl border border-zinc-700 bg-[#090909] p-4"
                            />

                        </div>

                    </div>
                    {/* Game Information */}

                    <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

                        <h2 className="mb-8 text-2xl font-black text-orange-500">

                            Game Information

                        </h2>

                        <div className="grid gap-6 md:grid-cols-2">

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Game Version
                                </label>

                                <input
                                    value={version}
                                    onChange={(e) => setVersion(e.target.value)}
                                    className="h-14 w-full rounded-xl border border-zinc-700 bg-[#090909] px-4"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    MOD Version
                                </label>

                                <input
                                    value={modVersion}
                                    onChange={(e) => setModVersion(e.target.value)}
                                    className="h-14 w-full rounded-xl border border-zinc-700 bg-[#090909] px-4"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Android Version
                                </label>

                                <input
                                    value={android}
                                    onChange={(e) => setAndroid(e.target.value)}
                                    className="h-14 w-full rounded-xl border border-zinc-700 bg-[#090909] px-4"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Game Size
                                </label>

                                <input
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="h-14 w-full rounded-xl border border-zinc-700 bg-[#090909] px-4"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Rating
                                </label>

                                <input
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    className="h-14 w-full rounded-xl border border-zinc-700 bg-[#090909] px-4"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Downloads
                                </label>

                                <input
                                    value={downloads}
                                    onChange={(e) => setDownloads(e.target.value)}
                                    className="h-14 w-full rounded-xl border border-zinc-700 bg-[#090909] px-4"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Developer
                                </label>

                                <input
                                    value={developer}
                                    onChange={(e) => setDeveloper(e.target.value)}
                                    className="h-14 w-full rounded-xl border border-zinc-700 bg-[#090909] px-4"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Publisher
                                </label>

                                <input
                                    value={publisher}
                                    onChange={(e) => setPublisher(e.target.value)}
                                    className="h-14 w-full rounded-xl border border-zinc-700 bg-[#090909] px-4"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Category
                                </label>

                                <input
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="h-14 w-full rounded-xl border border-zinc-700 bg-[#090909] px-4"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Tags (comma separated)
                                </label>

                                <input
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    className="h-14 w-full rounded-xl border border-zinc-700 bg-[#090909] px-4"
                                />
                            </div>

                        </div>

                    </div>
                    {/* Download Links */}

                    <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

                        <h2 className="mb-8 text-2xl font-black text-orange-500">

                            Download Links

                        </h2>

                        <div className="grid gap-6 md:grid-cols-2">

                            <div>

                                <label className="mb-2 block font-semibold">
                                    Play Store Link
                                </label>

                                <input
                                    value={playstore}
                                    onChange={(e) => setPlaystore(e.target.value)}
                                    className="h-14 w-full rounded-xl border border-zinc-700 bg-[#090909] px-4"
                                />

                            </div>

                            <div>

                                <label className="mb-2 block font-semibold">
                                    Original APK Link
                                </label>

                                <input
                                    value={originalApk}
                                    onChange={(e) => setOriginalApk(e.target.value)}
                                    className="h-14 w-full rounded-xl border border-zinc-700 bg-[#090909] px-4"
                                />

                            </div>

                            <div>

                                <label className="mb-2 block font-semibold">
                                    MOD APK Link
                                </label>

                                <input
                                    value={modApk}
                                    onChange={(e) => setModApk(e.target.value)}
                                    className="h-14 w-full rounded-xl border border-zinc-700 bg-[#090909] px-4"
                                />

                            </div>

                            <div>

                                <label className="mb-2 block font-semibold">
                                    Mirror Link
                                </label>

                                <input
                                    value={mirror}
                                    onChange={(e) => setMirror(e.target.value)}
                                    className="h-14 w-full rounded-xl border border-zinc-700 bg-[#090909] px-4"
                                />

                            </div>

                        </div>

                    </div>

                    {/* SEO */}

                    <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

                        <h2 className="mb-8 text-2xl font-black text-orange-500">

                            SEO Settings

                        </h2>

                        <div className="space-y-6">

                            <div>

                                <label className="mb-2 block font-semibold">

                                    SEO Title

                                </label>

                                <input
                                    value={seoTitle}
                                    onChange={(e) => setSeoTitle(e.target.value)}
                                    className="h-14 w-full rounded-xl border border-zinc-700 bg-[#090909] px-4"
                                />

                            </div>

                            <div>

                                <label className="mb-2 block font-semibold">

                                    SEO Description

                                </label>

                                <textarea
                                    rows={4}
                                    value={seoDescription}
                                    onChange={(e) => setSeoDescription(e.target.value)}
                                    className="w-full rounded-xl border border-zinc-700 bg-[#090909] p-4"
                                />

                            </div>

                            <div>

                                <label className="mb-2 block font-semibold">

                                    SEO Keywords

                                </label>

                                <textarea
                                    rows={3}
                                    value={seoKeywords}
                                    onChange={(e) => setSeoKeywords(e.target.value)}
                                    className="w-full rounded-xl border border-zinc-700 bg-[#090909] p-4"
                                />

                            </div>

                        </div>

                    </div>
                    {/* MOD Content */}

                    <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

                        <h2 className="mb-8 text-2xl font-black text-orange-500">

                            MOD Content

                        </h2>

                        <div className="space-y-6">

                            <div>

                                <label className="mb-2 block font-semibold">

                                    MOD Features

                                </label>

                                <textarea
                                    rows={6}
                                    value={modFeatures}
                                    onChange={(e) => setModFeatures(e.target.value)}
                                    className="w-full rounded-xl border border-zinc-700 bg-[#090909] p-4"
                                />

                            </div>

                            <div>

                                <label className="mb-2 block font-semibold">

                                    What's New

                                </label>

                                <textarea
                                    rows={5}
                                    value={whatsNew}
                                    onChange={(e) => setWhatsNew(e.target.value)}
                                    className="w-full rounded-xl border border-zinc-700 bg-[#090909] p-4"
                                />

                            </div>

                        </div>

                    </div>

                    {/* FAQ */}

                    <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

                        <h2 className="mb-8 text-2xl font-black text-orange-500">

                            Frequently Asked Questions

                        </h2>

                        {[1, 2, 3, 4].map((num) => (

                            <div key={num} className="mb-8 rounded-2xl border border-zinc-700 p-5">

                                <h3 className="mb-4 font-bold text-orange-400">

                                    FAQ {num}

                                </h3>

                                <input
                                    placeholder={`Question ${num}`}
                                    value={
                                        num === 1 ? faq1Question :
                                            num === 2 ? faq2Question :
                                                num === 3 ? faq3Question :
                                                    faq4Question
                                    }
                                    onChange={(e) => {
                                        if (num === 1) setFaq1Question(e.target.value);
                                        if (num === 2) setFaq2Question(e.target.value);
                                        if (num === 3) setFaq3Question(e.target.value);
                                        if (num === 4) setFaq4Question(e.target.value);
                                    }}
                                    className="mb-4 h-14 w-full rounded-xl border border-zinc-700 bg-[#090909] px-4"
                                />

                                <textarea
                                    rows={4}
                                    placeholder={`Answer ${num}`}
                                    value={
                                        num === 1 ? faq1Answer :
                                            num === 2 ? faq2Answer :
                                                num === 3 ? faq3Answer :
                                                    faq4Answer
                                    }
                                    onChange={(e) => {
                                        if (num === 1) setFaq1Answer(e.target.value);
                                        if (num === 2) setFaq2Answer(e.target.value);
                                        if (num === 3) setFaq3Answer(e.target.value);
                                        if (num === 4) setFaq4Answer(e.target.value);
                                    }}
                                    className="w-full rounded-xl border border-zinc-700 bg-[#090909] p-4"
                                />

                            </div>

                        ))}

                    </div>

                    {/* Homepage */}

                    <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

                        <h2 className="mb-8 text-2xl font-black text-orange-500">

                            Homepage Sections

                        </h2>

                        <div className="flex flex-wrap gap-8">

                            <label className="flex items-center gap-3">

                                <input
                                    type="checkbox"
                                    checked={featured}
                                    onChange={(e) => setFeatured(e.target.checked)}
                                />

                                Featured

                            </label>

                            <label className="flex items-center gap-3">

                                <input
                                    type="checkbox"
                                    checked={trending}
                                    onChange={(e) => setTrending(e.target.checked)}
                                />

                                Trending

                            </label>

                            <label className="flex items-center gap-3">

                                <input
                                    type="checkbox"
                                    checked={popular}
                                    onChange={(e) => setPopular(e.target.checked)}
                                />

                                Popular

                            </label>

                        </div>

                    </div>

                    <div className="flex justify-end">

                        <button
                            type="submit"
                            className="rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 px-10 py-4 text-lg font-black text-white transition hover:scale-105"
                        >

                            {editingGame ? "Update Game" : "Upload Game"}

                        </button>

                    </div>
                </form>

                {/* Games List */}

                <div className="mt-12 rounded-3xl border border-zinc-800 bg-[#111111] p-8">

                    <div className="mb-8 flex items-center justify-between">

                        <h2 className="text-2xl font-black text-orange-500">

                            Uploaded Games ({filteredGames.length})

                        </h2>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b border-zinc-800">

                                    <th className="p-4 text-left">Game</th>

                                    <th className="p-4 text-left">Version</th>

                                    <th className="p-4 text-left">Category</th>

                                    <th className="p-4 text-left">Updated</th>

                                    <th className="p-4 text-center">Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredGames.map((game) => (

                                    <tr
                                        key={game.id}
                                        className="border-b border-zinc-800 hover:bg-zinc-900"
                                    >

                                        <td className="p-4">

                                            <div className="flex items-center gap-4">

                                                <Image
                                                    src={game.icon}
                                                    alt={game.title}
                                                    width={60}
                                                    height={60}
                                                    className="rounded-xl"
                                                />

                                                <div>

                                                    <h3 className="font-bold">

                                                        {game.title}

                                                    </h3>

                                                    <p className="text-sm text-zinc-400">

                                                        {game.slug}

                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        <td className="p-4">

                                            {game.version}

                                        </td>

                                        <td className="p-4">

                                            {game.category}

                                        </td>

                                        <td className="p-4">

                                            {game.updated_at
                                                ? new Date(game.updated_at).toLocaleDateString()
                                                : "-"}

                                        </td>

                                        <td className="p-4">

                                            <div className="flex justify-center gap-3">

                                                <button
                                                    onClick={() => editGame(game)}
                                                    className="rounded-xl bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-700"
                                                >

                                                    Edit

                                                </button>

                                                <button
                                                    onClick={() => deleteGame(game.id)}
                                                    className="rounded-xl bg-red-600 px-4 py-2 font-semibold hover:bg-red-700"
                                                >

                                                    Delete

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </main>

    );

}