import { Editor, Text, Element, Transforms, Range } from "slate";
import { InlineMathElem } from "./CustomSlateTypes";

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
    const [inlineElem] = Editor.nodes(editor, {
      match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === inlineType,
    });
    return !!inlineElem;
  },

  toggleInline: (editor: Editor, inlineType: string) => {
    if (TypesetUtil.isInlineActive(editor, inlineType)) {
      Transforms.unwrapNodes(editor, {
        match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === inlineType,
      });
    } else {
      const { selection } = editor;
      const isCollapsed: boolean | null = !!selection && Range.isCollapsed(selection);
      const inline: Element = {
        type: inlineType,
        children: isCollapsed ? [{ text: "" }] : [],
      }
      if (isCollapsed) {
        Transforms.insertNodes(editor, inline)
      } else {
        Transforms.wrapNodes(editor, inline, { split: true })
        Transforms.collapse(editor, { edge: "end" })
      }
    }
  },

  insertInline: (editor: Editor, inlineType: string) => {
    if (editor.selection) {
      TypesetUtil.toggleInline(editor, inlineType);
    }
  },

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