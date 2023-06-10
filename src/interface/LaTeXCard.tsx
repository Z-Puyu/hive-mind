import { ChildrenProps } from "../utils/UtilityInterfaces";
import classes from "./LaTeXCard.module.css";

export default function LaTeXCard(props: ChildrenProps): JSX.Element {
  return (
    <div className={classes.LaTeXCard}>
      {props.children}
    </div>
  );
};