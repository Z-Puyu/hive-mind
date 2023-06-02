import { useRef, useEffect } from "react";
import { TeXBoxItem } from "../pages/Editor";

interface InputProps {
  isVisible: boolean;
  value: string;
  onChange: (input: string) => void;
  onToggleVisibility: (bool: boolean) => void;
}

export default function Input(props: InputProps): JSX.Element | null {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => inputRef.current?.focus(), [props.isVisible]);

  return props.isVisible ? (<textarea
    className="TeX-input-box"
    ref={inputRef}
    value={props.value}
    onChange={event => props.onChange(event.target.value)}
    onFocus={event => event.currentTarget
      .setSelectionRange(event.currentTarget.value.length, event.currentTarget.value.length)}
    onKeyDown={event => {
      if (props.isVisible && !event.shiftKey && event.key === "Enter") {
        event.preventDefault();
        props.onToggleVisibility(false); // Closes current Input.
      }
    }}
  />) : null;
}