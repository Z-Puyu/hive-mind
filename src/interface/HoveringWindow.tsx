import ReactDOM from "react-dom";
import { ChildrenProps } from "../utils/UtilityInterfaces";
import { ReactPortal } from "react";

export default function HoveringWindow(props: ChildrenProps): ReactPortal | null {
  return typeof document === "object"
    ? ReactDOM.createPortal(props.children, document.body)
    : null;
}