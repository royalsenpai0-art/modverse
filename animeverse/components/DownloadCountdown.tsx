"use client";

import { useEffect, useState } from "react";

type Props = {
  downloadUrl: string;
};

export default function DownloadCountdown({
  downloadUrl,
}: Props) {
  const [time, setTime] = useState(5);

  useEffect(() => {
    if (time <= 0) return;

    const timer = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  const progress = ((5 - time) / 5) * 100;

  return (
    <>
      <div className="mt-8 text-6xl font-extrabold text-green-500">
        {time > 0 ? time : "✓"}
      </div>

      <div className="mt-8 h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full bg-green-500 transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-8">

        {time > 0 ? (

          <button
            disabled
            className="cursor-not-allowed rounded-xl bg-zinc-700 px-8 py-4 font-bold opacity-50"
          >
            Wait {time}s...
          </button>

        ) : (

          <a
            href={downloadUrl}
            className="rounded-xl bg-green-600 px-8 py-4 font-bold transition hover:bg-green-700"
          >
            ⬇ Download MOD APK
          </a>

        )}

      </div>
    </>
  );
}