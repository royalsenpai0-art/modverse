"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ViewCounter({ id }: { id: number }) {
    useEffect(() => {
        const key = `viewed-${id}`;

        if (localStorage.getItem(key)) return;

        async function updateView() {
            const { data } = await supabase
                .from("games")
                .select("views")
                .eq("id", id)
                .single();

            if (!data) return;

            await supabase
                .from("games")
                .update({
                    views: (data.views || 0) + 1,
                })
                .eq("id", id);

            localStorage.setItem(key, "true");
        }

        updateView();
    }, [id]);

    return null;
}