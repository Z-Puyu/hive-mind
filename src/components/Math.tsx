import { RenderElementProps } from "slate-react";
import DisplayedMath from "./DisplayedMath";
import InlineMath from "./InlineMath";
import { MathElem } from "../utils/CustomSlateTypes";

export default function Math(props: RenderElementProps) {
  return (props.element as MathElem).inline ? <InlineMath {...props} /> : <DisplayedMath {...props} />;
}