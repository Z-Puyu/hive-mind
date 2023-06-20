import { css, cx } from "@emotion/css";
import { ChildrenProps, Coords } from "../utils/UtilityInterfaces";
import classes from "./SelectMenu.module.css";
import { useMouse } from "ahooks";
import { CursorState } from "ahooks/lib/useMouse";
import { useEffect, useRef } from "react";

interface SelectMenuProps {
  children: JSX.Element;
  position: Coords;
}

export default function SelectMenu(props: SelectMenuProps): JSX.Element {
  const mouse: CursorState = useMouse();
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={menuRef}
      /* className={classes.menu} */
      style={{
        position: "absolute",
        left: `${props.position.x}px`,
        top: `${props.position.y}px`,
        backgroundColor: "white",
        borderRadius: "0.8em",
        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
        padding: "12px 16px",
        minWidth: "100px",
        display: "inline-block",
        zIndex: "1002",
      }}
    >
      {props.children}
    </div>
  );
};