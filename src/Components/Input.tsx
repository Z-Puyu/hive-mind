interface props {
  value: string
  updater: (str: string) => void;
  isTriggered: boolean;
}

function Input({ value, updater, isTriggered }: props): JSX.Element | null {
  return isTriggered ? (
    <textarea onChange={event => updater(event.target.value)}>{value}</textarea>
  ) : null;
}

export default Input;