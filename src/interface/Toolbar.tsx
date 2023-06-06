import classes from "./Toolbar.module.css";

interface ToolbarProps {
  children: JSX.Element[] | JSX.Element;
}

export default function Toolbar(props: ToolbarProps) {
  return (
    <div className={classes.toolbar} contentEditable="false">
      {props.children}
    </div>
  );
};