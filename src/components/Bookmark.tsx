import { Editor, Transforms, Location, Path } from "slate";
import { ReactEditor, RenderElementProps, useSlate } from "slate-react";
import classes from "./Bookmark.module.css";
import { useEffect, useRef, useState } from "react";
import { Coords } from "../utils/UtilityInterfaces";
import { css, cx } from "@emotion/css";
import Modal from "../interface/Modal";
import ModalOverlay from "../interface/ModalOverlay";
import InlineChromiumBugfix from "../utils/InlineChromBugFix";
import BookmarkConfigMenu from "./BookmarkConfigMenu";
import { BookmarkElem } from "../utils/CustomSlateTypes";
import { nanoid } from "nanoid";
import { DOMPoint as SlateDOMNODe } from "slate-react/dist/utils/dom";

interface BookmarkProps {
  pos: Coords;
}

export default function Bookmark(props: RenderElementProps) {
  const editor: Editor = useSlate();
  const [name, setName] = useState<string>("");
  const bookmarkRef = useRef<HTMLDivElement>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log("Now the current bookmark is: ");
    console.log(props.element)
  }, [])

  const onConfirmConfigHandler = (newTitle: string, newDest?: BookmarkElem, newDesc?: string) => {
    const currId: string = props.element.id;
    const path: Path = ReactEditor.findPath(editor, props.element);
    Transforms.removeNodes(editor, { at: path })
    console.log(newDesc)
    Transforms.insertNodes(editor, {
      id: currId,
      type: "bookmark",
      title: newTitle,
      dest: newDest,
      customDesc: newDesc,
      children: [{
        text: !!newDesc ? newDesc : (!!newDest ? "Refer to " + newDest.title : newTitle),
      }],
    }, { at: path })
    setModalIsOpen(false);

  };

  return (
    <>
      {modalIsOpen ? <Modal onClose={() => setModalIsOpen(false)}>
        <BookmarkConfigMenu
          target={props.element as BookmarkElem}
          onConfirm={onConfirmConfigHandler}
        />
      </Modal> : null}
      <span
        className={classes.bookmark}
        onDoubleClick={() => setModalIsOpen(true)}
        onClick={() => {
          // console.log(ReactEditor.toDOMNode(editor, (props.element as BookmarkElem).dest!) as Node);
          if (!!(props.element as BookmarkElem).dest) {
            const destNode: HTMLElement = ReactEditor.toDOMNode(
              editor, Editor.parent(
                editor, ReactEditor.findPath(
                  editor, (props.element as BookmarkElem).dest!
                )
              )[0]
            );
            window.scrollTo(0, destNode.offsetTop - destNode.clientHeight);
          }
        }}
        contentEditable="false"
        suppressContentEditableWarning={true}
      >
        <InlineChromiumBugfix />
        {props.children}
        <InlineChromiumBugfix />
      </span>
    </>
  );
};