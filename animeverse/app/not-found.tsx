import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-500">404</h1>

                <h2 className="mt-4 text-3xl font-bold">
                    Page Not Found
                </h2>

                <p className="mt-3 text-zinc-400">
                    The page you are looking for does not exist.
                </p>

                <Link
                    href="/"
                    className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-3 font-bold hover:bg-red-700"
                >
                    Go Home
                </Link>
            </div>
        </main>
    );
}