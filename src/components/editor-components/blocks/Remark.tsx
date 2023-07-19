import { RenderElementProps, useSelected } from "slate-react";
import {
  FormatBoldSharp,
  FormatItalicSharp,
  FormatClearSharp,
  FormatUnderlinedSharp,
  FormatStrikethroughSharp,
  CodeSharp
} from "@mui/icons-material";
import { Divider } from "@mui/material";
import Toolbar from "../../../interface/Toolbar";
import Paragraph from "../../../interface/Paragraph";
import TextCard from "../../../interface/TextCard";
import FormatButton from "../FormatButton";
import MathButton from "../MathButton";
import ToggleLinkButton from "../ToggleLinkButton";
import BookmarkButton from "../BookmarkButton";
import { css } from "@emotion/css";
import IllustrationButton from "../IllustrationButton";

export default function Remark(props: RenderElementProps): JSX.Element {
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
          </Toolbar>
          <Divider variant="middle" />
        </section>
        : null}
      <section className={isSelected ? css`padding: 0.75em 0` : undefined}>
        <Paragraph attributes={props.attributes}>
          <i
            contentEditable="false"
            suppressContentEditableWarning={true}
          >
            {"Remark. "}
          </i>
          {props.children}
        </Paragraph>
      </section>
    </TextCard>
  );
};