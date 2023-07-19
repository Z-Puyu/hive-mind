import { css } from "@emotion/css";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  TableCell,
  TableRow,
  TextField
} from "@mui/material";
import {
  DocumentData,
  DocumentReference,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { useRef, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { db } from "../../config/Firebase";
import classes from "./DocumentRow.module.css";
import { DeleteSharp, DriveFileRenameOutlineSharp, MoreHorizSharp } from "@mui/icons-material";
import MiniTag from "./MiniTag";
import MoreTags from "./MoreTags";

interface DocumentRowProps {
  docData: DocumentData;
  onSelect: () => void;
  onRemove: () => void;
  isChecked: boolean;
}

export default function DocumentRow(props: DocumentRowProps): JSX.Element {
  const navigate: NavigateFunction = useNavigate();

  const ellipsisRef = useRef<HTMLSpanElement>(null);

  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  /* const [isChecked, setIsChecked] = useState<boolean>(props.isChecked); */
  const currProject: DocumentReference<DocumentData> = doc(db, "userProjects",
    props.docData.user, "projects", props.docData.id);
  const [docName, setDocName] = useState<string>("");
  const [isShowingAllTags, setIsShowingAllTags] = useState<boolean>(false);

  const onRenameProjectHandler = () => {
    updateDoc(currProject, {
      fileName: docName,
      timeStamp: serverTimestamp(),
    });
    setIsRenaming(false);
  }

  const onCheckHandler = () => {
    if (!props.isChecked) {
      props.onSelect();
    } else {
      props.onRemove();
    }
  }

  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={props.isChecked}
      tabIndex={-1}
      key={props.docData.id}
      selected={props.isChecked}
    >
      <TableCell
        padding="checkbox"
        onClick={onCheckHandler}
        sx={{ cursor: "pointer" }}
      >
        <Checkbox
          color="primary"
          checked={props.isChecked}
        />
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        padding="none"
        onClick={() => navigate(`/Editor/${props.docData.isShared ? "share" : "my-projects"}/${props.docData.user}/${props.docData.id}`)}
        sx={{
          cursor: "pointer"
        }}
      >
        <span
          className={css`
            display: inline-block;
            width: 25em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          `}
        >
          {props.docData.fileName}
        </span>
      </TableCell>
      {isShowingAllTags ? <MoreTags
        anchor={ellipsisRef.current}
        tagList={props.docData.tags?.slice(3)}
      /> : null}
      <TableCell align="left" sx={{ width: "fit-content" }} padding="none">
        <span
          className={css`
            display: flex;
            align-items: center;
            width: fit-content;
          `}
        >
          {props.docData.tags?.length > 3
            ? (props.docData.tags?.slice(0, 4)
              .map((tag: DocumentData, index: number) => index < 3
                ? <MiniTag colour={tag.tagColour.value} name={tag.tagName} />
                : <span
                  ref={ellipsisRef}
                  className={classes.moreTags}
                  onClick={() => setIsShowingAllTags(!isShowingAllTags)}
                >
                  <MoreHorizSharp />
                </span>))
            : props.docData.tags?.map((tag: DocumentData) => <MiniTag
              colour={tag.tagColour.value}
              name={tag.tagName}
            />)}
        </span>
      </TableCell>
      <TableCell align="left" padding="none">
        {props.docData.owner + ""}
      </TableCell>
      <TableCell align="left" padding="none">
        {props.docData.timeStamp?.toDate().toLocaleDateString()}
      </TableCell>
      <TableCell align="left" padding="none">
        <Modal
          open={isRenaming}
          onClose={() => setIsRenaming(false)}
        >
          <Box className={classes.card}>
            <TextField
              variant="outlined"
              label="Project Title"
              defaultValue={props.docData.fileName}
              fullWidth
              margin="normal"
              onChange={event => setDocName(event.target.value)}
            />
            <Button
              variant="text"
              onClick={() => setIsRenaming(false)}
              sx={{
                margin: "0 0.75em",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={onRenameProjectHandler}
              sx={{
                margin: "0 0.75em",
              }}
            >
              Rename Project
            </Button>
          </Box>
        </Modal>
        <span
          className={classes.button}
          onClick={props.docData.isShared ? undefined : () => setIsRenaming(true)}
        >
          <DriveFileRenameOutlineSharp />
        </span>
        <span
          className={classes.button}
          onClick={props.docData.isShared ? undefined : () => deleteDoc(currProject)}
        >
          <DeleteSharp />
        </span>
      </TableCell>
    </TableRow>
  );
}