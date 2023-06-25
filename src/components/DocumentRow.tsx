import { css } from "@emotion/css";
import { Box, Button, Card, Divider, Modal, TextField } from "@mui/material";
import { DocumentData, DocumentReference, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { db } from "../config/Firebase";

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
        className={css`
        display: flex;
        padding: 0.5em 1em;
        :hover {
          background-color: rgba(192, 192, 192, 0.2);
        }
      `}
      >
        <p
          className={css`
            flex-grow: 5;
            width: 20%;
            overflow: hidden;
            text-overflow: ellipsis;
            :hover {
              cursor: pointer;
            }
          `}
          onClick={() => navigate(`/Editor/${props.docData.id}`)}
        >
          {props.docData.fileName}
        </p>
        <p
          className={css`
            flex-grow: 1;
          `}
        >
          {props.docData.timeStamp?.toDate().toLocaleDateString()}
        </p>
        <p
          className={css`
            flex-grow: 1;
            :hover {
              cursor: pointer;
            }
          `}
        >
          <Modal
            open={isRenaming}
            onClose={() => setIsRenaming(false)}
          >
            <Box className={css`
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 400px;
              background-color: white;
              box-shadow: 0px 0px 5em rgb(64, 64, 64);
              padding: 2em;
              border-radius: 1em;
              text-align: center;
            `}>
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
                  margin: "0 0.75em"
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={onRenameProjectHandler}
                sx={{
                  margin: "0 0.75em"
                }}
              >
                Rename Project
              </Button>
            </Box>
          </Modal>
          <u
            onClick={() => setIsRenaming(true)}
          >
            Rename
          </u>
        </p>
        <p
          className={css`
            flex-grow: 1;
            :hover {
              cursor: pointer;
            }
          `}
        >
          <u
            onClick={() => deleteDoc(currProject)}
          >
            Delete
          </u>
        </p>
      </Box>
      <Divider />
    </div>
  )
}