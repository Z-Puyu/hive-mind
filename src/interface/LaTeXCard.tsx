import { ChildrenProps } from "../utils/UtilityInterfaces";
import classes from "./LaTeXCard.module.css";

export default function LaTeXCard(props: ChildrenProps) {
  return (
    <div className={classes.LaTeXCard}>
      {props.children}
    </div>
  )
}