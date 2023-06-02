import { Editor, Element } from "slate";

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
    "inline-code",
  ];

  editor.isInline = element =>
    inlineTypes.includes(element.type) || isInline(element);

  editor.isElementReadOnly = element =>
    element.type === "inline-math" || isElementReadOnly(element);

  editor.isSelectable = element =>
    element.type !== "inline-math" && isSelectable(element);

/*   editor.insertText = text => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  } */

  return editor;
}