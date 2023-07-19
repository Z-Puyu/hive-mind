import { Divider, ListItem, ListItemButton, MenuItem } from "@mui/material";
import classes from "./FriendCard.module.css";

interface FriendCardProps {
  name: string;
  email: string;
  onClick: () => void;
}

export default function FriendCard(props: FriendCardProps) {
  return (
    <ListItem>
      <ListItemButton
        className={classes.docRow}
        onClick={() => props.onClick()}
      >
        <span className={classes.nameCell}>{props.name}</span>
        <span className={classes.emailCell}>{props.email}</span>
      </ListItemButton>
      <Divider variant="middle" />
    </ListItem>
  )
}