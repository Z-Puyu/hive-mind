import { useRef, useEffect } from 'react';

interface props {
  value: string;
  updater: (str: string) => void;
  isTriggered: boolean;
}

function Input({ value, updater, isTriggered }: props): JSX.Element | null {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, [isTriggered])

  return isTriggered ? (
    <textarea
      ref={inputRef}
      onChange={event => updater(event.target.value)}
      onFocus={event => event.currentTarget.setSelectionRange(event.currentTarget.value.length,
        event.currentTarget.value.length)}
    >
      {value}
    </textarea>
  ) : null;
}

export default Input;