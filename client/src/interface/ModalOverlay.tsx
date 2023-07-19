import classes from "./ModalOverlay.module.css"
import { cx } from "@emotion/css";

interface ModalOverlayProps {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  ref?: React.RefObject<HTMLDivElement>;
  color: string;
}

export default function ModalOverlay(props: ModalOverlayProps) {
  return (
    <div
      ref={props.ref}
      onClick={props.onClick}
      className={cx(classes.overlay, props.color)}
    />
  );
}