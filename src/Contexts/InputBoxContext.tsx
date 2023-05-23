import { createContext } from "react";

interface inputBox {
  isVisible: boolean;
  tex: string;
};

interface JSXProps {
  children: JSX.Element;
};

const InputBoxContext: React.Context<inputBox> = createContext<inputBox>({
  isVisible: false,
  tex: "\\LaTeX",
});

export const InputBoxContextProvider: React.FC<JSXProps> = (props: JSXProps) => {
  return <InputBoxContext.Provider value={{ isVisible: false, tex: "\\LaTeX" }}>
    {props.children}
  </InputBoxContext.Provider>
}

export default InputBoxContext;