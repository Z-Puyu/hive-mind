import { RenderElementProps, useSelected } from "slate-react";
import { HeadingElem } from "../utils/CustomSlateTypes";
import TextCard from "../interface/TextCard";
import { FormatBoldSharp, FormatItalicSharp, FormatClearSharp, FormatUnderlinedSharp, FormatStrikethroughSharp, CodeSharp, FormatQuoteSharp, TitleSharp } from "@mui/icons-material";
import { Toolbar, Divider } from "@mui/material";
import BlockButton from "./BlockButton";
import FormatButton from "./FormatButton";
import MathButton from "./MathButton";
import ToggleLinkButton from "./ToggleLinkButton";
import Paragraph from "../interface/Paragraph";

export default function Heading(props: RenderElementProps) {
  const isSelected: boolean = useSelected();

  let styles: { [key: string]: string };
  switch ((props.element as HeadingElem).level) {
    case "part":
      styles = {
        fontSize: "24.88pt",
      };
      break;
    case "chapter":
      styles = {
        fontSize: "24.88pt",
      };
      break;
    case "section":
      styles = {
        fontSize: "17.28pt",
      };
      break;
    case "subsection":
      styles = {
        fontSize: "14.4pt",
      };
      break;
    case "subsubsection":
      styles = {
        fontSize: "12pt",
      };
      break;
    default:
      styles = {
        fontSize: "17.28pt",
      };
      break;
  }

  return (
    <TextCard>
      {isSelected
        ? <section contentEditable="false">
          <Toolbar>
            <FormatButton mark="bold" icon={<FormatBoldSharp />} />
            <FormatButton mark="italic" icon={<FormatItalicSharp />} />
            <FormatButton mark="roman" icon={<FormatClearSharp />} />
            <FormatButton mark="underline" icon={<FormatUnderlinedSharp />} />
            <FormatButton mark="strikethru" icon={<FormatStrikethroughSharp />} />
            <FormatButton mark="code" icon={<CodeSharp />} />
            <BlockButton blockType="quote" icon={<FormatQuoteSharp />} />
            <BlockButton blockType="heading" icon={<TitleSharp />} />
            <ToggleLinkButton />
            <MathButton inline />
            <MathButton />
          </Toolbar>
          <Divider variant="middle" />
        </section>
        : null}
      <Paragraph attributes={props.attributes}>
        <h1 style={styles}>
          {props.children}
        </h1>
      </Paragraph>
    </TextCard>
  );
};