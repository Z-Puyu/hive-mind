import { css } from "@emotion/css";
import HoveringWindow from "./HoveringWindow";
import ModalOverlay from "./ModalOverlay";
import { useState } from "react";

interface ModalProps {
  children: JSX.Element;
  onClose: (x: any) => void;
}

export default function Modal(props: ModalProps): JSX.Element | null {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return isOpen ? (
    <HoveringWindow>
      <ModalOverlay
        onClick={props.onClose}
        color={css`background-color: rgba(0, 0, 0, 0.5)`}
      />
      {props.children}
    </HoveringWindow>
  ) : null;
}