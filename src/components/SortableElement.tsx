import { useSortable } from "@dnd-kit/sortable";
import { RenderElementProps } from "slate-react";
import DynElem from "./DynElem";
import { css } from "@emotion/css";
import classes from "./SortableElement.module.css";
import BlockContainer from "../interface/BlockContainer";
import Bookmark from "./Bookmark";
import HoveringWindow from "../interface/HoveringWindow";

export default function SortableElement(props: RenderElementProps): JSX.Element {
  const sortableObj = useSortable({
    id: !!props.element.id ? props.element.id : "",
  });

  return (
    <BlockContainer>
      <div
        {...sortableObj.attributes}
        id={props.element.id}
        ref={sortableObj.setNodeRef}
        className={css`
          opacity: ${sortableObj.isDragging ? 0.5 : 1};
          display: flex;
          flex-direction: row;
          align-content: stretch;
        `}
      >
        <DynElem {...props} />
        <div
          {...sortableObj.listeners}
          className={classes.handle}
          contentEditable="false"
          suppressContentEditableWarning={true}
        />
      </div>
    </BlockContainer>
  );
};