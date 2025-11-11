"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBarEditor from "./MenuBarEditor";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlock from "@tiptap/extension-code-block";
import { useState } from "react";

type RichTextEditorProps = {
  value: string;
  onChange: (content: string) => void;
};

const MAX_LENGTH = 1200;

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [charCount, setCharCount] = useState(0);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: { class: "list-disc ml-4" },
        },
        orderedList: {
          HTMLAttributes: { class: "list-decimal ml-4" },
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CodeBlock,
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[180px] max-w-full rounded-md border border-gray-blue bg-white px-4 py-3 text-gray-dark focus:outline-none focus:ring-2 focus:ring-blue-primary focus:border-blue-primary transition-all duration-200 prose prose-sm sm:prose-base",
      },
    },
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      setCharCount(text.length);

      if (text.length > MAX_LENGTH) {
        const trimmedText = text.slice(0, MAX_LENGTH);
        editor.commands.setContent(trimmedText);
      }

      onChange(editor.getHTML());
    },
  });

  return (
    <div>
      <MenuBarEditor editor={editor} />
      <EditorContent editor={editor} />
      <p className="text-sm mt-1 text-gray-500">
        {charCount} / {MAX_LENGTH} caracteres
      </p>
    </div>
  );
}
