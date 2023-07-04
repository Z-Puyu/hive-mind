import { MathJax } from "better-react-mathjax";
import { ReactEditor, RenderElementProps, useSelected, useSlate } from "slate-react";
import MathPreview from "../MathPreview";
import { useEffect, useState, useRef } from "react";
import classes from "./DisplayedMath.module.css"
import { css } from "@emotion/css";
import { MathElem } from "../../../utils/CustomSlateTypes";
import { Menu, MenuItem } from "@mui/material";
import { Editor, Transforms } from "slate";

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
  const editor: Editor = useSlate();
  const isSelected: boolean = useSelected();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const mathRef = useRef<HTMLDivElement>(null);
  const [environment, setEnvironment] = useState<string>((props.element as MathElem).environment!);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  useEffect(() => setIsVisible(false), [isSelected === true]);

  const onChangeEnvironemtHandler = (env: string) => {
    setEnvironment(env);
    setAnchor(null);
  }

  const onPointerDownHandler = (event: React.PointerEvent<HTMLSpanElement>) => {
    event.preventDefault();
    setIsVisible(true);
  }

  return isSelected ? (
    <div
      {...props.attributes}
      className={classes.displayedMath}
      suppressContentEditableWarning={true}
    >
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
        `}
        suppressContentEditableWarning={true}
      >
        <code
          contentEditable="false"
          className={css`font-size: 10pt`}
          suppressContentEditableWarning={true}
        >
          {"\\begin{"}
          <Menu
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
            contentEditable="false"
            className={css`
              border-radius: 0.25em;
              padding: 0 0.25em;
              cursor: pointer;
              &:hover {
                background-color: rgba(192, 192, 192, 0.2)
              }
            `}
            onClick={event => setAnchor(event.currentTarget)}
            suppressContentEditableWarning={true}
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
          suppressContentEditableWarning={true}
        >
          {props.children}
        </div>
        <code
          contentEditable="false"
          className={css`font-size: 10pt`}
          suppressContentEditableWarning={true}
        >
          {"\\end{"}
          <Menu
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
            contentEditable="false"
            className={css`
              border-radius: 0.25em;
              padding: 0 0.25em;
              cursor: pointer;
              &:hover {
                background-color: rgba(192, 192, 192, 0.2)
              }
            `}
            onClick={event => setAnchor(event.currentTarget)}
            suppressContentEditableWarning={true}
          >
            {environment}
          </span>
          {"}"}
        </code>
      </div>
    </div>
  ) : isVisible ? (
    <div
      {...props.attributes}
      className={classes.displayedMath}
      suppressContentEditableWarning={true}
      contentEditable="false"
    >
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
        `}
        onPointerUp={() => Transforms.select(editor,
          ReactEditor.findPath(editor, props.element.children[0]))}
        suppressContentEditableWarning={true}
      >
        <code
          contentEditable="false"
          className={css`font-size: 10pt`}
          suppressContentEditableWarning={true}
        >
          {"\\begin{"}
          <span
            contentEditable="false"
            className={css`
              border-radius: 0.25em;
              padding: 0 0.25em;
              cursor: pointer;
              &:hover {
                background-color: rgba(192, 192, 192, 0.2)
              }
            `}
            onClick={event => setAnchor(event.currentTarget)}
            suppressContentEditableWarning={true}
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
          suppressContentEditableWarning={true}
        >
          {props.children}
        </div>
        <code
          contentEditable="false"
          className={css`font-size: 10pt`}
          suppressContentEditableWarning={true}
        >
          {"\\end{"}
          <span
            contentEditable="false"
            className={css`
              border-radius: 0.25em;
              padding: 0 0.25em;
              cursor: pointer;
              &:hover {
                background-color: rgba(192, 192, 192, 0.2)
              }
            `}
            onClick={event => setAnchor(event.currentTarget)}
            suppressContentEditableWarning={true}
          >
            {environment}
          </span>
          {"}"}
        </code>
      </div>
    </div>
  ) : (
    <>
      <br />
      <div
        className={css`
          display: inline-block;
          text-align: center;
          margin-left: 50%;
          transform: translateX(-50%);
          width: fit-content;
          font-family: "Times New Roman";
          cursor: default;
          border-radius: 0.5em;
          padding: 0 0.5em;
          &:hover {
            background-color: rgb(233, 221, 182);
            padding: 0.05% 0.5em;
            transition: 0.2s;
          }
        `}
        onPointerDown={onPointerDownHandler}
      >
        <MathJax
          dynamic
          contentEditable="false"
          suppressContentEditableWarning={true}
          className={css`
            font-family: "times";
            font-weight: normal;
            font-style: normal;
            cursor: pointer;
          `}
        >
          {"\\begin{displaymath}"}
          {"\\begin{" + environment + "}"}
          {props.children[0].props.text.text}
          {"\\end{" + environment + "}"}
          {"\\end{displaymath}"}
        </MathJax>
      </div>
    </>
  );
};