"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useEffect, useRef } from "react";
import {
  IconBold,
  IconItalic,
  IconUnderline,
} from "@tabler/icons-react";

type Props = {
  name: string;
  defaultValue?: string;
};

export default function TiptapEditor({ name, defaultValue = "" }: Props) {
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
    ],
    immediatelyRender: false,
    content: defaultValue,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (hiddenInputRef.current) hiddenInputRef.current.value = html;
    },
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  if (!editor) return null;

  const baseBtn =
    "w-8 h-8 flex items-center justify-center rounded hover:bg-muted border p-1";

  return (
    <div className="border rounded-md p-2">
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={baseBtn}
          aria-label="Bold"
        >
          <IconBold size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={baseBtn}
          aria-label="Italic"
        >
          <IconItalic size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={baseBtn}
          aria-label="Underline"
        >
          <IconUnderline size={16} />
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="prose max-w-full min-h-[120px] focus:outline-none"
      />

      <input ref={hiddenInputRef} type="hidden" name={name} value={defaultValue} />
    </div>
  );
}
