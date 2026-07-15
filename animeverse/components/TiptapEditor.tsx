"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

interface TiptapEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function TiptapEditor({
    value,
    onChange,
}: TiptapEditorProps) {

    const editor = useEditor({

        immediatelyRender: false,

        extensions: [

            StarterKit.configure({

                heading: {

                    levels: [1, 2, 3],

                },

            }),

            Placeholder.configure({

                placeholder:
                    "Write your game description...",

            }),

        ],

        content: value || "",

        editorProps: {

            attributes: {

                class:
                    "prose prose-invert max-w-none min-h-[500px] p-6 focus:outline-none",

            },

        },

        onUpdate({ editor }) {

            onChange(editor.getHTML());

        },

    });

    useEffect(() => {

        if (!editor) return;

        if (editor.getHTML() !== value) {

           editor.commands.setContent(value || "");

        }

    }, [editor, value]);

    if (!editor) return null;

    return (

        <div className="overflow-hidden rounded-xl border border-zinc-700 bg-[#111111]">

            {/* Toolbar */}

            <div className="flex flex-wrap gap-2 border-b border-zinc-700 bg-zinc-900 p-3">

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    className="rounded bg-zinc-800 px-3 py-2 text-white hover:bg-orange-500"
                >
                    H1
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className="rounded bg-zinc-800 px-3 py-2 text-white hover:bg-orange-500"
                >
                    H2
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    className="rounded bg-zinc-800 px-3 py-2 text-white hover:bg-orange-500"
                >
                    H3
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleBold().run()
                    }
                    className="rounded bg-zinc-800 px-3 py-2 font-bold text-white hover:bg-orange-500"
                >
                    Bold
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleItalic().run()
                    }
                    className="rounded bg-zinc-800 px-3 py-2 italic text-white hover:bg-orange-500"
                >
                    Italic
                </button>
                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className="rounded bg-zinc-800 px-3 py-2 text-white hover:bg-orange-500"
                >
                    • List
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className="rounded bg-zinc-800 px-3 py-2 text-white hover:bg-orange-500"
                >
                    1. List
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().undo().run()
                    }
                    className="rounded bg-zinc-800 px-3 py-2 text-white hover:bg-orange-500"
                >
                    Undo
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().redo().run()
                    }
                    className="rounded bg-zinc-800 px-3 py-2 text-white hover:bg-orange-500"
                >
                    Redo
                </button>

            </div>

            <EditorContent
                editor={editor}
                className="
          min-h-[500px]
          bg-[#111111]

          [&_.ProseMirror]:min-h-[500px]
          [&_.ProseMirror]:outline-none
          [&_.ProseMirror]:p-6

          [&_.ProseMirror_h1]:text-4xl
          [&_.ProseMirror_h1]:font-black
          [&_.ProseMirror_h1]:mb-5

          [&_.ProseMirror_h2]:text-3xl
          [&_.ProseMirror_h2]:font-bold
          [&_.ProseMirror_h2]:mt-6
          [&_.ProseMirror_h2]:mb-4

          [&_.ProseMirror_h3]:text-2xl
          [&_.ProseMirror_h3]:font-semibold
          [&_.ProseMirror_h3]:mt-5
          [&_.ProseMirror_h3]:mb-3

          [&_.ProseMirror_p]:text-zinc-300
          [&_.ProseMirror_p]:leading-8
          [&_.ProseMirror_p]:mb-4

          [&_.ProseMirror_ul]:list-disc
          [&_.ProseMirror_ul]:pl-6

          [&_.ProseMirror_ol]:list-decimal
          [&_.ProseMirror_ol]:pl-6

          [&_.ProseMirror_li]:mb-2
        "
            />

        </div>

    );

}