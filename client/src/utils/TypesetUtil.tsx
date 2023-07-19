import { Editor, Text, Element, Transforms, Range, Node } from "slate";
import { HeadingElem, MathElem, ThmElem } from "./CustomSlateTypes";
import { nanoid } from "nanoid";
import { Utilities } from "./Utilities";
import { ReactEditor } from "slate-react";

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

  isBlockActive: (editor: Editor, blockType: string, optionalProps?: { [key: string]: any }) => {
    const { selection } = editor;
    if (selection) {
      // If a selection exists, we check if it contains any block with the matching type.
      const [matchingBlock] = Array.from(
        Editor.nodes(editor, {
          at: Editor.unhangRange(editor, selection),
          match: n => !Editor.isEditor(n)
            && Element.isElement(n)
            && ((n.type === "thm" && (n as ThmElem).style === optionalProps?.thmStyle)
              || (n.type !== "thm" && n.type === blockType))
            && ((n.type === "heading" && (n as HeadingElem).level === optionalProps?.headingLevel)
              || (n.type !== "heading" && n.type === blockType)),
        })
      );
      return !!matchingBlock;
    }
    return false;
  },

  updateThmIndexes: (editor: Editor) => {
    const listOfThms: ThmElem[] = editor.children
      .filter(child => (child as Element).type === "thm") as ThmElem[];
    let thmIndex: number = 1;
    let currSection: string = "";
    for (const thm of listOfThms) {
      let closestSection: HeadingElem | null = null;
      for (let i: number = editor.children.indexOf(thm); i >= 0; i -= 1) {
        if ((editor.children[i] as Element).type === "heading") {
          closestSection = editor.children[i] as HeadingElem;
          break;
        }
      }
      if (!closestSection || closestSection.level === "part") {
        Transforms.setNodes(editor, { index: `${thmIndex}` },
          { at: ReactEditor.findPath(editor, thm) });
      } else if (closestSection.level === "chapter") {
        const activeSection: string = closestSection.index!.split(" ")[1];
        if (activeSection !== currSection) {
          currSection = closestSection.index!.split(" ")[1]
          thmIndex = 1;
        }
        Transforms.setNodes(editor, { 
          index: `${currSection}.${thmIndex}` 
        }, { at: ReactEditor.findPath(editor, thm) });
      } else {
        const sectionIndex: string[] = closestSection.index!.split(".");
        const activeSection: string = `${sectionIndex[0]}.${sectionIndex[1].trim()}`
        if (activeSection !== currSection) {
          currSection = activeSection;
          thmIndex = 1;
        }
        Transforms.setNodes(editor, { 
          index: `${currSection}.${thmIndex}`
        }, { at: ReactEditor.findPath(editor, thm) });
      }
      thmIndex += 1;
    }
  },

  updateHeadingIndexes: (editor: Editor) => {
    const listOfHeadings: HeadingElem[] = editor.children
      .filter(child => (child as Element).type === "heading") as HeadingElem[];
    const newListOfHeadings: HeadingElem[] = [...listOfHeadings];
    let partIndex: number = 1;
    let sectionIndex: number[] = [0, 0, 0, 0];
    if (listOfHeadings.length > 0 && (listOfHeadings[0].level === "subsection"
      || listOfHeadings[0].level === "subsubsection")) {
      newListOfHeadings[0] = { ...listOfHeadings[0], level: "section" };
    }
    for (let i: number = 0; i < listOfHeadings.length; i += 1) {
      switch (newListOfHeadings[i].level) {
        case "part":
          Transforms.setNodes(
            editor,
            { level: "part", index: `Part ${Utilities.romanise(partIndex)}   ` },
            { at: ReactEditor.findPath(editor, listOfHeadings[i]) }
          )
          if (i + 1 < listOfHeadings.length && (listOfHeadings[i + 1].level === "subsection"
            || listOfHeadings[i + 1].level === "subsubsection")) {
            newListOfHeadings[i + 1] = { ...listOfHeadings[i + 1], level: "section" }
          }
          sectionIndex = [0, 0, 0, 0];
          partIndex += 1;
          break;
        case "chapter":
          sectionIndex = [sectionIndex[0] + 1, 0, 0, 0];
          Transforms.setNodes(
            editor,
            { level: "chapter", index: `Chapter ${sectionIndex[0]}   ` },
            { at: ReactEditor.findPath(editor, listOfHeadings[i]) }
          )
          if (i + 1 < listOfHeadings.length && (listOfHeadings[i + 1].level === "subsection"
            || listOfHeadings[i + 1].level === "subsubsection")) {
            newListOfHeadings[i + 1] = { ...listOfHeadings[i + 1], level: "section" }
          }
          break;
        case "section":
          sectionIndex = [sectionIndex[0], sectionIndex[1] + 1, 0, 0];
          Transforms.setNodes(
            editor,
            {
              level: "section", index: sectionIndex[0] === 0
                ? `${sectionIndex[1]}   `
                : `${sectionIndex[0]}.${sectionIndex[1]}   `
            },
            { at: ReactEditor.findPath(editor, listOfHeadings[i]) }
          )
          if (i + 1 < listOfHeadings.length && listOfHeadings[i + 1].level === "subsubsection") {
            newListOfHeadings[i + 1] = { ...listOfHeadings[i + 1], level: "subsection" }
          }
          break;
        case "subsection":
          sectionIndex = [sectionIndex[0], sectionIndex[1], sectionIndex[2] + 1, 0];
          Transforms.setNodes(
            editor,
            {
              level: "subsection", index: sectionIndex[0] === 0
                ? `${sectionIndex[1]}.${sectionIndex[2]}   `
                : `${sectionIndex[0]}.${sectionIndex[1]}.${sectionIndex[2]}   `
            },
            { at: ReactEditor.findPath(editor, listOfHeadings[i]) }
          )
          break;
        case "subsubsection":
          sectionIndex = [sectionIndex[0], sectionIndex[1], sectionIndex[2], sectionIndex[3] + 1];
          Transforms.setNodes(
            editor,
            {
              level: "subsubsection",
              index: sectionIndex[0] === 0
                ? `${sectionIndex[1]}.${sectionIndex[2]}.${sectionIndex[3]}   `
                : `${sectionIndex[0]}.${sectionIndex[1]}.${sectionIndex[2]}.${sectionIndex[3]}   `
            },
            { at: ReactEditor.findPath(editor, listOfHeadings[i]) }
          )
          break;
        default:
          break;
      }
    }
  },

  toggleBlock: (editor: Editor, blockType: string, optionalProps?: { [key: string]: any }) => {
    let newProperties: Partial<Element>;
    if (TypesetUtil.isBlockActive(editor, blockType, optionalProps)) {
      newProperties = {
        type: "paragraph",
      };
    } else {
      newProperties = {
        type: blockType,
        style: optionalProps?.thmStyle,
        level: optionalProps?.headingLevel
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