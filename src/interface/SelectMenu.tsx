import { css, cx } from "@emotion/css";
import { Coords } from "../utils/UtilityInterfaces";
import classes from "./SelectMenu.module.css";
import { useMouse } from "ahooks";
import { CursorState } from "ahooks/lib/useMouse";
import { useRef } from "react";

interface SelectMenuProps {
  children: JSX.Element;
  position: Coords;
}

export default function SelectMenu(props: SelectMenuProps): JSX.Element {
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={menuRef}
      /* className={classes.menu} */
      className={cx(
        css`
          left: ${props.position.x}px,
          top: ${props.position.y}px,
        `, classes.menu
      )}
    >
      {props.children}
    </div >
  );
};