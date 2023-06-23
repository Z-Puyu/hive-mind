import classes from "./Toolbar.module.css";

interface ToolbarProps {
  children: JSX.Element[] | JSX.Element;
}

export default function Toolbar(props: ToolbarProps): JSX.Element {
  return (
    <div
      className={classes.toolbar}
      contentEditable="false"
      onClick={event => event.preventDefault()}
      suppressContentEditableWarning={true}
    >
      {props.children}
    </div>
  );
};