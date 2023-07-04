import { FormatBoldSharp, FormatItalicSharp, FormatClearSharp, FormatUnderlinedSharp, FormatStrikethroughSharp, CodeSharp } from "@mui/icons-material";
import { Toolbar } from "@mui/material";
import { RenderElementProps, useSelected } from "slate-react";
import Paragraph from "../../../interface/Paragraph";
import TextCard from "../../../interface/TextCard";
import { ThmElem } from "../../../utils/CustomSlateTypes";
import FormatButton from "../FormatButton";
import MathButton from "../MathButton";
import TheoremTitle from "../TheoremTitle";
import ToggleLinkButton from "../ToggleLinkButton";
import BookmarkButton from "../BookmarkButton";
import { MathJax } from "better-react-mathjax";
import { css } from "@emotion/css";

export default function Problem(props: RenderElementProps): JSX.Element {
  const isSelected: boolean = useSelected();

  return (
    <TextCard>
      <TheoremTitle style="problem" title={(props.element as ThmElem).title} />
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
        {props.children}
      </Paragraph>
    </TextCard>
  );
};