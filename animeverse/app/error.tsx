"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <main className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-500">
                    Something went wrong
                </h1>

                <button
                    onClick={() => reset()}
                    className="mt-6 rounded-lg bg-red-600 px-6 py-3"
                >
                    Try Again
                </button>
            </div>
        </main>
    );
}