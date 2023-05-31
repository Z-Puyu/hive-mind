import { Text } from "slate";

interface LeafProps {
  attributes: any;
  children: JSX.Element;
  leaf: Text;
}

export default function Leaf(props: LeafProps): JSX.Element {
  let styles = {
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

  return (
    <span
      {...props.attributes}
      style={styles}
    >
      {props.children}
    </span>
  );
}