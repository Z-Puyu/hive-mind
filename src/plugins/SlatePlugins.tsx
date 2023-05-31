import { Editor, Element } from "slate";

export const withInlineMath = (editor: Editor) => {
  const {
    insertData,
    insertText,
    isInline,
    isElementReadOnly,
    isSelectable,
  } = editor;

  editor.isInline = element =>
    element.type === "inline-math" || isInline(element)

  editor.isElementReadOnly = element =>
    element.type === "inline-math" || isElementReadOnly(element)

  editor.isSelectable = element =>
    element.type === "inline-math" || isSelectable(element)

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