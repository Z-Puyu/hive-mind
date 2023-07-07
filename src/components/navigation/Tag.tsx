import { Box } from "@mui/material";
import classes from "./Tag.module.css";
import { css, cx } from "@emotion/css";
import { DeleteSharp, DriveFileRenameOutlineSharp } from "@mui/icons-material";
import { DocumentData } from "firebase/firestore";
import Colour from "../Colour";

interface TagProps {
  colour: string;
  name: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

export default function Tag(props: TagProps) {
  return (
    <Box
      className={classes.tag}
    >
      <Colour 
        colour={props.colour}
        size={css`
          width: 15px;
          height: 15px;
        `}
        static
      />
      <p 
        className={classes.text}
        onClick={props.onClick}
      >{props.name}</p>
      <DriveFileRenameOutlineSharp onClick={props.onEdit}/>
      <DeleteSharp onClick={props.onDelete}/>
    </Box>
  )
}