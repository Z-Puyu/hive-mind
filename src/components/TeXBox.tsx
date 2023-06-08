import { RenderElementProps, useSelected } from "slate-react";
import Toolbar from "../interface/Toolbar";
import FormatButton from "./FormatButton";
import ToggleLinkButton from "./ToggleLinkButton";
import MathButton from "./MathButton";
import CodeButton from "./CodeButton";
import BlockButton from "./BlockButton";
import TextCard from "../interface/TextCard";

export default function TeXBox(props: RenderElementProps) {
  const isSelected = useSelected();
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
          <BlockButton blockType="code-block" />
          <BlockButton blockType="quote" />
          <BlockButton blockType="heading" />
          <ToggleLinkButton />
          <MathButton inline />
          <MathButton />
        </Toolbar> : null}
        <p
          {...props.attributes}
        >
          {props.children}
        </p>
      </>
    </TextCard>
  );
}