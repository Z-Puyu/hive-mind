import { ChildrenProps } from "../utils/UtilityInterfaces";
import classes from "./TextCard.module.css";

export default function TextCard(props: ChildrenProps) {
  return <div className={classes.textCard}>{props.children}</div>;
};