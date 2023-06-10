import { useSortable } from "@dnd-kit/sortable";
import { RenderElementProps } from "slate-react";
import DynElem from "./DynElem";

export default function SortableElement(props: RenderElementProps): JSX.Element {
  const sortableObj = useSortable({
    id: !!props.element.id ? props.element.id : "",
  });

  return (
    <div
      {...sortableObj.attributes}
      ref={sortableObj.setNodeRef}
      style={{
        opacity: sortableObj.isDragging ? 0.5 : 1
      }}
    >
      <button {...sortableObj.listeners}>@</button>
      <DynElem {...props} />
    </div>
  );
};