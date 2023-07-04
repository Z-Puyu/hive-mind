import { useState } from "react";
import { Editor, Transforms, Path, Node, Element } from "slate";
import { RenderElementProps, useSlate, ReactEditor } from "slate-react";
import Modal from "../../../interface/Modal";
import { BookmarkElem } from "../../../utils/CustomSlateTypes";
import InlineChromiumBugfix from "../../../utils/InlineChromBugFix";
import BookmarkConfigMenu from "../BookmarkConfigMenu";
import classes from "./Bookmark.module.css";

export default function Bookmark(props: RenderElementProps) {
  const editor: Editor = useSlate();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const onConfirmConfigHandler = (newTitle: string, newDest?: string,
    newDestId?: string, newDesc?: string) => {
    const currId: string = props.element.id;
    const path: Path = ReactEditor.findPath(editor, props.element);
    Transforms.removeNodes(editor, { at: path })
    if (newDest && newDestId) {
      Transforms.insertNodes(editor, {
        id: currId,
        type: "bookmark",
        title: newTitle,
        dest: newDestId,
        destTitle: newDest,
        customDesc: newDesc,
        children: [{
          text: newDesc ? newDesc : "Refer to " + newDest,
        }],
      }, { at: path })
      const children = Node.descendants(
        ReactEditor.toSlateNode(editor, document.getElementById(newDestId)!),
      )
      let elem = children.next().value![0]
      while ((elem as Element).id !== newDestId) {
        elem = children.next().value![0]
      }
      const destPath: Path = ReactEditor.findPath(editor, elem);
      Transforms.removeNodes(editor, { at: destPath })
      Transforms.insertNodes(editor, {
        id: newDestId,
        type: "bookmark",
        title: (elem as BookmarkElem).title,
        dest: (props.element as BookmarkElem).id,
        destTitle: (props.element as BookmarkElem).title,
        customDesc: (elem as BookmarkElem).customDesc,
        children: (elem as BookmarkElem).children,
      }, { at: destPath })
    } else {
      Transforms.insertNodes(editor, {
        id: currId,
        type: "bookmark",
        title: newTitle,
        customDesc: newDesc,
        children: [{
          text: newDesc ? newDesc : newTitle,
        }],
      }, { at: path })
    }
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
        id={props.element.id}
        className={classes.bookmark}
        onClick={event => {
          const destNode: HTMLElement | null = (props.element as BookmarkElem).dest
            ? document.getElementById((props.element as BookmarkElem).dest!)
            : null;
          if (event.ctrlKey) {
            setModalIsOpen(true);
          } else if (destNode) {
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