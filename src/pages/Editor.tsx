import { MathJaxContext } from "better-react-mathjax";
import { KeyboardEvent, useCallback, useState } from "react";
import { withInline, withBetterBreaks } from "../plugins/SlatePlugins";
import { Editable, RenderElementProps, RenderLeafProps, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { createEditor, Descendant, Editor as SlateEditor, Transforms, Range, Text } from "slate";
import { TypesetUtil } from "../utils/TypesetUtil";
import isHotkey, { isKeyHotkey } from "is-hotkey";
import DynElem from "../components/DynElem";
import Leaf from "../components/Leaf";
import classes from "./Editor.module.css";

export interface TeXBoxItem {
  id: string;
}

const mathjaxConfig = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"]
    ],
    displayMath: [
      ["\\[", "\\]"],
      ["\\begin{displaymath}", "\\end{displaymath}"]
    ]
  }
};

export default function Editor() {
  const [editor] = useState<SlateEditor>(() => withBetterBreaks(
    withInline(
      withHistory(
        withReact(createEditor())
      )
    )
  ));

  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [
        {
          text: "This is a paragraph"
        },
      ],
    },
  ];

  const HOTKEYS: { [key: string]: string } = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+r": "roman",
    "mod+u": "underline",
    "mod+s": "strikethru",
    "mod+`": "code",
  };

  return (
    <div>
      <Slate editor={editor} value={initialValue}>
        <MathJaxContext
          version={3}
          config={mathjaxConfig}
          hideUntilTypeset="first"
        >
          <Editable
            className={classes.notes}
            disableDefaultStyles
            autoFocus
            renderElement={useCallback((props: RenderElementProps) => <DynElem {...props} />, [])}
            renderLeaf={useCallback((props: RenderLeafProps) => <Leaf {...props} />, [])}
            onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
              // Override cursor movement with offset as the unit.
              const { selection } = editor;
              if (selection && Range.isCollapsed(selection)) {
                const { nativeEvent } = event;
                if (isKeyHotkey("left", nativeEvent)) {
                  event.preventDefault();
                  Transforms.move(editor, { unit: "offset", reverse: true });
                  return;
                }
                if (isKeyHotkey("right", nativeEvent)) {
                  event.preventDefault();
                  Transforms.move(editor, { unit: "offset" });
                  return;
                }
              }
              // Insert inline mathematics when pressing "$".
              if (event.key === "$") {
                event.preventDefault();
                TypesetUtil.toggleMath(editor, true);
              }
              // Add marks corresponding to the hotkeys.
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  TypesetUtil.toggleMark(editor, mark as keyof Omit<Text, "text">);
                }
              }
            }}
          />
        </MathJaxContext>
      </Slate>
    </div>
  );
}