"use client";

import { supabase } from "@/lib/supabase";

export default async function increaseDownload(id: number) {

    const key = `download-${id}`;

    if (localStorage.getItem(key)) return;

    const { data } = await supabase
        .from("games")
        .select("downloads")
        .eq("id", id)
        .single();

    if (!data) return;

    await supabase
        .from("games")
        .update({
            downloads: (data.downloads || 0) + 1,
        })
        .eq("id", id);

    localStorage.setItem(key, "true");
}