import {
  FormatBoldSharp,
  FormatItalicSharp,
  FormatClearSharp,
  FormatUnderlinedSharp,
  FormatStrikethroughSharp,
  CodeSharp
} from "@mui/icons-material";
import { Toolbar, Divider } from "@mui/material";
import { RenderElementProps, useSelected } from "slate-react";
import Paragraph from "../../../interface/Paragraph";
import TextCard from "../../../interface/TextCard";
import { HeadingElem } from "../../../utils/CustomSlateTypes";
import FormatButton from "../FormatButton";
import MathButton from "../MathButton";
import ToggleLinkButton from "../ToggleLinkButton";

const HEADING_STYLES: { [type: string]: { fontSize: string } } = {
  "part": { fontSize: "24.88pt" },
  "chapter": { fontSize: "24.88pt" },
  "section": { fontSize: "17.28pt" },
  "subsection": { fontSize: "14.4pt" },
  "subsubsection": { fontSize: "12pt" },
}

export default function Heading(props: RenderElementProps) {
  const isSelected: boolean = useSelected();

  return (
    <TextCard>
      {isSelected
        ? <section contentEditable="false">
          <Toolbar>
            <FormatButton mark="italic" icon={<FormatItalicSharp />} />
            <FormatButton mark="roman" icon={<FormatClearSharp />} />
            <FormatButton mark="underline" icon={<FormatUnderlinedSharp />} />
            <FormatButton mark="strikethru" icon={<FormatStrikethroughSharp />} />
            <FormatButton mark="code" icon={<CodeSharp />} />
            <ToggleLinkButton />
            <MathButton inline />
            <MathButton />
          </Toolbar>
          <Divider variant="middle" />
        </section>
        : null}
      <Paragraph attributes={props.attributes}>
        <h1 style={HEADING_STYLES[(props.element as HeadingElem).level]}>
          {props.children}
        </h1>
      </Paragraph>
    </TextCard>
  );
};