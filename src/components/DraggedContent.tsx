import { useEffect, useMemo, useState } from "react";
import { Descendant, Editor, createEditor } from "slate";
import { Editable, RenderElementProps, Slate, withReact } from "slate-react";
import { withBetterBreaks, withInline, withNodeUids } from "../plugins/SlatePlugins";
import { withHistory } from "slate-history";
import { css } from "@emotion/css";

interface DraggedContentProps {
  element: Descendant;
  renderElement: (props: RenderElementProps) => JSX.Element;
}

export default function DraggedContent(props: DraggedContentProps): JSX.Element {
  const currEditor: Editor = useMemo(() => withNodeUids(
    withBetterBreaks(
      withInline(
        withHistory(
          withReact(createEditor())
        )
      )
    )), []);
  // Clone the block being dragged.
  const [clonedValue] = useState<any[]>([JSON.parse(JSON.stringify(props.element))]);

  // Should be about dynamic CSS styling, to be studied.
  /* useEffect(() => {
    document.body.classList.add("dragging");
    return () => document.body.classList.remove("dragging");
  }, []); */

  return (
    <div
      className={css`
        width: 48em;
      `}
    >
      <Slate editor={currEditor} value={clonedValue}>
        <Editable readOnly={true} renderElement={props.renderElement} />
      </Slate>
    </div>
  );
};