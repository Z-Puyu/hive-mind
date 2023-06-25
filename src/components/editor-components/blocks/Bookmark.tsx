import { useState, useRef, useEffect } from "react";
import { Editor, Transforms, Path } from "slate";
import { RenderElementProps, useSlate, ReactEditor } from "slate-react";
import Modal from "../../../interface/Modal";
import { BookmarkElem } from "../../../utils/CustomSlateTypes";
import InlineChromiumBugfix from "../../../utils/InlineChromBugFix";
import { Coords } from "../../../utils/UtilityInterfaces";
import BookmarkConfigMenu from "../BookmarkConfigMenu";
import classes from "./Bookmark.module.css";

interface BookmarkProps {
  pos: Coords;
}

export default function Bookmark(props: RenderElementProps) {
  const editor: Editor = useSlate();
  const [name, setName] = useState<string>("");
  const bookmarkRef = useRef<HTMLDivElement>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const onConfirmConfigHandler = (newTitle: string, newDest?: BookmarkElem, newDesc?: string) => {
    const currId: string = props.element.id;
    const path: Path = ReactEditor.findPath(editor, props.element);
    Transforms.removeNodes(editor, { at: path })
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
        onClick={event => {
          if (event.ctrlKey) {
            setModalIsOpen(true);
          } else if (!!(props.element as BookmarkElem).dest) {
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