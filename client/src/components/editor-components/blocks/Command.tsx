import { RenderElementProps, useSelected, useSlate } from "slate-react";
import { Editor } from "slate";
import { CommandElem } from "../../../utils/CustomSlateTypes";
import { useEffect } from "react";

export default function Command(props: RenderElementProps): JSX.Element {
  const isSelected: boolean = useSelected();
  const editor: Editor = useSlate();

  useEffect(() => {
    if (!isSelected || (isSelected && editor.selection?.anchor.offset === 0)) {
      (props.element as CommandElem).onSelect(false);
    } else {
      (props.element as CommandElem).onSelect(true);
    }
  });

  return isSelected ? (
    <code
      {...props.attributes}
      style={{ color: "blue" }}
      id={props.element.id}
    >
      {props.children}
    </code>
  ) : (
    <span>{props.children}</span>
  );
}