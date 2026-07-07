"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login(e: React.FormEvent) {
        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert(error.message);
            return;
        }

        alert("Login Successful");
        router.push("/admin");
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-black">
            <form
                onSubmit={login}
                className="w-full max-w-md bg-zinc-900 p-6 rounded-xl"
            >
                <h1 className="text-3xl font-bold mb-6 text-center text-white">
                    Admin Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 rounded mb-4 bg-zinc-800 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 rounded mb-6 bg-zinc-800 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="w-full bg-red-600 p-3 rounded font-bold text-white"
                >
                    Login
                </button>
            </form>
        </main>
    );
}