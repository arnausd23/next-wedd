// @ts-nocheck
import classNames from "classnames";
import { useCallback, useState } from "react";
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
import Dropdown from "./Dropdown";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";

export const sizes = [
  {
    label: <span>8px</span>,
    key: "8",
  },
  {
    label: <span>9px</span>,
    key: "9",
  },
  {
    label: <span>10px</span>,
    key: "10",
  },
  {
    label: <span>12px</span>,
    key: "12",
  },
  {
    label: <span>14px</span>,
    key: "14",
  },
  {
    label: <span>16px</span>,
    key: "16",
  },
  {
    label: <span>18px</span>,
    key: "18",
  },
  {
    label: <span>20px</span>,
    key: "20",
  },
  {
    label: <span>24px</span>,
    key: "24",
  },
  {
    label: <span>30px</span>,
    key: "30",
  },
  {
    label: <span>36px</span>,
    key: "36",
  },
  {
    label: <span>48px</span>,
    key: "48",
  },
  {
    label: <span>60px</span>,
    key: "60",
  },
  {
    label: <span>72px</span>,
    key: "72",
  },
  {
    label: <span>96px</span>,
    key: "96",
  },
];

function SimpleEditor({ placeholder, onChange, value }) {
  const [fontSize, setFontSize] = useState("16");

  const editor = useEditor({
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
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
      BulletList,
      ListItem,
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

  const toggleBulletList = useCallback(() => {
    editor.chain().focus().toggleBulletList().run();
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
        <Dropdown
          items={sizes}
          onClick={(e) => {
            editor.chain().focus().setFontSize(`${e.key}px`).run();
            setFontSize(e.key);
          }}
          buttonText={`${fontSize}px`}
        />
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
          className={classNames("menu-button", {
            "is-active": editor.isActive("bulletList"),
          })}
          onClick={toggleBulletList}
        >
          <Icons.BulletList />
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
