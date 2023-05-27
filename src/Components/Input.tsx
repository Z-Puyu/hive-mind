import { useRef, useEffect } from "react";
import { NewBoxData } from "./Editor";

interface InputProps {
  isVisible: boolean;
  value: string;
  id: string;
  ref: HTMLElement | null;
  onUpdateInput: (input: string) => void;
  onToggleVisibility: (bool: boolean) => void;
  onAddBox: (data: NewBoxData) => void;
}

export default function Input(props: InputProps): JSX.Element | null {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => inputRef.current?.focus(), [props.isVisible]);

  return props.isVisible ? (<textarea
      className="TeXInputBox"
      ref={inputRef}
      onChange={event => props.onUpdateInput(event.target.value)}
      onFocus={event => event.currentTarget
        .setSelectionRange(event.currentTarget.value.length, event.currentTarget.value.length)}
      onKeyDown={event => {
        if (props.isVisible && !event.shiftKey && event.key === "Enter") {
          console.log("Enter")
          event.preventDefault();
          props.onAddBox({ id: props.id, ref: props.ref });
          props.onToggleVisibility(false);
        }
      }}
    >
      {props.value}
    </textarea>) : null;
}