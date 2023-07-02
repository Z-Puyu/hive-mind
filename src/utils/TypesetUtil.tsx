import { Editor, Text, Element, Transforms, Range, isEmpty, Node } from "slate";
import { MathElem } from "./CustomSlateTypes";
import { nanoid } from "nanoid";

export const TypesetUtil = {
  isMarkActive: (editor: Editor, mark: keyof Omit<Text, "text">) => {
    const marks: Omit<Text, "text"> | null = Editor.marks(editor);
    return marks ? marks[mark] === true : false;
  },

  toggleMark: (editor: Editor, mark: keyof Omit<Text, "text">) => {
    if (mark === "roman") {
      Editor.removeMark(editor, "bold");
      Editor.removeMark(editor, "italic");
    } else {
      if (TypesetUtil.isMarkActive(editor, mark)) {
        Editor.removeMark(editor, mark);
      } else {
        Editor.addMark(editor, mark, true);
      }
    }
  },

  isBlockActive: (editor: Editor, blockType: string) => {
    const { selection } = editor;
    if (!!selection) {
      // If a selection exists, we check if it contains any block with the matching type.
      const [matchingBlock] = Array.from(
        Editor.nodes(editor, {
          at: Editor.unhangRange(editor, selection),
          match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === blockType,
        })
      );
      return !!matchingBlock;
    }
    return false;
  },

  toggleBlock: (editor: Editor, blockType: string, thmStyle?: string) => {
    let newProperties: Partial<Element>;
    if (TypesetUtil.isBlockActive(editor, blockType) && blockType !== "thm") {
      newProperties = {
        type: "paragraph",
      };
    } else {
      newProperties = {
        type: blockType,
        style: thmStyle && ["thm", "dfn", "remark", "eg", "problem"].includes(thmStyle)
          ? thmStyle as "thm" | "dfn" | "remark" | "eg" | "problem"
          : undefined,
      };
    }
    Transforms.setNodes(editor, newProperties);
    /* const { selection } = editor;
    if (!!selection && Range.isCollapsed(selection)) {
      Transforms.insertNodes(editor, {
        id: nanoid(),
        type: blockType,
        children: [{ text: "" }],
      });
    } else {
      let newProperties: Partial<Element>;
      if (TypesetUtil.isBlockActive(editor, blockType)) {
        newProperties = {
          type: "paragraph",
        };
      } else {
        newProperties = {
          type: blockType,
        };
      }
      Transforms.setNodes(editor, newProperties);
    } */
  },

  /**
   * Checks whether the current selection contains an active inline element.
   * 
   * @param editor The editor that is currently being focused.
   * @param inlineType The type of the inline element to check for.
   * @returns Returns true if the array of matching inline element found within
   *          the current selection is non-empty.
   */
  isInlineActive: (editor: Editor, inlineType: string) => {
    const [inline] = Editor.nodes(editor, {
      match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === inlineType,
    });
    return !!inline;
  },

  /**
   * Detect any inline elements within the current selection and unwrap them
   * into normal texts.
   * 
   * @param editor The editor that is currently being focused
   * @param inlineType The type of inline element to search for.
   */
  unwrapInline: (editor: Editor, inlineType: string) => {
    Transforms.unwrapNodes(editor, {
      match: n =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === inlineType,
    });
  },

  wrapLink: (editor: Editor, linkUrl: string) => {
    if (TypesetUtil.isInlineActive(editor, "link")) {
      TypesetUtil.unwrapInline(editor, "link");
    }
    const { selection } = editor;
    if (!!selection && Range.isCollapsed(selection)) {
      // If the current selection is empty, insert a new link.
      Transforms.insertNodes(editor, {
        id: nanoid(),
        type: "link",
        url: linkUrl,
        children: [{ text: linkUrl }],
      });
    } else {
      // Otherwise, append the url to the currently selected texts.
      Transforms.wrapNodes(editor, {
        id: nanoid(),
        type: "link",
        url: linkUrl,
        children: [],
      }, { split: true });
      Transforms.collapse(editor, { edge: "end" });
    }
  },

  toggleLink: (editor: Editor) => {
    if (!TypesetUtil.isInlineActive(editor, "link")) {
      const url = window.prompt("Enter the URL of the link:");
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

  toggleCode: (editor: Editor, isInline: boolean) => {
    if (!TypesetUtil.isInlineActive(editor, "code")) {
      if (!!editor.selection) {
        const { selection } = editor;
        if (!!selection && Range.isCollapsed(selection)) {
          Transforms.insertNodes(editor, {
            id: nanoid(),
            type: "code",
            inline: isInline ? true : undefined,
            children: [{ text: "" }],
          });
        } else {
          Transforms.wrapNodes(editor, {
            id: nanoid(),
            type: "code",
            inline: isInline ? true : undefined,
            children: [],
          }, { split: true });
          Transforms.collapse(editor, { edge: "end" });
        }
      }
    } else {
      Transforms.unwrapNodes(editor, {
        match: n =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === "code",
      });
    }
  },

  insertBookmark: (editor: Editor) => {
    if (editor.selection) {
      Transforms.insertNodes(editor, {
        id: nanoid(),
        type: "bookmark",
        title: "bookmark",
        customDesc: "",
        children: [{
          text: "bookmark"
        }],
      });
    }
  },

  toggleMath: (editor: Editor, isInline: boolean) => {
    if (!TypesetUtil.isInlineActive(editor, "math")) {
      if (!!editor.selection) {
        const { selection } = editor;
        if (!!selection && Range.isCollapsed(selection)) {
          const math: MathElem = {
            id: nanoid(),
            type: "math",
            inline: isInline,
            environment: isInline ? undefined : "equation*",
            children: [{
              text: isInline ? "$$" : "",
            }],
          };
          Transforms.insertNodes(editor, math);
          if (isInline) {
            Transforms.move(editor, { distance: 1, unit: "offset", reverse: true });
          }
        }
        // Wrapping is to be implemented.
        /* else {
          Transforms.wrapNodes(editor, {
            type: "math",
            children: [],
          }, { split: true });
          Transforms.collapse(editor, { edge: "end" });
        } */
      }
    } else {
      Transforms.unwrapNodes(editor, {
        match: n =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === "math",
      });
    }
  },

  isEmptyInline: (editor: Editor, node?: Node) => {
    const n: Node = node ? node : Editor.parent(editor, editor.selection?.anchor!)[0];
    return !Editor.isEditor(n)
      && Element.isElement(n)
      && editor.isInline(n)
      && n.children.length === 1
      && n.children[0].text === "";
  },

  removeEmptyInlines: (editor: Editor) => {
    const { selection } = editor;
    if (selection && Range.isCollapsed(selection)) {
      Transforms.unwrapNodes(editor, {
        match: n => TypesetUtil.isEmptyInline(editor, n),
      });
    }
  },
};