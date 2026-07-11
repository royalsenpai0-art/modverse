"use client";

import { useEffect, useState } from "react";

export default function WhatsAppSticky() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hidden = localStorage.getItem("hide-whatsapp-box");

    if (!hidden) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  function closeBox() {
    setShow(false);

    localStorage.setItem("hide-whatsapp-box", "true");
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 rounded-2xl border border-green-700 bg-[#111111] p-4 shadow-2xl md:right-6 md:left-auto md:translate-x-0">

      <button
        onClick={closeBox}
        className="absolute right-3 top-3 text-zinc-400 hover:text-white"
      >
        ✕
      </button>

      <div className="flex items-center gap-3">

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-3xl">
          💬
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">
            Join WhatsApp Channel
          </h3>

          <p className="text-sm text-zinc-400">
            Get latest MOD APK updates, new games & instant notifications.
          </p>
        </div>

      </div>

      <a
        href="https://whatsapp.com/channel/0029Vacaj86Jf05WDiSVGo15"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-green-600 text-lg font-bold text-white transition hover:bg-green-500"
      >
        🚀 Join Now
      </a>

    </div>
  );
}