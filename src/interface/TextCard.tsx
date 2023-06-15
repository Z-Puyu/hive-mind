import { ChildrenProps } from "../utils/UtilityInterfaces";
import classes from "./TextCard.module.css";

export default function TextCard(props: ChildrenProps): JSX.Element {
  return <div
    className={classes.textCard}
    onClick={event => event.preventDefault()}
  >
    {props.children}
  </div>;
};