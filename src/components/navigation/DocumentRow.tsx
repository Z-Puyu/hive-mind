import { css } from "@emotion/css";
import { Box, Button, Divider, Modal, TextField } from "@mui/material";
import { 
  DocumentData, 
  DocumentReference, 
  deleteDoc, 
  doc, 
  serverTimestamp, 
  updateDoc 
} from "firebase/firestore";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { db } from "../../config/Firebase";
import classes from "./DocumentRow.module.css";

interface DocumentRowProps {
  docData: DocumentData;
}

export default function DocumentRow(props: DocumentRowProps): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const currProject: DocumentReference<DocumentData> = doc(db, "userProjects", 
    props.docData.user, "projects", props.docData.id);
  const [docName, setDocName] = useState<string>("");

  const onRenameProjectHandler = () => {
    updateDoc(currProject, {
      fileName: docName,
      timeStamp: serverTimestamp(),
    });
    setIsRenaming(false);
  }

  return (
    <div>
      <Box
        className={classes.docRow}
      >
        <p
          className={classes.fileName}
          onClick={() => navigate(`/Editor/${props.docData.id}`)}
        >
          {props.docData.fileName}
        </p>
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
      </Box>
      <Divider />
    </div>
  )
}