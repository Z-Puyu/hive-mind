import { Box } from "@mui/material";
import classes from "./Tag.module.css";
import { css } from "@emotion/css";
import { DeleteSharp, DriveFileRenameOutlineSharp } from "@mui/icons-material";
import Colour from "../Colour";

interface TagProps {
  colour: string;
  name: string;
  isSelected: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick: () => void;
}

export default function Tag(props: TagProps) {
  return (
    <Box
      className={props.isSelected ? classes.selectedTag : classes.tag}
      onClick={() => props.onClick()}
    >
      <Colour 
        colour={props.colour}
        size={css`
          width: 15px;
          height: 15px;
        `}
        static
      />
      <p className={classes.text}>
        {props.name}
      </p>
      {props.onEdit ? <DriveFileRenameOutlineSharp onClick={props.onEdit}/> : null}
      {props.onDelete ? <DeleteSharp onClick={props.onDelete}/> : null}
    </Box>
  )
}