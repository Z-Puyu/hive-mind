import { RenderElementProps, useSelected } from "slate-react";
import Toolbar from "../../../interface/Toolbar";
import TextCard from "../../../interface/TextCard";
import Paragraph from "../../../interface/Paragraph";
import { Divider } from "@mui/material";
import classes from "./TeXBox.module.css";
import {
  CodeSharp,
  FormatBoldSharp,
  FormatClearSharp,
  FormatItalicSharp,
  FormatStrikethroughSharp,
  FormatUnderlinedSharp
} from "@mui/icons-material";
import FormatButton from "../FormatButton";
import MathButton from "../MathButton";
import ToggleLinkButton from "../ToggleLinkButton";
import BookmarkButton from "../BookmarkButton";
import IllustrationButton from "../IllustrationButton";

export default function TeXBox(props: RenderElementProps): JSX.Element {
  const isSelected: boolean = useSelected();

  return (
    <TextCard>
      {isSelected
        ? <section contentEditable="false" suppressContentEditableWarning={true}>
          <Toolbar>
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
            <IllustrationButton />
          </Toolbar>
          <Divider variant="middle" />
        </section>
        : null}
      <section
        className={isSelected ? classes.focusedParagraph : undefined}
        suppressContentEditableWarning={true}
      >
        <Paragraph attributes={props.attributes}>
          {props.children}
        </Paragraph>
      </section>
    </TextCard>
  );
};