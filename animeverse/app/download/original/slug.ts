import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    const { data: game } = await supabase
        .from("games")
        .select("*")
        .eq("slug", decodeURIComponent(slug))
        .single();

    if (!game) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.redirect(game.original_link);
}