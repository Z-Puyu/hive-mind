import { useState } from "react";
import PopUp from "../interface/PopUp";
import classes from "./BookmarkConfigMenu.module.css"
import { BookmarkElem } from "../utils/CustomSlateTypes";
import { Editor, Element, Node, Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";
import SelectMenu from "../interface/SelectMenu";
import VerticalList from "../interface/VerticalList";
import { Transform } from "stream";

interface BookmarkConfigMenuProps {
  target: BookmarkElem;
  onConfirm: (title: string, dest?: BookmarkElem, desc?: string) => void;
}

export default function BookmarkConfigMenu(props: BookmarkConfigMenuProps) {
  const editor: Editor = useSlate();
  const [isSelectMenuActive, setIsSelectMenuActive] = useState<boolean>(false);
  const [bookmarkName, setBookmarkName] = useState<string>(props.target.title);
  const [bookmarkDest, setBookmarkDest] = useState<BookmarkElem | undefined>(props.target.dest);
  const [availableBookmarks, setAvailableBookmarks] = useState<BookmarkElem[]>([]);
  const [bookmarkDesc, setBookmarkDesc] = useState<string>(
    !!props.target.customDesc ? props.target.customDesc : ""
  );

  const initialiseBookmarkList = () => {
    const elements = Node.elements(editor, {
      pass: n => !Editor.isEditor(n[0]) && Element.isElement(n[0]) && n[0].type === "bookmark",
    });
    const bmList: BookmarkElem[] = [];
    const firstElem = elements.next().value;
    for (let elem = firstElem; !!elem; elem = elements.next().value) {
      if (elem[0].type === "bookmark") {
        bmList.push(elem[0] as BookmarkElem);
      }
    }
    setAvailableBookmarks(bmList);
  }

  const onClickHandler = () => {
    if (availableBookmarks.length === 0) {
      initialiseBookmarkList();
    }
    setIsSelectMenuActive(!isSelectMenuActive);
  }

  return (
    <PopUp>
      <div className={classes.inputField}>
        <label htmlFor="bm-name" >
          Tag this bookmark as...
        </label>
        <input
          required
          className={classes.input}
          id="bm-name"
          type="text"
          value={bookmarkName}
          onChange={event => setBookmarkName(event.target.value)}
        />
      </div>
      <div className={classes.inputField}>
        <label htmlFor="bm-destination">
          Link this bookmark to...
        </label>
        <input
          required
          className={classes.input}
          id="bm-destination"
          type="text"
          value={!!bookmarkDest ? bookmarkDest.title : ""}
          onClick={onClickHandler}
        />
      </div>
      {isSelectMenuActive ? <SelectMenu
        position={{
          x: document.getElementById("bm-destination")?.offsetLeft!,
          y: document.getElementById("bm-destination")?.offsetTop! + 35,
        }}
      >
        <VerticalList>
          {availableBookmarks
            .filter(bm => bm.id !== props.target.id)
            .map(bm => <div
              onClick={() => {
                setBookmarkDest(bm);
                Transforms.setNodes(editor, {
                  dest: bm,
                }, { at: ReactEditor.findPath(editor, props.target) });
                Transforms.setNodes(editor, {
                  dest: props.target,
                }, { at: ReactEditor.findPath(editor, bm) });
              }}
            >
              {bm.title}
            </div>)
          }
        </VerticalList>
      </SelectMenu> : null}
      <div className={classes.inputField}>
        <label htmlFor="bm-desc">
          Add a custom description:
        </label>
        <input
          required
          className={classes.input}
          id="bm-desc"
          type="text"
          value={bookmarkDesc}
          onChange={event => setBookmarkDesc(event.target.value)}
        />
      </div>
      <button
        onClick={() => props.onConfirm(bookmarkName, bookmarkDest, bookmarkDesc)}
      >
        Confirm
      </button>
    </PopUp>
  )
}