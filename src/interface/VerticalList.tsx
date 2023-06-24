import { ChildrenProps } from "../utils/UtilityInterfaces";
import classes from "./VerticalList.module.css"

interface VerticalListProps {
  children: JSX.Element[] | JSX.Element;
}

export default function VerticalList(props: VerticalListProps) {
  return <div className={classes.vertlist}>{props.children}</div>
}