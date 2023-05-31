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

  isInlineMathActive: (editor: Editor) => {
    const [inlineMath] = Editor.nodes(editor, {
      match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === "inline-math",
    });
    return !!inlineMath;
  },

  toggleInlineMath: (editor: Editor) => {
    if (TypesetUtil.isInlineMathActive(editor)) {
      Transforms.unwrapNodes(editor, {
        match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === "inline-math",
      });
    } else {
      const { selection } = editor;
      const isCollapsed: boolean | null = selection && Range.isCollapsed(selection);
      const inlineMath: InlineMathElem = {
        type: "inline-math",
        children: isCollapsed ? [{ text: "" }] : [],
      }

      if (selection && Range.isCollapsed(selection)) {
        Transforms.insertNodes(editor, inlineMath)
      } else {
        Transforms.wrapNodes(editor, inlineMath, { split: true })
        Transforms.collapse(editor, { edge: "end" })
      }
    }
  },

  insertInlineMath: (editor: Editor) => {
    if (editor.selection) {
      TypesetUtil.toggleInlineMath(editor);
    }
  }
};