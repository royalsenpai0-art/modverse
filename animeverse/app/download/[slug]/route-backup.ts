import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";


export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    // Get Game
    const { data: game } = await supabase
        .from("games")
        .select("*")
        .eq("slug", decodeURIComponent(slug))
        .single();

    if (!game) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Increase Download Counter
    await supabase
        .from("games")
        .update({
            downloads: (game.downloads || 0) + 1,
        })
        .eq("id", game.id);

    // Redirect to MOD APK
    return NextResponse.redirect(game.mod_link);
}
