import { Editor, Element } from "slate";
import isUrl from "is-url";
import { TypesetUtil } from "../utils/TypesetUtil";

export const withInline = (editor: Editor) => {
  const {
    insertData,
    insertText,
    isInline,
    isElementReadOnly,
    isSelectable,
  } = editor;

  const inlineTypes: (string | null)[] = [ 
    "inline-math", 
    "link",
  ];

  editor.isInline = element =>
    inlineTypes.includes(element.type) || isInline(element);

  editor.isElementReadOnly = element =>
    element.type === "inline-math" || isElementReadOnly(element);

  editor.isSelectable = element =>
    element.type !== "inline-math" && isSelectable(element);

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