// @ts-nocheck
import classNames from "classnames";
import { useCallback } from "react";
import "./styles.css";
// => Tiptap packages
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
// Custom

import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import TextStyle from "@tiptap/extension-text-style";
import * as Icons from "../Icons/Editor/EditorIcons";
import { FontSize } from "./FontSize";

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
      TextStyle,
      FontSize,
      Bold,
      Underline,
      Italic,
      Strike,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Color.configure({
        types: ["textStyle"],
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
          onClick={() => editor.chain().focus().setFontSize(`120px`).run()}
        >
          Grande
        </button>
        <input
          className="cursor-pointer"
          type="color"
          onInput={(event) =>
            editor.chain().focus().setColor(event.target.value).run()
          }
          value={editor.getAttributes("textStyle").color}
          data-testid="setColor"
        />
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

      <EditorContent editor={editor} />
    </div>
  );
}

export default SimpleEditor;
