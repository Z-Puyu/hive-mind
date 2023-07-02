import { RenderElementProps, useSelected } from "slate-react";
import TextCard from "../../../interface/TextCard";
import { FormatBoldSharp, FormatClearSharp, FormatUnderlinedSharp, FormatStrikethroughSharp, CodeSharp } from "@mui/icons-material";
import { Toolbar } from "@mui/material";
import Paragraph from "../../../interface/Paragraph";
import { ThmElem } from "../../../utils/CustomSlateTypes";
import FormatButton from "../FormatButton";
import MathButton from "../MathButton";
import TheoremTitle from "../TheoremTitle";
import ToggleLinkButton from "../ToggleLinkButton";
import BookmarkButton from "../BookmarkButton";
import { css } from "@emotion/css";
import { MathJax } from "better-react-mathjax";


export default function Theorem(props: RenderElementProps): JSX.Element {
  const isSelected: boolean = useSelected();

  return (
    <TextCard>
      <TheoremTitle title={(props.element as ThmElem).title} />
      {isSelected ? <Toolbar>
        <FormatButton mark="bold" icon={<FormatBoldSharp />} />
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
        <i>{props.children}</i>
      </Paragraph>
    </TextCard>
  );
};