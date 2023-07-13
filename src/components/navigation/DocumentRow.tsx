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
import { MoreHorizSharp } from "@mui/icons-material";
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
  const [isChecked, setIsChecked] = useState<boolean>(props.isChecked);
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
    if (!isChecked) {
      props.onSelect();
    } else {
      props.onRemove();
    }
    setIsChecked(!isChecked);
  }

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          className={classes.docRow}
        /* onClick={onCheck} */
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={isChecked}
              tabIndex={-1}
              disableRipple
              onClick={onCheckHandler}
            />
          </ListItemIcon>
          <span className={classes.fileName}>
            <ListItemText
              sx={{
                flex: "unset",
                WebkitFlex: "unset"
              }}
              className={css`
                display: inline;
                max-width: 50%;
                overflow: hidden;
                text-overflow: ellipsis;
              `}
              primary={props.docData.fileName}
              onClick={() => navigate(`/Editor/${props.docData.id}`)}
            />
            {isShowingAllTags ? <MoreTags 
              anchor={ellipsisRef.current}
              tagList={props.docData.tags?.slice(3)}
            /> : null}
            <span
              className={css`
                display: inline-flex;
                flex: 1;
              `}
            >
              {props.docData.tags?.length > 3
                ? props.docData.tags?.slice(0, 4)
                  .map((tag: DocumentData, index: number) => index < 3
                    ? <MiniTag colour={tag.tagColour.value} name={tag.tagName} />
                    : <span
                      ref={ellipsisRef}
                      className={classes.moreTags}
                      onClick={() => setIsShowingAllTags(!isShowingAllTags)}
                    >
                      <MoreHorizSharp />
                    </span>)
                : props.docData.tags?.map((tag: DocumentData) => <MiniTag
                  colour={tag.tagColour.value}
                  name={tag.tagName}
                />)}
            </span>
          </span>
          <p
            className={classes.timeStamp}
          >
            {props.docData.timeStamp?.toDate().toLocaleDateString()}
          </p>
          <p
            className={classes.button}
          >
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
            <u onClick={() => setIsRenaming(true)}>
              Rename
            </u>
          </p>
          <p
            className={classes.button}
          >
            <u onClick={() => deleteDoc(currProject)}>
              Delete
            </u>
          </p>
        </ListItemButton>
      </ListItem>
      <Divider component="li" />
    </>
  )
}