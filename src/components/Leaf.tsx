import { Text } from "slate";

interface LeafProps {
  attributes: any;
  children: JSX.Element;
  leaf: Text;
}

export default function Leaf(props: LeafProps): JSX.Element {
  let leaf: JSX.Element = props.children;
  let styles = {
    borderRadius: "0",
    padding: "0",
    backgroundColor: "",
    fontFamily: "times",
    fontWeight: "normal",
    fontStyle: "normal",
  };

  if (props.leaf.bold) {
    styles = {
      ...styles,
      fontWeight: "bold",
    }
  }

  if (props.leaf.italic) {
    styles = {
      ...styles,
      fontStyle: "italic",
    };
  }

  if (props.leaf.roman) {
    styles = {
      ...styles,
      fontWeight: "normal",
      fontStyle: "normal",
    };
  }

  if (props.leaf.underline) {
    leaf = <u>{leaf}</u>;
  }

  if (props.leaf.strikethru) {
    leaf = <s>{leaf}</s>
  }

  if (props.leaf.code) {
    styles = {
      ...styles,
      borderRadius: "3.5px",
      padding: "0px 5px",
      backgroundColor: "rgba(192, 192, 192, 0.5)",
      fontWeight: "normal",
      fontStyle: "normal",
    }
    leaf = <code>{leaf}</code>
  }

  return (
    <span
      {...props.attributes}
      style={styles}
    >
      {leaf}
    </span>
  );
}