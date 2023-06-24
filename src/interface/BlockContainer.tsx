import { ChildrenProps } from "../utils/UtilityInterfaces";
import classes from "./BlockContainer.module.css"

export default function BlockContainer(props: ChildrenProps) {
  return (<div
    className={classes.container}
    suppressContentEditableWarning={true}
  >
    {props.children}
  </div>
  );
}