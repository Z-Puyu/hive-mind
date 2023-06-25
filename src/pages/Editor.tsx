import { MathJaxContext } from "better-react-mathjax";
import { KeyboardEvent, useCallback, useMemo, useState, useEffect } from "react";
import { withInline, withBetterBreaks, withNodeUids } from "../plugins/SlatePlugins";
import { Editable, ReactEditor, RenderElementProps, RenderLeafProps, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { createEditor, Descendant, Editor as SlateEditor, Transforms, Range, Text, Element, Node } from "slate";
import { TypesetUtil } from "../utils/TypesetUtil";
import isHotkey, { isKeyHotkey } from "is-hotkey";
import DynElem from "../components/editor-components/DynElem";
import Leaf from "../components/editor-components/Leaf";
import classes from "./Editor.module.css";
import SortableElement from "../components/editor-components/SortableElement";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { nanoid } from "nanoid";
import ReactDOM from "react-dom";
import DraggedContent from "../components/editor-components/DraggedContent";
import { mathjaxConfig } from "../config/MathJax";
import { Coords } from "../utils/UtilityInterfaces";
import BlockSelection from "../components/editor-components/BlockSelection";
import { ThmElem } from "../utils/CustomSlateTypes";
import { matchSorter } from "match-sorter";
import { Params, useParams } from "react-router-dom";
import { getDoc, doc, updateDoc, query, collection, DocumentReference, DocumentData, serverTimestamp } from "firebase/firestore";
import { db } from "../config/Firebase";
import { Paper } from "@mui/material";
import { Auth, User, getAuth, onAuthStateChanged } from "firebase/auth";
import { timeStamp } from "console";
import BlockToggler from "../components/editor-components/BlockToggler";

export default function Editor(): JSX.Element | null {
  const params: Readonly<Params<string>> = useParams();

  // Import Firestore.
  const auth: Auth = getAuth();
  const [currDoc, setCurrDoc] = useState<DocumentReference<DocumentData> | null>(null);
  
  // Initialise Slate editor.
  const [editor] = useState<SlateEditor>(() => withNodeUids(
    withBetterBreaks(
      withInline(
        withHistory(
          withReact(createEditor())
        )
      )
    )
  ));
  const [initVal, setInitVal] = useState<Descendant[] | undefined>(undefined);

  const renderElementHandler = useCallback((props: RenderElementProps) => {
    const isTopLevel = ReactEditor.findPath(editor, props.element).length === 1;
    return isTopLevel ? <SortableElement {...props} /> : <DynElem {...props} />;
  }, []);

  const renderLeafHandler = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);

  // Initialise block type select menu.
  const initItems: { [key: string]: string }[] = [
    {
      name: "code",
      blockType: "code-block",
      desc: "Code Block",
    },
    {
      name: "dfn",
      blockType: "thm",
      desc: "Definition Box",
    },
    {
      name: "heading",
      blockType: "heading",
      desc: "Heading",
    },
    {
      name: "paragraph",
      blockType: "paragraph",
      desc: "Paragraph",
    },
    {
      name: "quote",
      blockType: "quote",
      desc: "Block Quote",
    },
    {
      name: "remark",
      blockType: "thm",
      desc: "Remark Box",
    },
    {
      name: "thm",
      blockType: "thm",
      desc: "Theorem Box",
    },
  ];

  const [selectMenuItems, setSelectMenuItems] = useState<{ [key: string]: string }[]>(initItems);
  const [selectedItem, setSelectedItem] = useState<{ [key: string]: string }>(selectMenuItems[0]);
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState<boolean>(false);
  const [selectMenuPos, setSelectMenuPos] = useState<Coords>({ x: 0, y: 0 });

  // Initialise drag-and-drop.
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const itemlist = useMemo<string[]>(() => (editor.children as Element[])
    .map((element) => element.id), [editor.children]);

  const activeElement: Descendant | undefined = editor.children
    .find(child => (child as Element).id === activeId);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const currDoc: DocumentReference<DocumentData> = doc(db, "userProjects",
          user.uid, "projects", params.projId!);
        setCurrDoc(currDoc);
        getDoc(currDoc).then(doc => {
          const slateValue: Descendant[] = JSON.parse(doc.data()?.slateValue);
          setInitVal(slateValue);
        })
      }
    })
  }, [])

  if (!initVal) {
    return null;
  }

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
    // Alternate Soft-break.
    if (event.ctrlKey && event.key === "Enter") {
      SlateEditor.insertSoftBreak(editor);
    }
    // Add bookmark.
    if (event.ctrlKey && event.key === "m") {
      event.preventDefault();
      TypesetUtil.insertBookmark(editor);
    }
    // Handle selection menu interactions.
    if (event.key === "\\") {
      const isInMathMode: boolean = (SlateEditor.parent(editor,
        editor.selection?.anchor!)[0] as Element).type === "math";
      if (!isInMathMode) {
        event.preventDefault();
      }
    }
    if (selectMenuIsOpen) {
      const selectedItemIndex: number = selectMenuItems.indexOf(selectedItem);
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setSelectedItem(selectMenuItems[selectedItemIndex === selectMenuItems.length - 1
            ? 0
            : selectedItemIndex + 1]);
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedItem(selectMenuItems[selectedItemIndex === 0
            ? selectMenuItems.length - 1
            : selectedItemIndex - 1]);
          break;
        case "Enter":
        case "Tab":
          event.preventDefault();
          const currBlock: Element = SlateEditor.parent(editor, SlateEditor.parent(editor,
            editor.selection?.anchor!)[1])[0] as Element;
          const isDifferentBlock: boolean = selectedItem.blockType !== currBlock.type
            || (selectedItem.blockType === "thm"
              && currBlock.type === "thm"
              && selectedItem.name !== (currBlock as ThmElem).style);
          if (isDifferentBlock) {
            const optionalArgs = [
              selectedItem.blockType === "thm" ? selectedItem.name : undefined
            ]
            TypesetUtil.toggleBlock(editor, selectedItem.blockType, ...optionalArgs);
            Transforms.removeNodes(
              editor,
              { at: SlateEditor.parent(editor, editor.selection?.anchor!)[1] },
            );
            setSelectMenuItems(initItems);
            setSelectMenuIsOpen(false);
          }
          break;
        case "Backspace":
          if (editor.selection?.anchor.offset === 1) {
            Transforms.unwrapNodes(
              editor,
              { at: SlateEditor.parent(editor, editor.selection.anchor)[1] },
            );
            setSelectMenuItems(initItems);
            setSelectMenuIsOpen(false);
          }
          break;
        case " ":
          event.preventDefault();
          Transforms.move(editor, { unit: "offset" });
          Transforms.insertText(editor, " ");
          setSelectMenuItems(initItems);
          setSelectMenuIsOpen(false);
          break;
        default:
          console.log(selectMenuItems)
          break;
      }
    }
  };

  const onKeyUpHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (selectMenuIsOpen) {
      const command: string = SlateEditor
        .parent(editor, editor.selection?.anchor!)[0]
        .children[0]
        .text
        .substring(1);
      const updatedItems: { [key: string]: string }[] = matchSorter(
        initItems,
        command,
        {
          keys: ["name"],
          threshold: matchSorter.rankings.WORD_STARTS_WITH,
        }
      );
      if (updatedItems.length !== selectMenuItems.length) {
        setSelectMenuItems(updatedItems);
        setSelectedItem(updatedItems[0]);
      }
    } else {
      const isInMathMode: boolean = (SlateEditor.parent(editor,
        editor.selection?.anchor!)[0] as Element).type === "math";
      if (!isInMathMode && event.key === "\\") {
        Transforms.unwrapNodes(
          editor,
          {
            at: SlateEditor.parent(editor, editor.selection?.anchor!)[1],
            match: n => !SlateEditor.isEditor(n) && Element.isElement(n) && n.type === "cmd",
          },
        );
        Transforms.insertNodes(editor, {
          id: nanoid(),
          type: "cmd",
          onSelect: (bool: boolean) => setSelectMenuIsOpen(bool),
          children: [{ text: "\\" }],
        })
        const prevNeighbour: Node = SlateEditor.node(
          editor,
          SlateEditor.before(
            editor,
            SlateEditor.before(
              editor,
              editor.selection?.anchor!
            )!
          )!
        )[0];
        const prevElem: HTMLElement = ReactEditor.toDOMNode(editor, prevNeighbour as Element);
        setSelectedItem(selectMenuItems[0]);
        setSelectMenuIsOpen(true);
        setSelectMenuPos({
          x: prevElem.offsetLeft + prevElem.offsetWidth,
          y: prevElem.offsetTop + prevElem.offsetHeight + 5,
        });
      }
    }
  };

  const onSelectHandler = (blockType: string) => {
    Transforms.setNodes(editor, {
      type: blockType,
      children: [],
    });
  };

  const onCloseSelectMenuHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setSelectMenuIsOpen(false);
  };

  const autoSave = (value: Descendant[]) => {
    const isAtChange = editor.operations.some(
      op => "set_selection" !== op.type
    );
    if (isAtChange) {
      updateDoc(currDoc!, { 
        slateValue: JSON.stringify(value),
        timeStamp: serverTimestamp(),
      });
    }
  }

  return (
    <Paper
      elevation={3}
      square
      className={classes.paper}
      suppressContentEditableWarning={true}
    >
      <Slate
        editor={editor}
        value={initVal}
        onChange={value => autoSave(value)}
      >
        <DndContext
          onDragStart={onDragStartHandler}
          onDragEnd={onDragEndHandler}
          onDragCancel={() => setActiveId(null)}
        >
          {selectMenuIsOpen
            ? <BlockSelection
              pos={selectMenuPos}
              items={selectMenuItems}
              currSelection={selectedItem}
              onSelect={onSelectHandler}
              onClose={onCloseSelectMenuHandler}
            />
            : null}
          <SortableContext items={itemlist} strategy={verticalListSortingStrategy}>
            <Editable
              className={classes.notes}
              disableDefaultStyles
              autoFocus
              renderElement={renderElementHandler}
              renderLeaf={renderLeafHandler}
              onKeyDown={onKeyDownHandler}
              onKeyUp={onKeyUpHandler}
            />
          </SortableContext>
          <BlockToggler />
          {ReactDOM.createPortal(
            <DragOverlay adjustScale={false}>
              {!!activeElement ? <DraggedContent
                element={activeElement}
                renderElement={renderElementHandler}
              /> : null}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </Slate>
    </Paper>
  );
};