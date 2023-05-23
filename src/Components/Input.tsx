import { useRef, useEffect } from 'react';

interface props {
  value: string;
  updater: (str: string) => void;
  isTriggered: boolean;
  toggleVisibility: (visibility: boolean) => void;
}

function Input({ value, updater, isTriggered, toggleVisibility }: props): JSX.Element | null {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // This auto-focus the caret to the end of the input value.
  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, [isTriggered])

  return isTriggered ? (
    <textarea
      ref={inputRef}
      onChange={event => updater(event.target.value)}
      onFocus={event => event.currentTarget.setSelectionRange(event.currentTarget.value.length,
        event.currentTarget.value.length)}
      onKeyDown={event => {
        if (isTriggered && !event.shiftKey && event.key === "Enter") {
          event.preventDefault();
          toggleVisibility(!isTriggered);
        }
      }}
    >
      {value}
    </textarea>
  ) : null;
}

export default Input;