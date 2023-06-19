import { ChildrenProps } from "../utils/UtilityInterfaces";
import BlockContainer from "./BlockContainer";
import classes from "./TextCard.module.css";

export default function TextCard(props: ChildrenProps): JSX.Element {
  return (
    <div
      className={classes.textCard}
      onClick={event => event.preventDefault()}
      suppressContentEditableWarning={true}
    >
      {props.children}
    </div>
  );
};