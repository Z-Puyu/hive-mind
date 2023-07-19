import { PropsWithChildren } from "react";
import classes from "./VerticalList.module.css"

interface VerticalListProps {
  children: JSX.Element[] | JSX.Element;
}

export default function VerticalList(props: PropsWithChildren) {
  return <div className={classes.vertlist}>{props.children}</div>
}