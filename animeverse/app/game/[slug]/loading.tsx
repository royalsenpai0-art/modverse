export default function Loading() {
    return (
        <main className="min-h-screen bg-[#0f0f0f] text-white">
            <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">

                <div className="h-8 w-24 bg-zinc-800 rounded mb-8"></div>

                <div className="grid md:grid-cols-3 gap-8">

                    <div className="aspect-[3/4] rounded-xl bg-zinc-800"></div>

                    <div className="md:col-span-2">

                        <div className="h-10 w-3/4 bg-zinc-800 rounded mb-6"></div>

                        <div className="h-6 w-1/2 bg-zinc-800 rounded mb-4"></div>

                        <div className="space-y-3">
                            <div className="h-4 bg-zinc-800 rounded"></div>
                            <div className="h-4 bg-zinc-800 rounded"></div>
                            <div className="h-4 w-5/6 bg-zinc-800 rounded"></div>
                        </div>

                    </div>

                </div>

            </div>
        </main>
    );
}