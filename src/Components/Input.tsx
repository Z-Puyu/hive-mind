import { useRef, useEffect } from "react";
import { TeXBoxItem } from "./Editor";

interface InputProps {
  isVisible: boolean;
  value: string;
  id: string;
  ref: HTMLElement | null;
  onUpdateInput: (input: string) => void;
  onToggleVisibility: (bool: boolean) => void;
  onAddBox: (box: TeXBoxItem) => void;
  onDeleteBox: (box: TeXBoxItem) => void;
}

export default function Input(props: InputProps): JSX.Element | null {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => inputRef.current?.focus(), [props.isVisible]);

  return props.isVisible ? (<textarea
    className="TeX-input-box"
    ref={inputRef}
    value={props.value}
    onChange={event => props.onUpdateInput(event.target.value)}
    onFocus={event => event.currentTarget
      .setSelectionRange(event.currentTarget.value.length, event.currentTarget.value.length)}
    onKeyDown={event => {
      if (props.isVisible && !event.shiftKey && event.key === "Enter") {
        event.preventDefault();
        props.onAddBox({
          id: props.id,
          html: "",
          initInputVisibility: true,
          ref: props.ref,
        });
        props.onToggleVisibility(false); // Closes current Input.
      } else if (event.key === "Backspace" && inputRef.current?.value === "") {
        event.preventDefault();
        props.onDeleteBox({
          id: props.id,
          html: "",
          initInputVisibility: true,
          ref: props.ref,
        });
      }
    }}
  ></textarea>) : null;
}