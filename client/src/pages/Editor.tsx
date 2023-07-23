import { KeyboardEvent, useCallback, useMemo, useState, useEffect, useRef } from "react";
import { withInline, withBetterBreaks, withNodeUids, withVoids } from "../plugins/SlatePlugins";
import { TypesetUtil } from "../utils/TypesetUtil";
import isHotkey, { isKeyHotkey } from "is-hotkey";
import DynElem from "../components/editor-components/DynElem";
import Leaf from "../components/editor-components/Leaf";
import classes from "./Editor.module.css";
import SortableElement from "../components/editor-components/SortableElement";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { nanoid } from "nanoid";
import DraggedContent from "../components/editor-components/DraggedContent";
import BlockSelection from "../components/editor-components/BlockSelection";
import { ThmElem } from "../utils/CustomSlateTypes";
import { matchSorter } from "match-sorter";
import { Params, useParams } from "react-router-dom";
import {
  getDoc,
  doc,
  updateDoc,
  DocumentReference,
  DocumentData,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../config/Firebase";
import { Paper, Portal } from "@mui/material";
import { Auth, User, getAuth, onAuthStateChanged } from "firebase/auth";
import BlockToggler from "../components/editor-components/BlockToggler";
import {
  UniqueIdentifier,
  DragStartEvent,
  DragEndEvent,
  DndContext,
  DragOverlay
} from "@dnd-kit/core";
import {
  createEditor,
  Descendant,
  Transforms,
  Editor as SlateEditor,
  Element,
  Range,
  Text,
  Operation,
} from "slate";
import { withHistory } from "slate-history";
import { withReact, RenderElementProps, ReactEditor, RenderLeafProps, Slate, Editable } from "slate-react";
import { Socket, io } from "socket.io-client";

const INIT_BLOCK_TYPES: { [key: string]: string }[] = [
  {
    name: "chapter",
    blockType: "heading",
    desc: "New chapter",
  },
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
    name: "eg",
    blockType: "thm",
    desc: "Example Box",
  },
  {
    name: "part",
    blockType: "heading",
    desc: "New part",
  },
  {
    name: "paragraph",
    blockType: "paragraph",
    desc: "Paragraph",
  },
  {
    name: "problem",
    blockType: "thm",
    desc: "Problem Box",
  },
  {
    name: "proof",
    blockType: "soln",
    desc: "Proof",
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
    name: "section",
    blockType: "heading",
    desc: "New section",
  },
  {
    name: "solution",
    blockType: "soln",
    desc: "Solution",
  },
  {
    name: "subsection",
    blockType: "heading",
    desc: "New subsection",
  },
  {
    name: "subsubsection",
    blockType: "heading",
    desc: "New sub-subsection",
  },
  {
    name: "thm",
    blockType: "thm",
    desc: "Theorem Box",
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

const socket: Socket = io("http://localhost:4000");

export default function Editor(): JSX.Element | null {
  const params: Readonly<Params<string>> = useParams();

  // Import Firestore.
  const auth: Auth = getAuth();
  const [currDoc, setCurrDoc] = useState<DocumentReference<DocumentData> | null>(null);
  const [currUser, setCurrUser] = useState<User | null>(null);

  // Initialise data-sending.
  const id: string = `${params.userId}-#-${params.ownerId}-#-${params.projId}`;
  const remote = useRef<boolean>(false);

  // Initialise Slate editor.
  const [editor] = useState<SlateEditor>(() => withNodeUids(
    withBetterBreaks(
      withInline(
        withVoids(
          withHistory(
            withReact(createEditor())
          )
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
  const [selectMenuItems, setSelectMenuItems] = useState<{ [key: string]: string }[]>(INIT_BLOCK_TYPES);
  const [selectedItem, setSelectedItem] = useState<{ [key: string]: string }>(selectMenuItems[0]);
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState<boolean>(false);
  const [anchorId, setAnchorId] = useState<string>("");
  //const [initTag, setInitTag] = useState<string> 

  // Initialise drag-and-drop.
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const itemlist = useMemo<string[]>(() => (editor.children as Element[])
    .map((element) => element.id), [editor.children]);

  const activeElement: Descendant | undefined = editor.children
    .find(child => (child as Element).id === activeId);

  // Get current user.
  useEffect(() => onAuthStateChanged(auth, user => {
    if (user) {
      setCurrUser(user);
      const currDoc: DocumentReference<DocumentData> = doc(db, "userProjects",
        params.ownerId!, "projects", params.projId!);
      setCurrDoc(currDoc);
      getDoc(currDoc).then(doc => {
        const slateValue: Descendant[] = JSON.parse(doc.data()?.slateValue);
        setInitVal(slateValue);
      })
    }
  }), []);
  useEffect(() => TypesetUtil.updateHeadingIndexes(editor), [editor.children]);
  useEffect(() => TypesetUtil.updateThmIndexes(editor), [editor.children]);

  const hasReceivedChange = useRef<boolean>(false);

  useEffect(() => {
    socket.on("new-remote-operation", (userId, ownerId, projId, ops) => {
      const isRemoteChange: boolean = userId !== params.userId
        && ownerId === params.ownerId
        && projId === params.projId;
      if (isRemoteChange && !hasReceivedChange.current) {
        remote.current = true;
        hasReceivedChange.current = true;
        JSON.parse(ops).forEach((op: Operation) => editor.apply(op))
      }
    })
  }, [])

  if (!initVal) {
    return null;
  }

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
          onSelectHandler(selectedItem);
          break;
        case "Backspace":
          if (editor.selection?.anchor.offset === 1) {
            Transforms.unwrapNodes(
              editor,
              { at: SlateEditor.parent(editor, editor.selection.anchor)[1] },
            );
            setSelectMenuItems(INIT_BLOCK_TYPES);
            setSelectMenuIsOpen(false);
          }
          break;
        case " ":
          event.preventDefault();
          Transforms.move(editor, { unit: "offset" });
          Transforms.insertText(editor, " ");
          setSelectMenuItems(INIT_BLOCK_TYPES);
          setSelectMenuIsOpen(false);
          break;
        default:
          break;
      }
    } else {
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
      switch (event.key) {
        case "$":
          event.preventDefault();
          TypesetUtil.toggleMath(editor, true);
          break;
        case "Enter":
          if (event.ctrlKey) {
            SlateEditor.insertSoftBreak(editor);
          }
          break;
        case "m":
          if (event.ctrlKey) {
            event.preventDefault();
            TypesetUtil.insertBookmark(editor);
          }
          break;
        case "\\":
          const isInMathMode: boolean = (SlateEditor.parent(editor,
            editor.selection?.anchor!)[0] as Element).type === "math";
          if (!isInMathMode) {
            event.preventDefault();
          }
          break;
        case "Backspace":
          if (editor.selection?.anchor.offset === 0 && TypesetUtil.isEmptyInline(editor)) {
            event.preventDefault();
            TypesetUtil.removeEmptyInlines(editor);
          }
          break;
        default:
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              TypesetUtil.toggleMark(editor, mark as keyof Omit<Text, "text">);
            }
          }
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
        INIT_BLOCK_TYPES,
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
        const cmdId: string = nanoid();
        setAnchorId(cmdId);
        Transforms.insertNodes(editor, {
          id: cmdId,
          type: "cmd",
          onSelect: (bool: boolean) => setSelectMenuIsOpen(bool),
          children: [{ text: "\\" }],
        })
        setSelectedItem(selectMenuItems[0]);
        setSelectMenuIsOpen(true);
      }
    }
  };

  const onSelectHandler = (item: { [key: string]: string }) => {
    Transforms.removeNodes(
      editor,
      { at: SlateEditor.parent(editor, editor.selection?.anchor!)[1] },
    );
    if (item.blockType === "soln") {
      Transforms.insertNodes(editor, {
        id: nanoid(),
        type: "soln",
        proof: item.name === "proof" ? true : undefined,
        children: [{ text: "" }],
      });
      Transforms.setNodes(editor, { withProof: true });
    } else {
      const currBlock: Element = SlateEditor.parent(editor, SlateEditor.parent(editor,
        editor.selection?.anchor!)[1])[0] as Element;
      const isDifferentBlock: boolean = item.blockType !== currBlock.type
        || (item.blockType === "thm"
          && currBlock.type === "thm"
          && item.name !== (currBlock as ThmElem).style);
      if (isDifferentBlock) {
        const optionalArgs = {
          thmStyle: item.blockType === "thm" ? item.name : undefined,
          headingLevel: item.blockType === "heading" ? item.name : undefined
        }
        TypesetUtil.toggleBlock(editor, item.blockType, { ...optionalArgs });
      }
    }
    setSelectMenuItems(INIT_BLOCK_TYPES);
    setSelectMenuIsOpen(false);
  };

  const onCloseSelectMenuHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setSelectMenuIsOpen(false);
  };

  const onChangeHandler = (value: Descendant[]) => {
    // The editor's contents have altered if the operation is 
    // something other than changing cursor selection.
    const ops: Operation[] = editor.operations.filter(
      op => "set_selection" !== op.type
    );
    if (ops.length > 0) {
      if (!remote.current) {
        socket.emit("new-operation", params.userId, params.ownerId, params.projId, JSON.stringify(ops));
      }
      updateDoc(currDoc!, {
        slateValue: JSON.stringify(value.map(node => {
          const newNode: Descendant = {
            ...node,
            children: (node as Element).children.filter(child => child.type !== "cmd")
          }
          return newNode;
        })),
        timeStamp: serverTimestamp(),
      });
      remote.current = false;
      hasReceivedChange.current = false;
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
        onChange={value => onChangeHandler(value)}
      >
        <DndContext
          onDragStart={onDragStartHandler}
          onDragEnd={onDragEndHandler}
          onDragCancel={() => setActiveId(null)}
        >
          {selectMenuIsOpen
            ? <BlockSelection
              pos={{
                x: document.getElementById(anchorId)?.offsetLeft!,
                y: document.getElementById(anchorId)?.offsetTop! +
                  document.getElementById(anchorId)?.offsetHeight! + 5
              }}
              items={selectMenuItems}
              currSelection={selectedItem}
              onSelect={onSelectHandler}
              onClose={onCloseSelectMenuHandler}
            />
            : null}
          <SortableContext items={itemlist} strategy={verticalListSortingStrategy}>
            <Editable
              id="hivemind-editable"
              className={classes.notes}
              disableDefaultStyles
              autoFocus
              renderElement={renderElementHandler}
              renderLeaf={renderLeafHandler}
              onKeyDown={onKeyDownHandler}
              onKeyUp={onKeyUpHandler}
              suppressContentEditableWarning={true}
            />
          </SortableContext>
          <BlockToggler />
          <Portal>
            <DragOverlay adjustScale={false}>
              {activeElement ? <DraggedContent
                element={activeElement}
                renderElement={renderElementHandler}
              /> : null}
            </DragOverlay>
          </Portal>
        </DndContext>
      </Slate>
    </Paper>
  );
};