import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default async function Home() {

  // ================= HERO GAME =================

  const { data: heroGame } = await supabase
    .from("games")
    .select("*")
    .order("downloads", { ascending: false })
    .limit(1)
    .single();

  // ================= FEATURED =================

  const { data: featuredGames } = await supabase
    .from("games")
    .select("*")
    .eq("featured", true)
    .limit(10);

  // ================= TRENDING =================

  const { data: trendingGames } = await supabase
    .from("games")
    .select("*")
    .eq("trending", true)
    .limit(10);

  // ================= POPULAR =================

  const { data: popularGames } = await supabase
    .from("games")
    .select("*")
    .eq("popular", true)
    .limit(10);

  // ================= LATEST =================

  const { data: latestGames } = await supabase
    .from("games")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(10);

  // ================= TOTAL GAMES =================

  const { count: totalGames } = await supabase
    .from("games")
    .select("*", { count: "exact", head: true });

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#090909] text-white">
        {/* ================= PREMIUM HERO ================= */}

        <section className="relative overflow-hidden border-b border-zinc-800">

          {/* Background */}

          <div className="absolute inset-0">

            <div className="absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-orange-500/20 blur-[150px]" />

            <div className="absolute right-0 top-32 h-[350px] w-[350px] rounded-full bg-red-500/20 blur-[150px]" />

            <div className="absolute bottom-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[140px]" />

          </div>

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2">

            {/* LEFT */}

            <div>

              <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-sm font-bold text-orange-400">

                🔥 Updated Every Day

              </span>

              <h1 className="mt-8 text-5xl font-black leading-tight lg:text-7xl">

                Download

                <span className="block bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 bg-clip-text text-transparent">

                  MOD APK

                </span>

                Games

              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">

                Download the latest Android MOD APK games with
                Unlimited Money, Premium Unlocked, No Ads,
                God Mode and many more features.

              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                <Link
                  href="/featured"
                  className="rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 font-bold transition hover:scale-105"
                >

                  🚀 Explore Games

                </Link>

                <Link
                  href="/recently-updated"
                  className="rounded-2xl border border-zinc-700 bg-zinc-900 px-8 py-4 font-bold hover:border-orange-500"
                >

                  ⭐ Latest Updates

                </Link>

              </div>

              {/* Stats */}

              <div className="mt-14 grid grid-cols-3 gap-5">

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

                  <h2 className="text-3xl font-black text-orange-400">

                    {totalGames || "500+"}

                  </h2>

                  <p className="mt-2 text-zinc-400">

                    Games

                  </p>

                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

                  <h2 className="text-3xl font-black text-red-400">

                    Daily

                  </h2>

                  <p className="mt-2 text-zinc-400">

                    Updates

                  </p>

                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

                  <h2 className="text-3xl font-black text-yellow-400">

                    100%

                  </h2>

                  <p className="mt-2 text-zinc-400">

                    Safe

                  </p>

                </div>

              </div>

            </div>
            {/* RIGHT */}

            <div className="relative">

              {/* Glow */}

              <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-orange-500/20 blur-[120px]" />

              <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-xl">

                {/* Banner */}

                <div className="relative h-72 w-full overflow-hidden">

                  <Image
                    src={heroGame?.banner || heroGame?.icon || "/placeholder.png"}
                    alt={heroGame?.title || "Featured Game"}
                    fill
                    priority
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <span className="absolute left-5 top-5 rounded-full bg-orange-500 px-4 py-2 text-sm font-bold">

                    ⭐ FEATURED

                  </span>

                </div>

                {/* Content */}

                <div className="p-6">

                  <div className="flex items-center gap-4">

                    <Image
                      src={heroGame?.icon || "/placeholder.png"}
                      alt={heroGame?.title || ""}
                      width={80}
                      height={80}
                      className="rounded-2xl border border-zinc-700"
                    />

                    <div>

                      <h2 className="text-2xl font-black">

                        {heroGame?.title}

                      </h2>

                      <p className="mt-1 text-orange-400">

                        {heroGame?.category}

                      </p>

                    </div>

                  </div>

                  <p className="mt-5 line-clamp-3 leading-7 text-zinc-400">

                    {heroGame?.description}

                  </p>

                  {/* Stats */}

                  <div className="mt-6 grid grid-cols-3 gap-3">

                    <div className="rounded-xl bg-zinc-800 p-4 text-center">

                      <p className="text-xl font-bold text-yellow-400">

                        ⭐ {heroGame?.rating || 5}

                      </p>

                      <p className="mt-1 text-xs text-zinc-500">

                        Rating

                      </p>

                    </div>

                    <div className="rounded-xl bg-zinc-800 p-4 text-center">

                      <p className="text-xl font-bold text-green-400">

                        {heroGame?.version}

                      </p>

                      <p className="mt-1 text-xs text-zinc-500">

                        Version

                      </p>

                    </div>

                    <div className="rounded-xl bg-zinc-800 p-4 text-center">

                      <p className="text-xl font-bold text-blue-400">

                        {heroGame?.size}

                      </p>

                      <p className="mt-1 text-xs text-zinc-500">

                        Size

                      </p>

                    </div>

                  </div>

                  {/* Buttons */}

                  <div className="mt-8 flex gap-4">

                    <Link
                      href={`/game/${heroGame?.slug}`}
                      className="flex-1 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 py-4 text-center font-bold transition hover:scale-105"
                    >

                      Download Now

                    </Link>

                    <Link
                      href="/featured"
                      className="rounded-2xl border border-zinc-700 px-6 py-4 font-bold transition hover:border-orange-500"
                    >

                      View All

                    </Link>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>
        {/* ================= FEATURED GAMES ================= */}

        <section className="mx-auto max-w-7xl px-6 py-20">

          <div className="mb-10 flex items-center justify-between">

            <div>

              <span className="text-sm font-bold uppercase tracking-widest text-orange-500">

                Featured Collection

              </span>

              <h2 className="mt-2 text-4xl font-black">

                ⭐ Featured Games

              </h2>

              <p className="mt-2 text-zinc-400">

                Hand-picked premium MOD APK games.

              </p>

            </div>

            <Link
              href="/featured"
              className="rounded-xl border border-orange-500 px-5 py-3 font-bold transition hover:bg-orange-500"
            >

              View All →

            </Link>

          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-5">

            {featuredGames?.map((game) => (

              <Link
                key={game.id}
                href={`/game/${game.slug}`}
                className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-2 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/20"
              >

                {/* Image */}

                <div className="relative aspect-[3/4] overflow-hidden">

                  <Image
                    src={game.banner || game.icon || "/placeholder.png"}
                    alt={game.title}
                    fill
                    sizes="(max-width:768px) 50vw,(max-width:1200px) 33vw,20vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold">

                    MOD

                  </div>

                  <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-bold">

                    ⭐ {game.rating || "5.0"}

                  </div>

                </div>

                {/* Content */}

                <div className="p-4">

                  <h3 className="line-clamp-2 min-h-[52px] text-lg font-bold">

                    {game.title}

                  </h3>

                  <p className="mt-2 text-sm text-zinc-400">

                    {game.category}

                  </p>

                  <div className="mt-4 flex items-center justify-between">

                    <span className="rounded-lg bg-zinc-800 px-3 py-1 text-xs">

                      {game.version}

                    </span>

                    <span className="rounded-lg bg-zinc-800 px-3 py-1 text-xs">

                      {game.size}

                    </span>

                  </div>

                  <div className="mt-5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3 text-center font-bold transition group-hover:scale-105">

                    Download APK

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </section>
        {/* ================= TRENDING GAMES ================= */}

        <section className="mx-auto max-w-7xl px-6 py-20">

          <div className="mb-10 flex items-center justify-between">

            <div>

              <span className="text-sm font-bold uppercase tracking-widest text-red-500">

                Hot Right Now

              </span>

              <h2 className="mt-2 text-4xl font-black">

                🔥 Trending Games

              </h2>

              <p className="mt-2 text-zinc-400">

                Most downloaded games this week.

              </p>

            </div>

            <Link
              href="/trending"
              className="rounded-xl border border-red-500 px-5 py-3 font-bold transition hover:bg-red-500"
            >
              View All →
            </Link>

          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {trendingGames?.map((game, index) => (

              <Link
                key={game.id}
                href={`/game/${game.slug}`}
                className="group flex overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:border-red-500 hover:shadow-xl hover:shadow-red-500/20"
              >

                {/* Image */}

                <div className="relative h-44 w-40 flex-shrink-0 overflow-hidden">

                  <Image
                    src={game.banner || game.icon || "/placeholder.png"}
                    alt={game.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold">

                    #{index + 1}

                  </div>

                </div>

                {/* Content */}

                <div className="flex flex-1 flex-col justify-between p-5">

                  <div>

                    <h3 className="line-clamp-2 text-2xl font-black">

                      {game.title}

                    </h3>

                    <p className="mt-3 line-clamp-2 text-zinc-400">

                      {game.description}

                    </p>

                  </div>

                  <div>

                    <div className="mt-5 flex flex-wrap gap-2">

                      <span className="rounded-lg bg-red-500 px-3 py-1 text-xs font-bold">

                        🔥 Trending

                      </span>

                      <span className="rounded-lg bg-zinc-800 px-3 py-1 text-xs">

                        {game.version}

                      </span>

                      <span className="rounded-lg bg-zinc-800 px-3 py-1 text-xs">

                        {game.size}

                      </span>

                    </div>

                    <div className="mt-5 flex items-center justify-between">

                      <span className="text-yellow-400 font-bold">

                        ⭐ {game.rating || 5}

                      </span>

                      <div className="rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3 font-bold transition group-hover:scale-105">

                        Download →

                      </div>

                    </div>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </section>
        {/* ================= POPULAR GAMES ================= */}

        <section className="mx-auto max-w-7xl px-6 py-20">

          <div className="mb-10 flex items-center justify-between">

            <div>

              <span className="text-sm font-bold uppercase tracking-widest text-yellow-500">

                Most Loved

              </span>

              <h2 className="mt-2 text-4xl font-black">

                👑 Popular Games

              </h2>

              <p className="mt-2 text-zinc-400">

                Most downloaded and highest rated MOD APK games.

              </p>

            </div>

            <Link
              href="/popular"
              className="rounded-xl border border-yellow-500 px-5 py-3 font-bold transition hover:bg-yellow-500 hover:text-black"
            >

              View All →

            </Link>

          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-5">

            {popularGames?.map((game) => (

              <Link
                key={game.id}
                href={`/game/${game.slug}`}
                className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-2 hover:border-yellow-500 hover:shadow-2xl hover:shadow-yellow-500/20"
              >

                {/* Banner */}

                <div className="relative aspect-[3/4]">

                  <Image
                    src={game.banner || game.icon || "/placeholder.png"}
                    alt={game.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                  <div className="absolute left-3 top-3 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">

                    👑 POPULAR

                  </div>

                  <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-bold">

                    ⭐ {game.rating || 5}

                  </div>

                </div>

                {/* Content */}

                <div className="p-5">

                  <h3 className="line-clamp-2 min-h-[56px] text-lg font-bold">

                    {game.title}

                  </h3>

                  <p className="mt-2 text-sm text-zinc-400">

                    {game.category}

                  </p>

                  <div className="mt-4 flex justify-between text-sm">

                    <span className="rounded-lg bg-zinc-800 px-3 py-1">

                      📦 {game.size}

                    </span>

                    <span className="rounded-lg bg-zinc-800 px-3 py-1">

                      v{game.version}

                    </span>

                  </div>

                  <div className="mt-4 flex justify-between text-xs text-zinc-400">

                    <span>

                      👁️ {game.views || 0}

                    </span>

                    <span>

                      ⬇️ {game.downloads || 0}

                    </span>

                  </div>

                  <div className="mt-5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 py-3 text-center font-bold text-black transition group-hover:scale-105">

                    Download APK

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </section>
        {/* ================= PREMIUM CATEGORIES ================= */}

        <section className="mx-auto max-w-7xl px-6 py-20">

          <div className="mb-10 text-center">

            <span className="text-sm font-bold uppercase tracking-[4px] text-orange-500">

              Browse Collection

            </span>

            <h2 className="mt-3 text-4xl font-black">

              🎮 Game Categories

            </h2>

            <p className="mt-3 text-zinc-400">

              Explore games by your favorite category.

            </p>

          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">

            {[
              {
                name: "Action",
                icon: "⚔️",
                color: "hover:border-red-500 hover:bg-red-500/10"
              },
              {
                name: "Adventure",
                icon: "🗺️",
                color: "hover:border-orange-500 hover:bg-orange-500/10"
              },
              {
                name: "Arcade",
                icon: "🕹️",
                color: "hover:border-pink-500 hover:bg-pink-500/10"
              },
              {
                name: "Racing",
                icon: "🏎️",
                color: "hover:border-blue-500 hover:bg-blue-500/10"
              },
              {
                name: "Sports",
                icon: "⚽",
                color: "hover:border-green-500 hover:bg-green-500/10"
              },
              {
                name: "Simulation",
                icon: "🏙️",
                color: "hover:border-cyan-500 hover:bg-cyan-500/10"
              },
              {
                name: "Strategy",
                icon: "♟️",
                color: "hover:border-purple-500 hover:bg-purple-500/10"
              },
              {
                name: "Puzzle",
                icon: "🧩",
                color: "hover:border-yellow-500 hover:bg-yellow-500/10"
              },
              {
                name: "RPG",
                icon: "🛡️",
                color: "hover:border-indigo-500 hover:bg-indigo-500/10"
              },
              {
                name: "Offline",
                icon: "📴",
                color: "hover:border-emerald-500 hover:bg-emerald-500/10"
              },
              {
                name: "Online",
                icon: "🌍",
                color: "hover:border-sky-500 hover:bg-sky-500/10"
              },
              {
                name: "Multiplayer",
                icon: "👥",
                color: "hover:border-fuchsia-500 hover:bg-fuchsia-500/10"
              }

            ].map((category) => (

              <Link
                key={category.name}
                href={`/category/${encodeURIComponent(category.name)}`}
                className={`group rounded-3xl border border-zinc-800 bg-zinc-900 p-6 text-center transition duration-300 hover:-translate-y-2 ${category.color}`}
              >

                <div className="text-5xl transition duration-300 group-hover:scale-125">

                  {category.icon}

                </div>

                <h3 className="mt-5 text-lg font-bold">

                  {category.name}

                </h3>

                <p className="mt-2 text-sm text-zinc-500">

                  Explore Games

                </p>

              </Link>

            ))}

          </div>

        </section>
        {/* ================= PREMIUM FOOTER ================= */}

        <Footer />
      </main>
    </>
  );
}
