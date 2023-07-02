import { RenderElementProps, useSelected } from "slate-react";
import { FormatBoldSharp, FormatItalicSharp, FormatClearSharp, FormatUnderlinedSharp, FormatStrikethroughSharp, CodeSharp } from "@mui/icons-material";
import { Toolbar } from "@mui/material";
import Paragraph from "../../../interface/Paragraph";
import TextCard from "../../../interface/TextCard";
import FormatButton from "../FormatButton";
import MathButton from "../MathButton";
import ToggleLinkButton from "../ToggleLinkButton";
import BookmarkButton from "../BookmarkButton";

export default function Remark(props: RenderElementProps): JSX.Element {
  const isSelected: boolean = useSelected();

  return (
    <TextCard>
      {isSelected ? <Toolbar>
        <FormatButton mark="bold" icon={<FormatBoldSharp />} />
        <FormatButton mark="italic" icon={<FormatItalicSharp />} />
        <FormatButton mark="roman" icon={<FormatClearSharp />} />
        <FormatButton mark="underline" icon={<FormatUnderlinedSharp />} />
        <FormatButton mark="strikethru" icon={<FormatStrikethroughSharp />} />
        <FormatButton mark="code" icon={<CodeSharp />} />
        <ToggleLinkButton />
        <MathButton inline />
        <MathButton />
        <BookmarkButton />
      </Toolbar> : null}
      <Paragraph attributes={props.attributes}>
        <i
          contentEditable="false"
          suppressContentEditableWarning={true}
        >
          {"Remark. "}
        </i>
        {props.children}
      </Paragraph>
    </TextCard>
  );
};