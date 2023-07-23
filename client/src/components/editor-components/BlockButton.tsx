import { useSlate } from "slate-react";
import { TypesetUtil } from "../../utils/TypesetUtil";
import { Editor } from "slate";
import { Button, Tooltip } from "@mui/material";

interface BlockButtonProps {
  blockType: string;
  thmStyle?: string;
  onClick?: (event: React.PointerEvent<HTMLButtonElement>) => void;
  icon: JSX.Element;
}

const TOOLTIPS: { [key: string]: string } = {
  "heading": "Heading",
  "code-block": "Block code",
  "quote": "Quote",
  "dfn": "Definition",
  "thm": "Theorem",
  "remark": "Remark",
  "eg": "Example",
  "problem": "Problem"
}

export default function BlockButton(props: BlockButtonProps): JSX.Element {
  const editor: Editor = useSlate();
  const isActive: boolean = TypesetUtil.isBlockActive(editor, props.blockType,
    { thmStyle: props.thmStyle });

  const onPointerDownHandler = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (props.blockType !== "heading") {
      TypesetUtil.toggleBlock(editor, props.blockType, {
        thmStyle: props.thmStyle,
      });
    }
  };

  const onPointerUpHandler = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (props.blockType === "heading") {
      props.onClick!(event)
    } else if (props.blockType === "thm") {
      TypesetUtil.updateThmIndexes(editor);
    }
  }

  return (
    <Tooltip
      title={props.thmStyle ? TOOLTIPS[props.thmStyle] : TOOLTIPS[props.blockType]}
      arrow
      placement="left"
    >
        <Button
          id={"block-button-" + props.blockType}
          variant="contained"
          sx={{
            backgroundColor: isActive ? "rgb(225, 225, 225)" : "white",
            color: isActive ? "black" : "gray",
            ":hover": {
              backgroundColor: "rgb(192, 192, 192)"
            }
          }}
          onPointerDown={onPointerDownHandler}
          onPointerUp={onPointerUpHandler}
        >
          {props.icon}
        </Button>
    </Tooltip>
  );
};