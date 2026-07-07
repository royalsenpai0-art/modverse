export default function Loading() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">

        <div className="h-14 w-14 animate-spin rounded-full border-4 border-zinc-700 border-t-red-500"></div>

        <h2 className="text-white text-xl font-bold">
          Loading...
        </h2>

      </div>
    </main>
  );
}