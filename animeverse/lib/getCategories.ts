import { supabase } from "@/lib/supabase";

export async function getCategories() {
    const { data } = await supabase
        .from("games")
        .select("category");

    const categories = [...new Set((data ?? []).map((item) => item.category))];

    return categories;
}