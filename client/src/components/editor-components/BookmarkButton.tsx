import { Editor, Range, Transforms } from "slate";
import { TypesetUtil } from "../../utils/TypesetUtil"
import { useSlate } from "slate-react"
import { css } from "@emotion/css";
import { BookmarkAddSharp } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

export default function BookmarkButton(): JSX.Element {
  const editor: Editor = useSlate();
  const isActive: boolean = TypesetUtil.isInlineActive(editor, "math");

  const onPointerDownHandler = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (editor.selection) {
      if (!Range.isCollapsed(editor.selection)) {
        Transforms.collapse(editor, { edge: "end" });
      }
      TypesetUtil.insertBookmark(editor);
    }
  };

  return (
    <Tooltip title="Bookmark (ctrl + m)" arrow placement="top">
      <span
        className={css`
        cursor: pointer;
        color: ${isActive ? "rgb(83, 60, 27)" : "rgb(182, 164, 118)"};
        margin-right: 0.25em;
      `}
        onPointerDown={onPointerDownHandler}
      >
        <BookmarkAddSharp />
      </span>
    </Tooltip>
  );
};