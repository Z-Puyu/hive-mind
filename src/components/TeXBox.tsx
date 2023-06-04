import { useState, useCallback, useMemo, KeyboardEvent, Fragment } from "react";
import { Descendant, createEditor, Editor, Text, Transforms, Range, Node } from "slate";
import { withReact, Slate, Editable, RenderElementProps, RenderLeafProps, useSlate } from "slate-react";
import { withHistory } from "slate-history";
import Leaf from "./Leaf";
import isHotkey, { isKeyHotkey } from "is-hotkey";
import { TypesetUtil } from "../utils/TypesetUtil";
import { TeXBoxItem } from "../pages/Editor";
import DynElem from "./DynElem";
import { withInline } from "../plugins/SlatePlugins";
import Toolbar from "../interface/Toolbar";
import FormatButton from "./FormatButton";
import ToggleInlineMathButton from "./ToggleInlineMathButton";
import ToggleInlineButton from "./ToggleLinkButton";

interface TeXBoxProps {
  id: string;
  onAddBox: (box: TeXBoxItem) => void;
  // onUpdatePage: (box: TeXBoxItem) => void;
  onDeleteBox: (box: TeXBoxItem) => void;
}

const HOTKEYS: { [key: string]: string } = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+r": "roman",
  "mod+u": "underline",
  "mod+s": "strikethru",
  "mod+`": "code",
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: ""
      },
    ],
  },
];

export default function TeXBox(props: TeXBoxProps): JSX.Element {
  /* Copied from the example from the official documentation of Slate.js.
  Some sources online uses React.useMemo instead, not sure what the difference is. */
  const [editor] = useState<Editor>(() => withInline(withHistory(withReact(createEditor()))));
  /* Auto-focus when a new box is created.
  Copied from Stack Overflow. No idea how it works. */
  useMemo(() => {
    Transforms.select(editor, { offset: 0, path: [0, 0] });
  }, []);

  return (
    <div>
      <Slate editor={editor} value={initialValue}>
        <Toolbar>
          <FormatButton mark="bold" editor={editor} />
          <FormatButton mark="italic" editor={editor} />
          <FormatButton mark="underline" editor={editor} />
          <FormatButton mark="strikethru" editor={editor} />
          <FormatButton mark="code" editor={editor} />
          <ToggleInlineButton />
          <ToggleInlineMathButton />
        </Toolbar>
        <Editable
          disableDefaultStyles
          className="display-box"
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
            // Add new box when pressing Enter.
            if (!event.shiftKey && event.key === "Enter") {
              event.preventDefault();
              props.onAddBox({ id: props.id });
            }
            // Delete current box when pressing shift+Backspace.
            if (event.shiftKey && event.key === "Backspace") {
              event.preventDefault();
              props.onDeleteBox({ id: props.id });
            }
            // Insert inline mathematics when pressing "$".
            if (event.key === "$") {
              event.preventDefault();
              TypesetUtil.toggleInlineMath(editor);
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
      </Slate>
    </div>
  );
}