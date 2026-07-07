import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {

    try {

        const { id } = await request.json();

        console.log("Game ID:", id);
        const gameId = Number(id);



        if (!id) {
            return NextResponse.json(
                { error: "Missing Game ID" },
                { status: 400 }
            );
        }

        // Current downloads fetch karo
        const { data: game, error } = await supabase
            .from("games")
            .select("downloads")
            .eq("id", gameId)
            .single();

        if (error || !game) {
            return NextResponse.json(
                { error: "Game not found" },
                { status: 404 }
            );
        }

        // Downloads +1
        const { error: updateError } = await supabase
            .from("games")
            .update({
                downloads: (game.downloads ?? 0) + 1,
            })
            .eq("id", gameId);


        if (updateError) {
            return NextResponse.json(
                { error: updateError.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
        });

    } catch (error) {

        return NextResponse.json(
            {
                success: false,
                error: String(error),
            },
            { status: 500 }
        );

    }

}