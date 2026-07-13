import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
export const dynamic = "force-dynamic";
import InPagePush from "@/components/InPagePush";
import Hero from "@/components/Hero";
import WhatsAppSticky from "@/components/WhatsAppSticky";
import { supabase } from "@/lib/supabase";
import Breadcrumb from "@/components/Breadcrumb";

export default async function Home() {

  // ================= DATA FETCHING =================
  const { data: heroGame } = await supabase
    .from("games")
    .select("*")
    .order("downloads", { ascending: false })
    .limit(1)
    .single();

  const { data: latestGames } = await supabase
    .from("games")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(6);

  const { data: popularGames } = await supabase
    .from("games")
    .select("*")
    .eq("popular", true)
    .limit(6);

  const { data: trendingGames } = await supabase
    .from("games")
    .select("*")
    .eq("trending", true)
    .limit(6);

  const { count: totalGames } = await supabase
    .from("games")
    .select("*", { count: "exact", head: true });

  return (
    <>
      <Header />

      <Hero />
      <InPagePush />
      <main className="min-h-screen bg-[#0a0a0a] text-white">
        {/* ================= HERO ================= */}

        {/* ================= LATEST GAMES ================= */}

        <section className="mx-auto max-w-7xl px-4 py-10">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <p className="text-sm font-bold uppercase tracking-[3px] text-orange-500">

                Latest Collection

              </p>

              <h2 className="mt-1 text-2xl font-black text-white md:text-4xl">

                Latest Games

              </h2>

            </div>

            <Link
              href="/latest"
              className="rounded-xl border border-orange-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-500"
            >
              View All
            </Link>

          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">

            {latestGames?.map((game) => (

              <Link
                key={game.id}
                href={`/game/${game.slug}`}
                className="group rounded-2xl border border-zinc-800 bg-[#111111] p-3 transition-all duration-300 hover:border-orange-500 hover:bg-zinc-900"
              >

                <div className="flex items-center gap-3">

                  {/* Icon */}

                  <Image
                    src={game.icon || "/placeholder.png"}
                    alt={game.title}
                    width={60}
                    height={60}
                    className="h-[60px] w-[60px] rounded-2xl border border-zinc-700 object-cover md:h-[72px] md:w-[72px]"
                  />

                  {/* Content */}

                  <div className="min-w-0 flex-1">

                    <h3 className="line-clamp-2 text-[15px] font-bold leading-5 text-white md:text-lg">

                      {game.title}

                    </h3>

                    <p className="mt-1 text-xs font-medium text-orange-400">

                      {game.category}

                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-md bg-zinc-800 px-2 py-1 text-[11px] font-medium text-zinc-300">

                        ⭐ {game.rating || "5.0"}

                      </span>

                      <span className="rounded-md bg-zinc-800 px-2 py-1 text-[11px] font-medium text-zinc-300">

                        v{game.version}

                      </span>

                      <span className="rounded-md bg-zinc-800 px-2 py-1 text-[11px] font-medium text-zinc-300">

                        {game.size}

                      </span>

                    </div>

                    <div className="mt-2 flex items-center justify-between">

                      <div className="flex items-center gap-3 text-[11px] text-zinc-500">

                        <span>👁 {game.views || 0}</span>

                        <span>⬇ {game.downloads || 0}</span>

                      </div>

                      <span className="text-xs font-bold text-orange-500 transition group-hover:translate-x-1">

                        View →

                      </span>

                    </div>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </section>
        {/* ================= POPULAR GAMES ================= */}

        <section className="mx-auto max-w-7xl px-4 py-10">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <p className="text-sm font-bold uppercase tracking-[3px] text-orange-500">

                Most Downloaded

              </p>

              <h2 className="mt-1 text-2xl font-black text-white md:text-4xl">

                Popular Games

              </h2>

            </div>

            <Link
              href="/popular"
              className="rounded-xl border border-orange-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-500"
            >

              View All

            </Link>

          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">

            {popularGames?.map((game) => (

              <Link
                key={game.id}
                href={`/game/${game.slug}`}
                className="group rounded-2xl border border-zinc-800 bg-[#111111] p-3 transition-all duration-300 hover:border-orange-500 hover:bg-zinc-900"
              >

                <div className="flex items-center gap-3">

                  <Image
                    src={game.icon || "/placeholder.png"}
                    alt={game.title}
                    width={60}
                    height={60}
                    className="h-[60px] w-[60px] rounded-2xl border border-zinc-700 object-cover md:h-[72px] md:w-[72px]"
                  />

                  <div className="min-w-0 flex-1">

                    <h3 className="line-clamp-2 text-[15px] font-bold leading-5 text-white md:text-lg">

                      {game.title}

                    </h3>

                    <p className="mt-1 text-xs font-medium text-orange-400">

                      {game.category}

                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-md bg-zinc-800 px-2 py-1 text-[11px] font-medium text-zinc-300">

                        ⭐ {game.rating || "5.0"}

                      </span>

                      <span className="rounded-md bg-zinc-800 px-2 py-1 text-[11px] font-medium text-zinc-300">

                        v{game.version}

                      </span>

                      <span className="rounded-md bg-zinc-800 px-2 py-1 text-[11px] font-medium text-zinc-300">

                        {game.size}

                      </span>

                    </div>

                    <div className="mt-2 flex items-center justify-between">

                      <div className="flex items-center gap-3 text-[11px] text-zinc-500">

                        <span>🔥 {game.downloads || 0}</span>

                        <span>👁 {game.views || 0}</span>

                      </div>

                      <span className="text-xs font-bold text-orange-500 transition group-hover:translate-x-1">

                        View →

                      </span>

                    </div>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </section>


        {/* ================= TRENDING GAMES ================= */}

        <section className="mx-auto max-w-7xl px-4 py-10">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <p className="text-sm font-bold uppercase tracking-[3px] text-orange-500">

                Trending Now

              </p>

              <h2 className="mt-1 text-2xl font-black text-white md:text-4xl">

                🔥 Trending Games

              </h2>

            </div>

            <Link
              href="/trending"
              className="rounded-xl border border-orange-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-500"
            >

              View All

            </Link>

          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">

            {trendingGames?.map((game) => (

              <Link
                key={game.id}
                href={`/game/${game.slug}`}
                className="group rounded-2xl border border-zinc-800 bg-[#111111] p-3 transition-all duration-300 hover:border-orange-500 hover:bg-zinc-900"
              >

                <div className="flex items-center gap-3">

                  <Image
                    src={game.icon || "/placeholder.png"}
                    alt={game.title}
                    width={60}
                    height={60}
                    className="h-[60px] w-[60px] rounded-2xl border border-zinc-700 object-cover md:h-[72px] md:w-[72px]"
                  />

                  <div className="min-w-0 flex-1">

                    <h3 className="line-clamp-2 text-[15px] font-bold leading-5 text-white md:text-lg">

                      {game.title}

                    </h3>

                    <p className="mt-1 text-xs font-medium text-orange-400">

                      {game.category}

                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-md bg-zinc-800 px-2 py-1 text-[11px] font-medium text-zinc-300">

                        🔥 Trending

                      </span>

                      <span className="rounded-md bg-zinc-800 px-2 py-1 text-[11px] font-medium text-zinc-300">

                        ⭐ {game.rating || "5.0"}

                      </span>

                      <span className="rounded-md bg-zinc-800 px-2 py-1 text-[11px] font-medium text-zinc-300">

                        v{game.version}

                      </span>

                      <span className="rounded-md bg-zinc-800 px-2 py-1 text-[11px] font-medium text-zinc-300">

                        {game.size}

                      </span>

                    </div>

                    <div className="mt-2 flex items-center justify-between">

                      <div className="flex items-center gap-3 text-[11px] text-zinc-500">

                        <span>⬇ {game.downloads || 0}</span>

                        <span>👁 {game.views || 0}</span>

                      </div>

                      <span className="text-xs font-bold text-orange-500 transition duration-300 group-hover:translate-x-1">

                        View →

                      </span>

                    </div>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </section>
        {/* ================= GAME CATEGORIES ================= */}

        <section className="mx-auto max-w-7xl px-4 py-12">

          <div className="mb-8 text-center">

            <p className="text-sm font-bold uppercase tracking-[3px] text-orange-500">

              Browse Games

            </p>

            <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">

              Game Categories

            </h2>

            <p className="mt-3 text-zinc-400">

              Explore your favorite MOD APK games.

            </p>

          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">

            {[
              { name: "Action", icon: "🎯" },
              { name: "Adventure", icon: "🗺️" },
              { name: "Arcade", icon: "🕹️" },
              { name: "Racing", icon: "🏎️" },
              { name: "Sports", icon: "🏆" },
              { name: "Puzzle", icon: "🧩" },
              { name: "Strategy", icon: "♟️" },
              { name: "RPG", icon: "🛡️" },
              { name: "Multiplayer", icon: "👥" },
              { name: "Online", icon: "🌐" },
              { name: "Offline", icon: "📴" },
              { name: "Simulation", icon: "🎮" },
            ].map((category) => (

              <Link
                key={category.name}
                href={`/category/${encodeURIComponent(category.name)}`}
                className="group rounded-2xl border border-zinc-800 bg-[#111111] p-5 text-center transition hover:border-orange-500 hover:bg-zinc-900"
              >

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-3xl transition group-hover:bg-orange-500">

                  <span className="group-hover:scale-110 transition">
                    {category.icon}
                  </span>

                </div>

                <h3 className="mt-4 text-base font-bold text-white">
                  {category.name}
                </h3>

                <p className="mt-1 text-xs text-zinc-500">
                  Explore Games
                </p>

              </Link>

            ))}
          </div>
        </section>
        {/* ================= WHY CHOOSE US ================= */}

        <section className="mx-auto max-w-7xl px-4 py-14">

          <div className="mb-10 text-center">

            <p className="text-sm font-bold uppercase tracking-[3px] text-orange-500">

              Why Choose Us

            </p>

            <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">

              Why Millions Choose MODVerse

            </h2>

            <p className="mt-3 text-zinc-400">

              Fast, Safe and Premium MOD APK downloads for Android.

            </p>

          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            {/* Card 1 */}

            <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-6 transition hover:-translate-y-1 hover:border-orange-500">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-3xl">

                🛡️

              </div>

              <h3 className="mt-5 text-xl font-bold text-white">

                100% Safe APK

              </h3>

              <p className="mt-3 leading-7 text-zinc-400">

                Every game is checked before publishing so you can download safely.

              </p>

            </div>

            {/* Card 2 */}

            <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-6 transition hover:-translate-y-1 hover:border-orange-500">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-3xl">

                ⚡

              </div>

              <h3 className="mt-5 text-xl font-bold text-white">

                Daily Updates

              </h3>

              <p className="mt-3 leading-7 text-zinc-400">

                New MOD APK versions are added every day with latest features.

              </p>

            </div>
            {/* Card 3 */}

            <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-6 transition hover:-translate-y-1 hover:border-orange-500">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-3xl">

                🚀

              </div>

              <h3 className="mt-5 text-xl font-bold text-white">

                Fast Downloads

              </h3>

              <p className="mt-3 leading-7 text-zinc-400">

                Enjoy high-speed download links with a smooth and secure experience.

              </p>

            </div>

            {/* Card 4 */}

            <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-6 transition hover:-translate-y-1 hover:border-orange-500">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-3xl">

                🎮

              </div>

              <h3 className="mt-5 text-xl font-bold text-white">

                Premium MOD APK

              </h3>

              <p className="mt-3 leading-7 text-zinc-400">

                Unlimited Money, Premium Unlocked, No Ads and many more exciting MOD features.

              </p>

            </div>

          </div>

        </section>
        {/* ================= FAQ ================= */}

        <section className="mx-auto max-w-5xl px-4 py-14">

          <div className="mb-10 text-center">

            <p className="text-sm font-bold uppercase tracking-[3px] text-orange-500">

              Frequently Asked Questions

            </p>

            <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">

              FAQ

            </h2>

            <p className="mt-3 text-zinc-400">

              Everything you need to know before downloading MOD APK games.

            </p>

          </div>

          <div className="space-y-4">

            <details className="group rounded-2xl border border-zinc-800 bg-[#111111] p-5">

              <summary className="cursor-pointer list-none text-lg font-bold text-white">

                Is it safe to download MOD APK games?

              </summary>

              <p className="mt-4 leading-7 text-zinc-400">

                Yes. Every APK uploaded on MODVerse is checked before publishing to
                provide a safe download experience.

              </p>

            </details>

            <details className="group rounded-2xl border border-zinc-800 bg-[#111111] p-5">

              <summary className="cursor-pointer list-none text-lg font-bold text-white">

                Are all games free?

              </summary>

              <p className="mt-4 leading-7 text-zinc-400">

                Yes. All MOD APK games available on our website are completely free to download.

              </p>

            </details>

            <details className="group rounded-2xl border border-zinc-800 bg-[#111111] p-5">

              <summary className="cursor-pointer list-none text-lg font-bold text-white">

                Do I need to create an account?

              </summary>

              <p className="mt-4 leading-7 text-zinc-400">

                No. You can browse and download games without creating any account.

              </p>

            </details>
            <details className="group rounded-2xl border border-zinc-800 bg-[#111111] p-5">

              <summary className="cursor-pointer list-none text-lg font-bold text-white">

                How often are games updated?

              </summary>

              <p className="mt-4 leading-7 text-zinc-400">

                We update our games daily to provide the latest MOD APK versions with new features, bug fixes and improved performance.

              </p>

            </details>

            <details className="group rounded-2xl border border-zinc-800 bg-[#111111] p-5">

              <summary className="cursor-pointer list-none text-lg font-bold text-white">

                Which Android versions are supported?

              </summary>

              <p className="mt-4 leading-7 text-zinc-400">

                Most MOD APK games support Android 7.0 and above. Please check the game page for the exact requirements before downloading.

              </p>

            </details>

            <details className="group rounded-2xl border border-zinc-800 bg-[#111111] p-5">

              <summary className="cursor-pointer list-none text-lg font-bold text-white">

                Why should I choose MODVerse?

              </summary>

              <p className="mt-4 leading-7 text-zinc-400">

                MODVerse provides fast downloads, clean files, daily updates, premium MOD features and an easy-to-use interface for Android gamers.

              </p>

            </details>

          </div>
          <WhatsAppSticky />
        </section>
        <Footer />
      </main>
    </>
  );
}