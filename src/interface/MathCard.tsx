import { ChildrenProps } from "../utils/UtilityInterfaces";
import classes from "./MathCard.module.css";

export default function MathCard(props: ChildrenProps): JSX.Element {
  return (
    <div className={classes.mathCard}>
      {props.children}
    </div>
  );
};