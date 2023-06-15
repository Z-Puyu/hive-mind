import { RenderElementProps, useFocused, useSelected, useSlate } from "slate-react";
import { useState, KeyboardEvent } from "react";
import BlockSelection from "./BlockSelection";
import { Editor, Transforms } from "slate";
import { TypesetUtil } from "../utils/TypesetUtil";
import { CommandElem } from "../utils/CustomSlateTypes";
import { useEffect } from "react";

export default function Command(props: RenderElementProps) {
  const isSelected: boolean = useSelected();

  /* useEffect(() => {
    if (isSelected) {
      console.log("toggle true");
      (props.element as CommandElem).toggleMenu(false);
    } else {
      console.log("toggle false");
    (props.element as CommandElem).toggleMenu(false);
    }
  }, [isSelected]); */

  return isSelected ? (
    <code
      {...props.attributes}
      style={{ color: "blue" }}
    >
      {props.children}
    </code>
  ) : (
    <span>{props.children}</span>
  );
}