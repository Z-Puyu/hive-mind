import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import classes from "./TextCard.module.css";
import { useSelected } from "slate-react";

export default function TextCard(props: PropsWithChildren): JSX.Element {
  const isSelected: boolean = useSelected();

  return (
    <Box
      className={ isSelected ? classes.textCard : classes.transparentCard }
      suppressContentEditableWarning={true}
    >
      {props.children}
    </Box>
  );
};