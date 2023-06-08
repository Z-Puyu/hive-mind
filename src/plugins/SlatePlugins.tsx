import { Editor, Transforms } from "slate";
import isUrl from "is-url";
import { TypesetUtil } from "../utils/TypesetUtil";

export const withInline = (editor: Editor) => {
  const {
    insertData,
    insertText,
    isInline,
    isSelectable,
  } = editor;

  const inlineTypes: (string | null)[] = [
    "link",
    "math",
    "code",
  ];

  editor.isInline = element =>
    inlineTypes.includes(element.type) || isInline(element);

  editor.isSelectable = element =>
    inlineTypes.includes(element.type) || isSelectable(element);

  editor.insertText = (text: string) => {
    if (!!text && isUrl(text)) {
      TypesetUtil.wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data: DataTransfer) => {
    const text = data.getData('text/plain');
    if (!!text && isUrl(text)) {
      TypesetUtil.wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
}

export const withBetterBreaks = (editor: Editor) => {
  const {
    insertSoftBreak,
    insertBreak,
  } = editor;

  editor.insertSoftBreak = () => {
    Editor.insertText(editor, "\n");
  };

  editor.insertBreak = () => {
    const { selection } = editor;
    if (!!selection) {
      Transforms.insertNodes(editor, {
        children: [{ text: "" }],
        type: "paragraph"
      });
    }
  }

  return editor;
}