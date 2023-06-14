import ReactDOM from "react-dom";
import { ChildrenProps } from "../utils/UtilityInterfaces";
import { ReactPortal } from "react";

interface HoveringWindowProps {
  children: JSX.Element;
}

export default function HoveringWindow(props: HoveringWindowProps): ReactPortal | null {
  return typeof document === "object"
    ? ReactDOM.createPortal(props.children, document.body)
    : null;
};