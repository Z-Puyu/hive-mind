import { ChildrenProps } from "../utils/UtilityInterfaces";
import classes from "./LaTeXCard.module.css";

interface LaTeXCardProps {
  children: JSX.Element;
  ref: React.RefObject<HTMLDivElement>;
}

export default function LaTeXCard(props: LaTeXCardProps): JSX.Element {
  return (
    <div className={classes.LaTeXCard} ref={props.ref}>
      {props.children}
    </div>
  );
};