import { RenderElementProps, useSelected, useSlate } from "slate-react";
import Toolbar from "../../../interface/Toolbar";
import BlockButton from "../BlockButton";
import TextCard from "../../../interface/TextCard";
import Paragraph from "../../../interface/Paragraph";
import { Editor, Transforms } from "slate";
import { Box, Divider } from "@mui/material";
import classes from "./TeXBox.module.css";
import { CodeSharp, FormatBoldSharp, FormatClearSharp, FormatItalicSharp, FormatQuoteSharp, FormatStrikethroughSharp, FormatUnderlinedSharp, TitleSharp } from "@mui/icons-material";
import FormatButton from "../FormatButton";
import MathButton from "../MathButton";
import ToggleLinkButton from "../ToggleLinkButton";
import BookmarkButton from "../BookmarkButton";

export default function TeXBox(props: RenderElementProps): JSX.Element {
  const isSelected: boolean = useSelected();
  const editor: Editor = useSlate();

  return (
    <TextCard>
      {isSelected
        ? <section contentEditable="false">
          <Toolbar>
            <FormatButton mark="bold" icon={<FormatBoldSharp />}/>
            <FormatButton mark="italic" icon={<FormatItalicSharp />}/>
            <FormatButton mark="roman" icon={<FormatClearSharp />}/>
            <FormatButton mark="underline" icon={<FormatUnderlinedSharp />}/>
            <FormatButton mark="strikethru" icon={<FormatStrikethroughSharp />}/>
            <FormatButton mark="code" icon={<CodeSharp />}/>
            <ToggleLinkButton />
            <MathButton inline />
            <MathButton />
            <BookmarkButton />
          </Toolbar>
          <Divider variant="middle"/>
        </section>
        : null}
      <Paragraph attributes={props.attributes}>
        {props.children}
      </Paragraph>
    </TextCard>
  );
};