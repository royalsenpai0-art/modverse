import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "MODVerse",
        short_name: "MODVerse",

        description:
            "Download the latest MOD APK Games for Android with Unlimited Money, Premium Features and Safe Downloads.",

        start_url: "/",

        display: "standalone",

        background_color: "#0f172a",

        theme_color: "#16a34a",

        orientation: "portrait",

        lang: "en",

        categories: [
            "games",
            "entertainment",
            "utilities",
        ],

        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
            {
                src: "/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    };
}