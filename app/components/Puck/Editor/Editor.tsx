// @ts-nocheck
import "./styles.css";
import React, { useCallback, useState } from "react";
import classNames from "classnames";
// => Tiptap packages
import { useEditor, EditorContent, Editor, BubbleMenu } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import History from "@tiptap/extension-history";
// Custom

import * as Icons from "../Icons/Editor/EditorIcons";
import Heading from "@tiptap/extension-heading";

function SimpleEditor({ placeholder, onChange, value }) {
  const editor = useEditor({
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    extensions: [
      Document,
      History,
      Paragraph,
      Heading,
      Text,
      Bold,
      Underline,
      Italic,
      Strike,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value ? value : placeholder,
  }) as Editor;

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run();
  }, [editor]);

  const toggleAlign = useCallback(
    (align) => {
      editor.chain().focus().setTextAlign(align).run();
    },
    [editor]
  );

  if (!editor) {
    return null;
  }

  return (
    <div className="editor">
      <div className="menu">
        <button
          className="menu-button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Icons.RotateLeft />
        </button>
        <button
          className="menu-button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Icons.RotateRight />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("bold"),
          })}
          onClick={toggleBold}
        >
          <Icons.Bold />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("underline"),
          })}
          onClick={toggleUnderline}
        >
          <Icons.Underline />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("intalic"),
          })}
          onClick={toggleItalic}
        >
          <Icons.Italic />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("strike"),
          })}
          onClick={toggleStrike}
        >
          <Icons.Strikethrough />
        </button>
        <button
          onClick={() => toggleAlign("left")}
          className={classNames("menu-button", {
            "is-active": editor.isActive({ textAlign: "left" }),
          })}
        >
          <Icons.AlignLeft />
        </button>
        <button
          onClick={() => toggleAlign("center")}
          className={classNames("menu-button", {
            "is-active": editor.isActive({ textAlign: "center" }),
          })}
        >
          <Icons.AlignCenter />
        </button>
        <button
          onClick={() => toggleAlign("right")}
          className={classNames("menu-button", {
            "is-active": editor.isActive({ textAlign: "right" }),
          })}
        >
          <Icons.AlignRight />
        </button>
      </div>

      <EditorContent
        editor={editor}
        onUpdate={(e) => {
          console.log(e);
        }}
      />
    </div>
  );
}

export default SimpleEditor;
