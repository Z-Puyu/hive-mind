import { RenderElementProps, useSelected } from "slate-react";
import TextCard from "../interface/TextCard";
import Toolbar from "../interface/Toolbar";
import BlockButton from "./BlockButton";
import CodeButton from "./CodeButton";
import FormatButton from "./FormatButton";
import MathButton from "./MathButton";
import ToggleLinkButton from "./ToggleLinkButton";
import { css } from "@emotion/css";
import { ThmElem } from "../utils/CustomSlateTypes";
import Paragraph from "../interface/Paragraph";

export default function Remark(props: RenderElementProps): JSX.Element {
  const isSelected: boolean = useSelected();

  return (
    <TextCard>
      <>
        {isSelected ? <Toolbar>
          <FormatButton mark="bold" />
          <FormatButton mark="italic" />
          <FormatButton mark="roman" />
          <FormatButton mark="underline" />
          <FormatButton mark="strikethru" />
          <CodeButton />
          <ToggleLinkButton />
          <MathButton inline />
          <MathButton />
        </Toolbar> : null}
        <Paragraph attributes={props.attributes}>
          <i
            contentEditable="false"
            suppressContentEditableWarning={true}
          >
            Remark.
          </i>
          {props.children}
        </Paragraph>
      </>
    </TextCard>
  );
};