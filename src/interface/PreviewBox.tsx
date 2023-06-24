import { useRef, useEffect } from "react";
import classes from "./PreviewBox.module.css";
import { css, cx } from "@emotion/css";

interface PreviewBoxProps {
  children: JSX.Element;
  owner?: React.RefObject<HTMLElement>;
  displayStyle?: true;
}

export default function PreviewBox(props: PreviewBoxProps): JSX.Element {
  const boxRef = useRef<HTMLDivElement>(null);

  /* useEffect(() => {
    boxRef.current!.style.left = `${(props.owner?.current!.offsetWidth! - 
      boxRef.current!.offsetWidth) / 2}px`
  }); */

  return (
    <div
      ref={boxRef}
      className={cx(
        classes.previewBox,
        props.displayStyle
          ? css`
            left: ${(boxRef.current?.parentElement?.offsetWidth! -
              boxRef.current?.offsetWidth!) / 2}px;
            top: -60px;
          `
          : css`
            left: ${(props.owner?.current?.offsetWidth! - boxRef.current?.offsetWidth!) / 2}px;
          `
      )}
    >
      {props.children}
    </div>
  );
};