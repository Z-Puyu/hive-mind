import { MathJaxContext } from "better-react-mathjax";
import { KeyboardEvent, useCallback, useMemo, useState } from "react";
import { withInline, withBetterBreaks, withNodeUids } from "../plugins/SlatePlugins";
import { Editable, ReactEditor, RenderElementProps, RenderLeafProps, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { createEditor, Descendant, Editor as SlateEditor, Transforms, Range, Text, Element } from "slate";
import { TypesetUtil } from "../utils/TypesetUtil";
import isHotkey, { isKeyHotkey } from "is-hotkey";
import DynElem from "../components/DynElem";
import Leaf from "../components/Leaf";
import classes from "./Editor.module.css";
import SortableElement from "../components/SortableElement";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { nanoid } from "nanoid";
import ReactDOM from "react-dom";
import DraggedContent from "../components/DraggedContent";
import { mathjaxConfig } from "../config/MathJax";

export default function Editor(): JSX.Element {
  const [editor] = useState<SlateEditor>(() => withNodeUids(
    withBetterBreaks(
      withInline(
        withHistory(
          withReact(createEditor())
        )
      )
    )));
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const itemlist = useMemo<string[]>(() => (editor.children as Element[])
    .map((element) => element.id), [editor.children]);

  const activeElement: Descendant | undefined = editor.children
    .find(child => (child as Element).id === activeId);

  const initialValue: Descendant[] = [
    {
      id: nanoid(),
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

  const clearSelection = () => {
    ReactEditor.blur(editor);
    Transforms.deselect(editor);
    window.getSelection()?.empty();
  };

  const onDragStartHandler = (event: DragStartEvent) => {
    if (event.active) {
      clearSelection();
      setActiveId(event.active.id);
    }
  };

  const onDragEndHandler = (event: DragEndEvent) => {
    const overId: UniqueIdentifier | undefined = event.over?.id;
    const overIndex: number = (editor.children as Element[]).findIndex(x => x.id === overId);

    if (overId !== activeId && overIndex !== -1) {
      Transforms.moveNodes(editor, {
        at: [],
        match: (node) => (node as Element).id === activeId,
        to: [overIndex]
      });
    }

    setActiveId(null);
  };

  const renderElementHandler = useCallback((props: RenderElementProps) => {
    const isTopLevel = ReactEditor.findPath(editor, props.element).length === 1;
    return isTopLevel ? <SortableElement {...props} /> : <DynElem {...props} />;
  }, []);

  const renderLeafHandler = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);

  const onKeyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    // Override cursor movement with offset as the unit.
    const { selection } = editor;
    if (selection && Range.isCollapsed(selection)) {
      const { nativeEvent } = event;
      if (isKeyHotkey("left", nativeEvent)) {
        event.preventDefault();
        Transforms.move(editor, { unit: "offset", reverse: true });
      } else if (isKeyHotkey("right", nativeEvent)) {
        event.preventDefault();
        Transforms.move(editor, { unit: "offset" });
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
  };

  return (
    <div>
      <Slate editor={editor} value={initialValue}>
        <DndContext
          onDragStart={onDragStartHandler}
          onDragEnd={onDragEndHandler}
          onDragCancel={() => setActiveId(null)}
        >
          <MathJaxContext
            version={3}
            config={mathjaxConfig}
            hideUntilTypeset="first"
          >
            <SortableContext items={itemlist} strategy={verticalListSortingStrategy}>
              <Editable
                className={classes.notes}
                disableDefaultStyles
                autoFocus
                renderElement={renderElementHandler}
                renderLeaf={renderLeafHandler}
                onKeyDown={onKeyDownHandler}
              />
            </SortableContext>
            {ReactDOM.createPortal(
              <DragOverlay adjustScale={false}>
                {!!activeElement ? <DraggedContent
                  element={activeElement}
                  renderElement={renderElementHandler}
                /> : null}
              </DragOverlay>,
              document.body
            )}
          </MathJaxContext>
        </DndContext>
      </Slate>
    </div>
  );
};