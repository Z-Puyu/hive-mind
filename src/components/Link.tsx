import { RenderElementProps } from "slate-react";
import InlineChromiumBugfix from "../utils/InlineChromBugFix";
import { LinkElem } from "../utils/CustomSlateTypes";

export default function Link(props: RenderElementProps): JSX.Element {
  return (
    <a {...props.attributes} href={(props.element as LinkElem).url}>
      <InlineChromiumBugfix />
      {props.children}
      <InlineChromiumBugfix />
    </a>
  );
};