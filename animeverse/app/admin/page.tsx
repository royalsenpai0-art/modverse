"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface Game {
    id: number;

    title: string;
    slug: string;
    description: string;

    icon: string;
    banner: string;

    version: string;
    mod_version: string;

    developer: string;
    publisher: string;

    android: string;
    size: string;

    category: string;
    tags: string;

    playstore_link: string;
    original_link: string;
    mod_link: string;
    mirror_link: string;

    mod_features: string;
    whats_new: string;
    faq: string;

    seo_title: string;
    seo_description: string;
    seo_keywords: string;

    featured: boolean;
    trending: boolean;
    popular: boolean;

    created_at: string;
    updated_at: string;
}

export default function AdminPage() {

    const [games, setGames] = useState<Game[]>([]);
    const [editingGame, setEditingGame] = useState<Game | null>(null);

    const [search, setSearch] = useState("");

    // Basic Information

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");

    // Images

    const [iconFile, setIconFile] = useState<File | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);

    // Game Information

    const [version, setVersion] = useState("");
    const [modVersion, setModVersion] = useState("");

    const [developer, setDeveloper] = useState("");
    const [publisher, setPublisher] = useState("");

    const [android, setAndroid] = useState("");
    const [size, setSize] = useState("");

    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");

    // Download Links

    const [playstore, setPlaystore] = useState("");
    const [originalApk, setOriginalApk] = useState("");
    const [modApk, setModApk] = useState("");
    const [mirror, setMirror] = useState("");

    // MOD Content

    const [modFeatures, setModFeatures] = useState("");
    const [whatsNew, setWhatsNew] = useState("");
    const [faq, setFaq] = useState("");

    // SEO

    const [seoTitle, setSeoTitle] = useState("");
    const [seoDescription, setSeoDescription] = useState("");
    const [seoKeywords, setSeoKeywords] = useState("");

    // Homepage

    const [featured, setFeatured] = useState(false);
    const [trending, setTrending] = useState(false);
    const [popular, setPopular] = useState(false);

    useEffect(() => {
        loadGames();
    }, []);
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

    // =====================
    // UPLOAD IMAGE
    // =====================

    async function uploadImage(file: File | null) {
        if (!file) return "";

        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(2)}.${fileExt}`;

        const { error } = await supabase.storage
            .from("games")
            .upload(fileName, file, {
                cacheControl: "3600",
                upsert: true,
            });

        if (error) {
            alert(error.message);
            console.error(error);
            return "";
        }

        const { data } = supabase.storage
            .from("games")
            .getPublicUrl(fileName);

        return data.publicUrl;
    }

    // =====================
    // RESET FORM
    // =====================

    function resetForm() {
        setEditingGame(null);

        setTitle("");
        setSlug("");
        setDescription("");

        setVersion("");
        setModVersion("");

        setDeveloper("");
        setPublisher("");

        setAndroid("");
        setSize("");

        setCategory("");
        setTags("");

        setPlaystore("");
        setOriginalApk("");
        setModApk("");
        setMirror("");

        setModFeatures("");
        setWhatsNew("");
        setFaq("");

        setSeoTitle("");
        setSeoDescription("");
        setSeoKeywords("");

        setFeatured(false);
        setTrending(false);
        setPopular(false);

        setIconFile(null);
        setBannerFile(null);
    }

    // =====================
    // SEARCH
    // =====================

    const filteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(search.toLowerCase())
    );
    // =====================
    // UPLOAD GAME
    // =====================

    async function uploadGame(e: React.FormEvent) {
        e.preventDefault();

        let icon = editingGame?.icon || "";
        let banner = editingGame?.banner || "";

        if (iconFile) {
            icon = await uploadImage(iconFile);
        }

        if (bannerFile) {
            banner = await uploadImage(bannerFile);
        }

        const gameData = {
            title,
            slug,
            description,

            icon,
            banner,

            version,
            mod_version: modVersion,

            developer,
            publisher,

            android,
            size,

            category,
            tags,

            playstore_link: playstore,
            original_link: originalApk,
            mod_link: modApk,
            mirror_link: mirror,

            mod_features: modFeatures,
            whats_new: whatsNew,
            faq,

            seo_title: seoTitle,
            seo_description: seoDescription,
            seo_keywords: seoKeywords,

            featured,
            trending,
            popular,

            updated_at: new Date().toISOString(),
        };

        if (editingGame) {

            const { error } = await supabase
                .from("games")
                .update(gameData)
                .eq("id", editingGame.id);

            if (error) {
                alert(error.message);
                return;
            }

            alert("Game Updated Successfully");

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

            alert("Game Uploaded Successfully");
        }

        resetForm();
        loadGames();
    }

    // =====================
    // EDIT GAME
    // =====================

    function editGame(game: Game) {

        setEditingGame(game);

        setTitle(game.title);
        setSlug(game.slug);
        setDescription(game.description);

        setVersion(game.version);
        setModVersion(game.mod_version);

        setDeveloper(game.developer);
        setPublisher(game.publisher);

        setAndroid(game.android);
        setSize(game.size);

        setCategory(game.category);
        setTags(game.tags);

        setPlaystore(game.playstore_link);
        setOriginalApk(game.original_link);
        setModApk(game.mod_link);
        setMirror(game.mirror_link);

        setModFeatures(game.mod_features);
        setWhatsNew(game.whats_new);
        setFaq(game.faq);

        setSeoTitle(game.seo_title);
        setSeoDescription(game.seo_description);
        setSeoKeywords(game.seo_keywords);

        setFeatured(game.featured);
        setTrending(game.trending);
        setPopular(game.popular);
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
    // =====================
    // UI
    // =====================

    return (
        <div className="max-w-7xl mx-auto p-6">

            <h1 className="text-4xl font-bold mb-8">
                GameHub Admin Panel
            </h1>

            <form
                onSubmit={uploadGame}
                className="space-y-8 bg-white p-6 rounded-xl shadow"
            >

                {/* =======================
BASIC INFORMATION
======================= */}

                <div>

                    <h2 className="text-2xl font-bold mb-5">
                        Basic Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-5">

                        <div>

                            <label className="font-semibold">
                                Game Title
                            </label>

                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full border rounded-lg p-3 mt-2"
                            />

                        </div>

                        <div>

                            <label className="font-semibold">
                                Slug
                            </label>

                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                required
                                className="w-full border rounded-lg p-3 mt-2"
                            />

                        </div>

                    </div>

                    <div className="mt-5">

                        <label className="font-semibold">
                            Description
                        </label>

                        <textarea
                            rows={6}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border rounded-lg p-3 mt-2"
                        />

                    </div>

                </div>

                {/* =======================
IMAGES
======================= */}

                <div>

                    <h2 className="text-2xl font-bold mb-5">
                        Images
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>

                            <label className="font-semibold">
                                Game Icon
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setIconFile(
                                        e.target.files?.[0] || null
                                    )
                                }
                                className="mt-2 block w-full"
                            />

                            {editingGame?.icon && (

                                <Image
                                    src={editingGame.icon}
                                    alt=""
                                    width={120}
                                    height={120}
                                    className="rounded-lg mt-4 border"
                                />

                            )}

                        </div>

                        <div>

                            <label className="font-semibold">
                                Banner
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setBannerFile(
                                        e.target.files?.[0] || null
                                    )
                                }
                                className="mt-2 block w-full"
                            />

                            {editingGame?.banner && (

                                <Image
                                    src={editingGame.banner}
                                    alt=""
                                    width={350}
                                    height={180}
                                    className="rounded-lg mt-4 border"
                                />

                            )}

                        </div>

                    </div>

                </div>

                {/* =======================
GAME INFORMATION
======================= */}

                <div>

                    <h2 className="text-2xl font-bold mb-5">
                        Game Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-5">

                        <input
                            placeholder="Game Version"
                            value={version}
                            onChange={(e) => setVersion(e.target.value)}
                            className="border rounded-lg p-3"
                        />

                        <input
                            placeholder="MOD Version"
                            value={modVersion}
                            onChange={(e) => setModVersion(e.target.value)}
                            className="border rounded-lg p-3"
                        />

                        <input
                            placeholder="Developer"
                            value={developer}
                            onChange={(e) => setDeveloper(e.target.value)}
                            className="border rounded-lg p-3"
                        />

                        <input
                            placeholder="Publisher"
                            value={publisher}
                            onChange={(e) => setPublisher(e.target.value)}
                            className="border rounded-lg p-3"
                        />

                        <input
                            placeholder="Android Version"
                            value={android}
                            onChange={(e) => setAndroid(e.target.value)}
                            className="border rounded-lg p-3"
                        />

                        <input
                            placeholder="APK Size"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="border rounded-lg p-3"
                        />

                        <input
                            placeholder="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border rounded-lg p-3"
                        />

                        <input
                            placeholder="Tags (comma separated)"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="border rounded-lg p-3"
                        />

                    </div>

                </div>

                {/* =======================
DOWNLOAD LINKS
======================= */}

                <div>

                    <h2 className="text-2xl font-bold mb-5">
                        Download Links
                    </h2>

                    <div className="grid md:grid-cols-2 gap-5">

                        <input
                            placeholder="Play Store Link"
                            value={playstore}
                            onChange={(e) => setPlaystore(e.target.value)}
                            className="border rounded-lg p-3"
                        />

                        <input
                            placeholder="Original APK Link"
                            value={originalApk}
                            onChange={(e) => setOriginalApk(e.target.value)}
                            className="border rounded-lg p-3"
                        />

                        <input
                            placeholder="MOD APK Link"
                            value={modApk}
                            onChange={(e) => setModApk(e.target.value)}
                            className="border rounded-lg p-3"
                        />

                        <input
                            placeholder="Mirror Download Link"
                            value={mirror}
                            onChange={(e) => setMirror(e.target.value)}
                            className="border rounded-lg p-3"
                        />

                    </div>

                </div>
                {/* =======================
MOD CONTENT
======================= */}

                <div>

                    <h2 className="text-2xl font-bold mb-5">
                        MOD Content
                    </h2>

                    <div className="space-y-5">

                        <div>

                            <label className="font-semibold">
                                MOD Features
                            </label>

                            <textarea
                                rows={6}
                                value={modFeatures}
                                onChange={(e) => setModFeatures(e.target.value)}
                                placeholder="Unlimited Money, No Ads, Unlock All..."
                                className="w-full border rounded-lg p-3 mt-2"
                            />

                        </div>

                        <div>

                            <label className="font-semibold">
                                What's New
                            </label>

                            <textarea
                                rows={5}
                                value={whatsNew}
                                onChange={(e) => setWhatsNew(e.target.value)}
                                placeholder="Latest changes..."
                                className="w-full border rounded-lg p-3 mt-2"
                            />

                        </div>

                        <div>

                            <label className="font-semibold">
                                FAQ
                            </label>

                            <textarea
                                rows={6}
                                value={faq}
                                onChange={(e) => setFaq(e.target.value)}
                                placeholder="Frequently Asked Questions..."
                                className="w-full border rounded-lg p-3 mt-2"
                            />

                        </div>

                    </div>

                </div>

                {/* =======================
SEO
======================= */}

                <div>

                    <h2 className="text-2xl font-bold mb-5">
                        SEO Settings
                    </h2>

                    <div className="space-y-5">

                        <div>

                            <label className="font-semibold">
                                SEO Title
                            </label>

                            <input
                                type="text"
                                value={seoTitle}
                                onChange={(e) => setSeoTitle(e.target.value)}
                                className="w-full border rounded-lg p-3 mt-2"
                            />

                        </div>

                        <div>

                            <label className="font-semibold">
                                SEO Description
                            </label>

                            <textarea
                                rows={4}
                                value={seoDescription}
                                onChange={(e) => setSeoDescription(e.target.value)}
                                className="w-full border rounded-lg p-3 mt-2"
                            />

                        </div>

                        <div>

                            <label className="font-semibold">
                                SEO Keywords
                            </label>

                            <input
                                type="text"
                                value={seoKeywords}
                                onChange={(e) => setSeoKeywords(e.target.value)}
                                placeholder="game mod, apk, unlimited money..."
                                className="w-full border rounded-lg p-3 mt-2"
                            />

                        </div>

                    </div>

                </div>

                {/* =======================
HOMEPAGE SETTINGS
======================= */}

                <div>

                    <h2 className="text-2xl font-bold mb-5">
                        Homepage Settings
                    </h2>

                    <div className="flex flex-wrap gap-8">

                        <label className="flex items-center gap-2 cursor-pointer">

                            <input
                                type="checkbox"
                                checked={featured}
                                onChange={(e) => setFeatured(e.target.checked)}
                            />

                            <span>Featured Game</span>

                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">

                            <input
                                type="checkbox"
                                checked={trending}
                                onChange={(e) => setTrending(e.target.checked)}
                            />

                            <span>Trending Game</span>

                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">

                            <input
                                type="checkbox"
                                checked={popular}
                                onChange={(e) => setPopular(e.target.checked)}
                            />

                            <span>Popular Game</span>

                        </label>

                    </div>

                </div>

                {/* =======================
ACTION BUTTONS
======================= */}

                <div className="flex flex-wrap gap-4 pt-4">

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                    >
                        {editingGame ? "Update Game" : "Upload Game"}
                    </button>

                    {editingGame && (

                        <button
                            type="button"
                            onClick={resetForm}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                        >
                            Cancel Editing
                        </button>

                    )}

                </div>

            </form>
            {/* =======================
SEARCH
======================= */}

            <div className="mt-10 mb-6">

                <h2 className="text-2xl font-bold mb-4">
                    Uploaded Games
                </h2>

                <input
                    type="text"
                    placeholder="Search game..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border rounded-lg p-3"
                />

            </div>

            {/* =======================
GAMES TABLE
======================= */}

            <div className="overflow-x-auto rounded-xl border bg-white shadow">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">Icon</th>

                            <th className="p-4 text-left">Game</th>

                            <th className="p-4 text-left">Version</th>

                            <th className="p-4 text-left">Category</th>

                            <th className="p-4 text-left">Status</th>

                            <th className="p-4 text-left">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredGames.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={6}
                                    className="text-center py-10 text-gray-500"
                                >

                                    No games found.

                                </td>

                            </tr>

                        ) : (

                            filteredGames.map((game) => (

                                <tr
                                    key={game.id}
                                    className="border-t hover:bg-gray-50"
                                >

                                    {/* ICON */}

                                    <td className="p-4">

                                        <Image
                                            src={game.icon}
                                            alt={game.title}
                                            width={60}
                                            height={60}
                                            className="rounded-lg border object-cover"
                                        />

                                    </td>

                                    {/* GAME */}

                                    <td className="p-4">

                                        <div className="font-bold">

                                            {game.title}

                                        </div>

                                        <div className="text-sm text-gray-500">

                                            {game.slug}

                                        </div>

                                        {game.banner && (

                                            <Image
                                                src={game.banner}
                                                alt={game.title}
                                                width={180}
                                                height={90}
                                                className="rounded mt-3 border"
                                            />

                                        )}

                                    </td>

                                    {/* VERSION */}

                                    <td className="p-4">

                                        <div>{game.version}</div>

                                        <div className="text-green-600 text-sm">

                                            MOD {game.mod_version}

                                        </div>

                                    </td>

                                    {/* CATEGORY */}

                                    <td className="p-4">

                                        <div>{game.category}</div>

                                        <div className="text-sm text-gray-500">

                                            {game.size}

                                        </div>

                                    </td>

                                    {/* STATUS */}

                                    <td className="p-4">

                                        <div className="flex flex-wrap gap-2">

                                            {game.featured && (

                                                <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-semibold">

                                                    Featured

                                                </span>

                                            )}

                                            {game.trending && (

                                                <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">

                                                    Trending

                                                </span>

                                            )}

                                            {game.popular && (

                                                <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">

                                                    Popular

                                                </span>

                                            )}

                                        </div>

                                    </td>

                                    {/* ACTIONS */}

                                    <td className="p-4">

                                        <div className="flex gap-3">

                                            <button
                                                onClick={() => editGame(game)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                            >

                                                Edit

                                            </button>

                                            <button
                                                onClick={() => deleteGame(game.id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                            >

                                                Delete

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );
}