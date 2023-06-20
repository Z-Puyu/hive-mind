import { Editor, Transforms, Element, elementReadOnly } from "slate";
import isUrl from "is-url";
import { TypesetUtil } from "../utils/TypesetUtil";
import { nanoid } from "nanoid";

export const withInline = (editor: Editor) => {
  const {
    insertData,
    insertText,
    isInline,
    isSelectable,
    isElementReadOnly,
  } = editor;

  const inlineTypes: (string | null)[] = [
    "link",
    "math",
    "code",
    "cmd",
    "bookmark"
  ];

  editor.isInline = element =>
    inlineTypes.includes(element.type) || isInline(element);

  editor.isSelectable = element =>
    element.type !== "bookmark" && isSelectable(element);

  editor.isElementReadOnly = element => 
    element.type === "bookmark" || isElementReadOnly(element);

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
};

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
        id: nanoid(),
        children: [{ text: "" }],
        type: "paragraph"
      });
    }
  }

  return editor;
};

export const withNodeUids = (editor: Editor) => {
  const { apply } = editor;
  /* const assignId = (node: Node) => {
    if (Element.isElement(node)) {
      node.id = "";
      node.children.forEach(child => assignId(child as Node));
    }
  } */
  editor.apply = (operation) => {
    /* if (operation.type === "insert_node") {
      if (Element.isElement(operation.node)) {
        operation.node.id = nanoid();
      }
      return apply(operation);
    } */
    if (operation.type === "split_node") {
      (operation.properties as Partial<Element>).id = "";
      return apply(operation);
    }
    return apply(operation);
  };
  return editor;
};