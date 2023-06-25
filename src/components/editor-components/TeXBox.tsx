import { RenderElementProps, useSelected, useSlate } from "slate-react";
import Toolbar from "../../interface/Toolbar";
import FormatButton from "../FormatButton";
import ToggleLinkButton from "../ToggleLinkButton";
import MathButton from "../MathButton";
import CodeButton from "../CodeButton";
import BlockButton from "../BlockButton";
import TextCard from "../../interface/TextCard";
import Paragraph from "../../interface/Paragraph";
import { Editor, Transforms } from "slate";
import { Box, Divider } from "@mui/material";
import classes from "./TeXBox.module.css";
import { CodeSharp, FormatBoldSharp, FormatClearSharp, FormatItalicSharp, FormatQuoteSharp, FormatStrikethroughSharp, FormatUnderlinedSharp, TitleSharp } from "@mui/icons-material";

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
            <BlockButton blockType="quote" icon={<FormatQuoteSharp />}/>
            <BlockButton blockType="heading" icon={<TitleSharp />}/>
            <ToggleLinkButton />
            <MathButton inline />
            <MathButton />
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