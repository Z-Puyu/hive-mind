import { useSortable } from "@dnd-kit/sortable";
import { RenderElementProps } from "slate-react";
import DynElem from "./DynElem";
import { css } from "@emotion/css";
import classes from "./SortableElement.module.css";

export default function SortableElement(props: RenderElementProps): JSX.Element {
  const sortableObj = useSortable({
    id: !!props.element.id ? props.element.id : "",
  });

  return (
      <div
        {...sortableObj.attributes}
        id={props.element.id}
        ref={sortableObj.setNodeRef}
        className={css`
          opacity: ${sortableObj.isDragging ? 0.5 : 1};
          display: flex;
          width: 80%;
          margin: 0.5em auto;
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
  );
};