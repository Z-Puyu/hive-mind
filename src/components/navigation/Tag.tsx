import { Box } from "@mui/material";
import classes from "./Tag.module.css";
import { css, cx } from "@emotion/css";
import { DeleteSharp, DriveFileRenameOutlineSharp } from "@mui/icons-material";
import { DocumentData } from "firebase/firestore";

interface TagProps {
  colour: string;
  name: string;
  onEdit: (tag:DocumentData) => void;
  onDelete: () => void;
}

export default function Tag(props: TagProps) {
  return (
    <Box
      className={classes.tag}
    >
      <span className={cx(classes.pin, css`background-color: ${props.colour}`)}/>
      <p className={classes.text}>{props.name}</p>
      <DriveFileRenameOutlineSharp onClick={props.onEdit}/>
      <DeleteSharp onClick={props.onDelete}/>
    </Box>
  )
}