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
import TheoremTitle from "./TheoremTitle";

export default function Definition(props: RenderElementProps): JSX.Element {
  const isSelected: boolean = useSelected();

  return (
    <TextCard>
      <>
        <TheoremTitle dfnStyle title={(props.element as ThmElem).title}/>
        {isSelected ? <Toolbar>
          <FormatButton mark="bold" />
          <FormatButton mark="roman" />
          <FormatButton mark="underline" />
          <FormatButton mark="strikethru" />
          <CodeButton />
          <ToggleLinkButton />
          <MathButton inline />
          <MathButton />
        </Toolbar> : null}
        <Paragraph attributes={props.attributes}>
          {props.children}
        </Paragraph>
      </>
    </TextCard>
  );
};