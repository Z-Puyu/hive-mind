import { Editor, Text, Element, Transforms, Range } from "slate";
import { LinkElem } from "./CustomSlateTypes";

export const TypesetUtil = {
  isMarkActive: (editor: Editor, mark: keyof Omit<Text, "text">) => {
    const marks: Omit<Text, "text"> | null = Editor.marks(editor);
    return marks ? marks[mark] === true : false;
  },

  toggleMark: (editor: Editor, mark: keyof Omit<Text, "text">) => {
    if (TypesetUtil.isMarkActive(editor, mark)) {
      Editor.removeMark(editor, mark);
    } else {
      Editor.addMark(editor, mark, true);
    }
  },

  isInlineActive: (editor: Editor, inlineType: string) => {
    const [inlineCode] = Editor.nodes(editor, {
      match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === inlineType,
    });
    return !!inlineCode;
  },

  unwrapInline: (editor: Editor, inlineType: string) => {
    Transforms.unwrapNodes(editor, {
      match: n =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === inlineType,
    })
  },

  wrapLink: (editor: Editor, linkUrl: string) => {
    if (TypesetUtil.isInlineActive(editor, "link")) {
      TypesetUtil.unwrapInline(editor, "link");
    }
    const { selection } = editor;
    if (!!selection && Range.isCollapsed(selection)) {
      Transforms.insertNodes(editor, {
        type: "link",
        url: linkUrl,
        children: [{ text: linkUrl }],
      });
    } else {
      Transforms.wrapNodes(editor, {
        type: "link",
        url: linkUrl,
        children: [],
      }, { split: true });
      Transforms.collapse(editor, { edge: "end" });
    }
  },

  toggleLink: (editor: Editor) => {
    if (!TypesetUtil.isInlineActive(editor, "link")) {
      const url = window.prompt('Enter the URL of the link:');
      if (!!url && !!editor.selection) {
        TypesetUtil.wrapLink(editor, url);
      }
    } else {
      Transforms.unwrapNodes(editor, {
        match: n =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
      });
    }
  },

  /* toggleInline: (editor: Editor, inlineType: string, initValue: string | null, 
    linkedUrl?: string | null) => {
    if (TypesetUtil.isInlineActive(editor, inlineType)) {
      Transforms.unwrapNodes(editor, {
        match: n =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === inlineType,
      });
    } else if (!!editor.selection) {
      const { selection } = editor
      if (!!selection && Range.isCollapsed(selection)) {
        Transforms.insertNodes(editor, {
          type: inlineType,
          url: !!linkedUrl ? linkedUrl : undefined,
          children: [{ text: !!initValue ? initValue : "" }],
        });
      } else {
        Transforms.wrapNodes(editor, {
          type: inlineType,
          children: [],
        }, { split: true });
        Transforms.collapse(editor, { edge: "end" });
      }
    }
  }, */

  insertInlineMath: (editor: Editor) => {
    if (editor.selection) {
      const { selection } = editor;
      if (!!selection && Range.isCollapsed(selection)) {
        Transforms.insertNodes(editor, {
          type: "inline-math",
          children: [{ text: "" }],
        });
      }
    }
  },
};