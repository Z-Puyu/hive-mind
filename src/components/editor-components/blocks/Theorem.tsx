import { RenderElementProps, useSelected } from "slate-react";
import TextCard from "../../../interface/TextCard";
import {
  FormatBoldSharp,
  FormatClearSharp,
  FormatUnderlinedSharp,
  FormatStrikethroughSharp,
  CodeSharp,
  FormatItalicSharp
} from "@mui/icons-material";
import { Divider, Toolbar } from "@mui/material";
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
      <TheoremTitle
        title={(props.element as ThmElem).title}
        index={(props.element as ThmElem).index}
      />
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
          </Toolbar>
          <Divider variant="middle" />
        </section>
        : null}
      <section className={isSelected ? css`padding: 0.75em 0` : undefined}>
        <Paragraph attributes={props.attributes}>
          <i>{props.children}</i>
        </Paragraph>
      </section>
    </TextCard>
  );
};