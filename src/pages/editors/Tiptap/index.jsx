import { Button } from "@material-tailwind/react";
import CharacterCount from "@tiptap/extension-character-count";
import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Gapcursor from "@tiptap/extension-gapcursor";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useState } from "react";
import { BiBold, BiCode, BiItalic, BiStrikethrough } from "react-icons/bi";
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuRedo,
  LuUndo,
} from "react-icons/lu";
import {
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdOutlineLink,
  MdOutlineLinkOff,
} from "react-icons/md";
import { RiParagraph } from "react-icons/ri";
import "./styles/style.scss";

const MenuBar = ({ editor }) => {
  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  const menuButtons = [
    {
      name: "undo",
      disabled: !editor.can().chain().focus().undo().run(),
      onclick: () => editor.chain().focus().undo().run(),
      class: `flex justify-center items-center w-10 h-10 border border-blue-300 rounded-md`,
      icon: <LuUndo size="1.3rem" className="w-12" />,
    },
    {
      name: "redo",
      disabled: !editor.can().chain().focus().redo().run(),
      onclick: () => editor.chain().focus().redo().run(),
      class: `flex justify-center items-center w-10 h-10 border border-blue-300 rounded-md`,
      icon: <LuRedo size="1.3rem" className="w-12" />,
    },
    {
      name: "bold",
      disabled: !editor.can().chain().focus().toggleBold().run(),
      onclick: () => editor.chain().focus().toggleBold().run(),
      class: `flex justify-center items-center w-10 h-10 border border-blue-300 rounded-md ${
        editor.isActive("bold") ? "bg-blue-200 " : ""
      }`,
      icon: <BiBold size="1.3rem" className="w-12" />,
    },
    {
      name: "italic",
      disabled: !editor.can().chain().focus().toggleItalic().run(),
      onclick: () => editor.chain().focus().toggleItalic().run(),
      class: `flex justify-center items-center w-10 h-10 border border-blue-300 rounded-md ${
        editor.isActive("italic") ? "bg-blue-200 " : ""
      }`,
      icon: <BiItalic size="1.3rem" className="w-12" />,
    },
    {
      name: "strike",
      disabled: !editor.can().chain().focus().toggleStrike().run(),
      onclick: () => editor.chain().focus().toggleStrike().run(),
      class: `flex justify-center items-center w-10 h-10 border border-blue-300 rounded-md ${
        editor.isActive("strike") ? "bg-blue-200 " : ""
      }`,
      icon: <BiStrikethrough size="1.3rem" className="w-12" />,
    },
    {
      name: "code",
      disabled: !editor.can().chain().focus().toggleCode().run(),
      onclick: () => editor.chain().focus().toggleCode().run(),
      class: `flex justify-center items-center w-10 h-10 border border-blue-300 rounded-md ${
        editor.isActive("code") ? "bg-blue-200 " : ""
      }`,
      icon: <BiCode size="1.3rem" className="w-12" />,
    },
    {
      name: "paragraph",
      disabled: !editor.can().chain().focus().toggleCode().run(),
      onclick: () => editor.chain().focus().setParagraph().run(),
      class: `flex justify-center items-center w-10 h-10 border border-blue-300 rounded-md ${
        editor.isActive("paragraph") ? "bg-blue-200 " : ""
      }`,
      icon: <RiParagraph size="1.3rem" className="w-12" />,
    },
    {
      name: "heading",
      onclick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      class: `flex justify-center items-center w-10 h-10 border border-blue-300 rounded-md ${
        editor.isActive("heading", { level: 1 }) ? "bg-blue-200" : ""
      }`,
      icon: <LuHeading1 size="1.3rem" className="w-12" />,
    },
    {
      name: "heading",
      onclick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      class: ` ${
        editor.isActive("heading", { level: 2 }) ? "bg-blue-200" : ""
      }`,
      icon: <LuHeading2 size="1.3rem" className="w-12" />,
    },
    {
      name: "heading",
      onclick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      class: `flex justify-center items-center w-10 h-10 border border-blue-300 rounded-md ${
        editor.isActive("heading", { level: 3 }) ? "bg-blue-200" : ""
      }`,
      icon: <LuHeading3 size="1.3rem" className="w-12" />,
    },
    {
      name: "bullet-list",
      onclick: () => editor.chain().focus().toggleBulletList().run(),
      class: `flex justify-center items-center w-10 h-10 border border-blue-300 rounded-md ${
        editor.isActive("bulletList") ? "bg-blue-200 " : ""
      }`,
      icon: <MdFormatListBulleted size="1.3rem" className="w-12" />,
    },
    {
      name: "ordered-list",
      onclick: () => editor.chain().focus().toggleOrderedList().run(),
      class: `flex justify-center items-center w-10 h-10 border border-blue-300 rounded-md ${
        editor.isActive("orderedList") ? "bg-blue-200 " : ""
      }`,
      icon: <MdFormatListNumbered size="1.3rem" className="w-12" />,
    },
    {
      name: "link",
      onclick: setLink,
      class: `flex justify-center items-center w-10 h-10 border border-blue-300 rounded-md ${
        editor.isActive("link") ? "bg-blue-200 " : ""
      }`,
      icon: <MdOutlineLink size="1.3rem" className="w-12" />,
    },
    {
      name: "link",
      onclick: () => editor.chain().focus().unsetLink().run(),
      class: ` ${editor.isActive("link") ? "bg-blue-200 " : ""}`,
      disabled: !editor.isActive("link"),
      icon: <MdOutlineLinkOff size="1.3rem" className="w-12" />,
    },
  ];
  return (
    <div className="sticky top-0 z-10 flex flex-wrap gap-2 rounded-t-md bg-slate-100 p-2">
      {menuButtons.map((btn, i) => (
        <Button
          key={i}
          onClick={(e) => {
            e.preventDefault();
            btn.onclick();
          }}
          disabled={btn.disabled ? btn.disabled : ""}
          className={btn.class}
          variant="outlined"
        >
          {btn.icon}
        </Button>
      ))}
    </div>
  );
};

export default function Tiptap() {
  const [value, setValue] = useState();
  const editor = useEditor(
    {
      extensions: [
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextStyle.configure({ types: [ListItem.name] }),
        CharacterCount.configure({
          limit: 100000,
        }),
        StarterKit.configure({
          bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
          },
          orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
          },
        }),
        Link.configure({
          openOnClick: true,
          autolink: true,
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Image.configure({
          inline: true,
          allowBase64: true,
        }),
        Underline.configure({
          HTMLAttributes: {
            class: "my-custom-class",
          },
        }),
        Highlight,
        Document,
        Paragraph,
        Text,
        Gapcursor,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
      ],
      editorProps: {
        attributes: {
          class: "m-2 focus:outline-none",
        },
      },
      content: value,
      onUpdate({ editor }) {
        setValue?.(editor?.getHTML?.());
      },
    },
    [] // TODO: Conditional dependency is not allowed in React, it may lead to unexpected behavior and bugs. It was created by developer who worked before me(Dipta Sikder)
  );

  return (
    <div className="relative rounded-md border-2 border-blue-200">
      <MenuBar editor={editor} />
      <EditorContent className={`w-full overflow-auto p-3`} editor={editor} />
      {/* {showWordCount && (
        <div className="rounded-b-md bg-slate-100 pl-2 font-semibold">
          {editor?.storage?.characterCount?.words()} Words
        </div>
      )} */}
    </div>
  );
}
