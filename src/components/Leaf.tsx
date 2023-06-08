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
    fontFamily: "",
    fontWeight: "",
    fontStyle: "",
    textAlign: "inherit",
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

  /* if (props.leaf.roman) {
    styles = {
      ...styles,
      fontWeight: "normal",
      fontStyle: "normal",
    };
  } */

  if (props.leaf.underline) {
    leaf = <u>{leaf}</u>;
  }

  if (props.leaf.strikethru) {
    leaf = <s>{leaf}</s>
  }

  if (props.leaf.code) {
    styles = {
      ...styles,
      borderRadius: "2.5px",
      padding: "0 0.2em",
      backgroundColor: "rgba(192, 192, 192, 0.5)",
      fontWeight: "normal",
      fontStyle: "normal",
    }
    leaf = <code>{leaf}</code>
  }

  return (
    <span
      {...props.attributes}
      // The following is a workaround for a Chromium bug where,
      // if you have an inline at the end of a block,
      // clicking the end of a block puts the cursor inside the inline
      // instead of inside the final {text: ""} node
      // https://github.com/ianstormtaylor/slate/issues/4704#issuecomment-1006696364
      style={props.leaf.text === "" ? {
        ...styles,
        paddingLeft: "0.1px",
      } : styles}
    >
      {leaf}
    </span>
  );
}