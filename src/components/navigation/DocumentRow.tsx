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
import { on } from "events";
import { Check, LensTwoTone } from "@mui/icons-material";
import { indexOf } from "lodash";

interface DocumentRowProps {
  docData: DocumentData;
  selected: string[]; 
  updateSelectedDoc: (id: string[]) => void;
}

export default function DocumentRow(props: DocumentRowProps): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
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

  const onCheck = (selectedDocId:string) => {
    setIsChecked(!isChecked);
    if (!isChecked){
      //console.log(`${selectedDocId} is selected`);
      let tmp = props.selected;
      tmp = [...props.selected, selectedDocId];
      //console.log(tmp);
      props.updateSelectedDoc(tmp);
    }
    else{
      //console.log(`${selectedDocId} is removed`);
      let tmp = props.selected;
      tmp.splice(props.selected.indexOf(selectedDocId), 1);
      //console.log(tmp);
      props.updateSelectedDoc(tmp);
    }
  }

  return (
    <div>
      <Box
        className={classes.docRow}
      >
        <input 
        type="checkbox" 
        name="mycheckbox"
        value={props.docData.id}
        checked={isChecked}
        onChange={event => onCheck(event.target.value)}
        />
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