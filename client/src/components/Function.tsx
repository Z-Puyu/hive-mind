import { css } from "@emotion/css";
import { CheckSharp } from "@mui/icons-material";
import { Box, Button, ListItem, ListItemText } from "@mui/material";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useState } from "react";

interface FunctionProps {
  f: {id: string, def: string, fx: boolean};
  sub: number;
  onChange: (str: string) => void;
  onFlipVar: () => void;
}

export default function Function(props: FunctionProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(props.f.def);

  const onBlurHandler = () => {
    props.onChange(value);
    setIsEditing(false);
  }

  return (
    <Box className={css`
      display: flex;
      align-items: center;
    `}>
      <MathJax 
        inline 
        className={css`
          font-family: "times";
          font-size: large;
          margin-right: 0.5em;
        `}
      >
        <span 
          className={css`
            border-radius: 0.25em;
            padding: 0.25em 0;
            cursor: pointer;
            &:hover {
              background-color: rgba(192, 192, 192, 0.5);
              transition: 0.2s;
            }
          `}
          onClick={props.onFlipVar}
        >
          {`$f_{${props.sub + 1}` + "}(" + (props.f.fx ? "x" : "y") + ")=$"}
        </span>
      </MathJax>
      {isEditing || props.f.def === "" ? <><input
        className={css`
          border: none;
          display: inline-flex;
          align-items: center;
          padding: 0 0.5em;
          width: 100%;
          height: 25px;
          background-color: rgba(192, 192, 192, 0.5);
          border-radius: 0.25em;
          font-family: monospace;
          font-size: large;
          color: rgba(64, 64, 64, 0.8);
        `}
        value={value}
        onFocus={() => setIsEditing(true)}
        onBlur={onBlurHandler}
        onChange={event => setValue(event.target.value)}
      />
      <span 
        className={css`
          display: flex;
          align-items: center;
          border-radius: 0.25em;
          margin-left: 0.5em;
          width: 25px;
          height: 25px;
          cursor: pointer;
          &:hover {
            background-color: rgba(0, 128, 0, 0.1);
            transition: 0.1s;
          }
        `}
      >
        <CheckSharp />
      </span></> : <MathJax 
        inline
        style={{
          display: "flex",
        }}
        className={css`
          align-items: center;
          padding: 0 0.5em;
          width: 100%;
          height: 25px;
          border-radius: 0.25em;
          cursor: pointer;
          &:hover {
            background-color: rgba(192, 192, 192, 0.5);
            transition: 0.2s;
          }
        `}
        onClick={() => setIsEditing(true)}
      >
        {`$${value}$`}
      </MathJax>}
    </Box>
  )
}