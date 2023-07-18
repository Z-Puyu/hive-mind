import { useSlate } from "slate-react";
import { TypesetUtil } from "../../utils/TypesetUtil";
import { Editor } from "slate";
import { css } from "@emotion/css";
import { Button } from "@mui/material";

interface BlockButtonProps {
  blockType: string;
  thmStyle?: string;
  icon: JSX.Element;
}

export default function BlockButton(props: BlockButtonProps): JSX.Element {
  const editor: Editor = useSlate();
  const isActive: boolean = TypesetUtil.isBlockActive(editor, props.blockType, props.thmStyle);

  const onPointerDownHandler = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isActive) {
      TypesetUtil.toggleBlock(editor, props.blockType, props.thmStyle);
    } else {
      TypesetUtil.toggleBlock(editor, "paragraph");
    }
  };

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: isActive ? "rgb(225, 225, 225)" : "white",
        color: isActive ? "black" : "gray",
        ":hover": {
          backgroundColor: "rgb(192, 192, 192)"
        }
      }}
      onPointerDown={onPointerDownHandler}
    >
      {props.icon}
    </Button>
  );
};