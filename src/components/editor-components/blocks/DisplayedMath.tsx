import { MathJax } from "better-react-mathjax";
import { RenderElementProps, useSelected } from "slate-react";
import MathPreview from "../MathPreview";
import { useEffect, useState, useRef } from "react";
import classes from "./DisplayedMath.module.css"
import { css } from "@emotion/css";
import { MathElem } from "../../../utils/CustomSlateTypes";
import { Menu, MenuItem } from "@mui/material";

const ALLOWED_ENVIRONMENTS: string[] = [
  "equation*",
  "align*",
  "cases",
  "pmatrix",
  "bmatrix",
  "vmatrix",
  "Vmatrix",
  "matrix",
  "gather"
];

export default function DisplayedMath(props: RenderElementProps): JSX.Element {
  const isSelected: boolean = useSelected();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const mathRef = useRef<HTMLDivElement>(null);
  const envRef = useRef<HTMLSpanElement>(null);
  const [environment, setEnvironment] = useState<string>((props.element as MathElem).environment!);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  useEffect(() => setIsVisible(false), [isSelected === true]);

  const onChangeEnvironemtHandler = (env: string) => {
    setEnvironment(env);
    setAnchor(null);
  }

  return isVisible || isSelected ? (
    <div {...props.attributes} className={classes.displayedMath}>
      <MathPreview
        value={props.children[0].props.text.text}
        rect={mathRef.current?.getBoundingClientRect()}
        displayStyle={environment}
      />
      <div
        ref={mathRef}
        className={css`
          text-align: left;
          margin: auto;
          width: fit-content;
      ` }
      >
        <code contentEditable="false" className={css`font-size: 10pt`}>
          {"\\begin{"}
          <Menu
            className={css`
             
            `}
            open={!!anchor}
            onClose={() => setAnchor(null)}
            anchorEl={anchor}
          >
            {ALLOWED_ENVIRONMENTS.filter(env => env !== environment)
              .map(env => <MenuItem
                key={env}
                onClick={() => onChangeEnvironemtHandler(env)}
              >
                {env}
              </MenuItem>)}
          </Menu>
          <span 
            className={css`
              border-radius: 0.25em;
              padding: 0 0.25em;
              cursor: pointer;
              &:hover {
                background-color: rgba(192, 192, 192, 0.2)
              }
            `}
            onClick={event => setAnchor(event.currentTarget)}
          >
            {environment}
          </span>
          {"}"}
        </code>
        <div
          className={css`
            background-color: rgba(192, 192, 192, 0.2);
            border-radius: 0.5em;
            padding: 0.25em 0.5em;
            margin: 0.25em 0;
            font-family: monospace;
          `}
        >
          {props.children}
        </div>
        <code contentEditable="false" className={css`font-size: 10pt`}>
          {"\\end{"}
          <Menu
            className={css`
             
            `}
            open={!!anchor}
            onClose={() => setAnchor(null)}
            anchorEl={anchor}
          >
            {ALLOWED_ENVIRONMENTS.filter(env => env !== environment)
              .map(env => <MenuItem
                key={env}
                onClick={() => onChangeEnvironemtHandler(env)}
              >
                {env}
              </MenuItem>)}
          </Menu>
          <span 
            className={css`
              border-radius: 0.25em;
              padding: 0 0.25em;
              cursor: pointer;
              &:hover {
                background-color: rgba(192, 192, 192, 0.2)
              }
            `}
            onClick={event => setAnchor(event.currentTarget)}
          >
            {environment}
          </span>
          {"}"}
        </code>
      </div>
    </div>
  ) : (
    <div
      className={css`
        text-align: center;
        margin: auto;
        width: fit-content;
        font-family: "Times New Roman";
        cursor: pointer;
        border-radius: 0.5em;
        padding: 0 0.5em;
        &:hover {
          background-color: rgb(233, 221, 182);
          padding: 0.05% 0.5em;
          transition: 0.2s;
        }
      `}
    >
      <MathJax
        dynamic
        contentEditable="false"
        suppressContentEditableWarning={true}
        style={{
          fontFamily: "times",
          fontWeight: "normal",
          fontStyle: "normal",
        }}
        onClick={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
          event.preventDefault();
          setIsVisible(true);
        }}
      >
        {"\\begin{displaymath}"}
        {"\\begin{" + environment + "}"}
        {props.children[0].props.text.text}
        {"\\end{" + environment + "}"}
        {"\\end{displaymath}"}
      </MathJax>
    </div>
  );
};