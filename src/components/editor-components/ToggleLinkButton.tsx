import { useSlate } from "slate-react";
import { TypesetUtil } from "../../utils/TypesetUtil";
import { Editor, Range } from "slate";
import { LinkOffSharp, AddLinkSharp, InsertLinkSharp } from "@mui/icons-material";
import { css } from "@emotion/css";

export default function ToggleLinkButton() {
  const editor: Editor = useSlate();

  const onPointerDownHandler = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    TypesetUtil.toggleLink(editor);
  };

  return (
    <span
      className={css`
        cursor: pointer;
        color: rgb(182, 164, 118);
        margin-right: 0.25em;
      `}
      onPointerDown={onPointerDownHandler}
    >
      {TypesetUtil.isInlineActive(editor, "link")
        ? <LinkOffSharp />
        : editor.selection && Range.isCollapsed(editor.selection)
          ? <AddLinkSharp />
          : <InsertLinkSharp />
      }
    </span>
  );
};