import { css } from "@emotion/css";
import { Box, Button, Divider, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { db } from "../config/Firebase";
import {
  DocumentData,
  Query,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where
} from "firebase/firestore";
import DocumentRow from "../components/navigation/DocumentRow";
import { nanoid } from "nanoid";
import Modal from "../components/windows/Modal";
import classes from "./Dashboard.module.css";
import { Auth, User, getAuth, onAuthStateChanged } from "firebase/auth";
import TagManager from "../components/navigation/TagManager";

export default function Dashboard(): JSX.Element | null {
  const auth: Auth = getAuth();
  const [isAddingDoc, setIsAddingDoc] = useState<boolean>(false);
  const [newDocName, setNewDocName] = useState<string>("New Project");
  const [docsData, setDocsData] = useState<DocumentData[]>([]);
  const [currUser, setCurrUser] = useState<User | null>(null);

  useEffect(() => onAuthStateChanged(auth, user => {
    // We have to check if the user is null before rendering 
    // because the user may not be ready yet when the effect triggers.
    if (user) {
      setCurrUser(user);
      onSnapshot(
        query(
          collection(db, "userProjects", user.uid, "projects"),
          orderBy("timeStamp"),
          orderBy("fileName")
        ),
        docsSnap => {
          const currDocs: DocumentData[] = [];
          docsSnap.forEach(doc => currDocs.push({ ...doc.data(), user: user.uid, id: doc.id }));
          setDocsData(currDocs);
        }
      )
    }
  }), []);

  // With early return, we avoid unnecessary initialisation of the functions below.
  if (!currUser) {
    return null;
  }

  const onCreateProjectHandler = () => {
    if (newDocName !== "") {
      // If the project name is non-empty, it is safe to add.
      const docsWithSameFileName: Query<DocumentData> = query(
        collection(db, "userProjects", currUser.uid, "projects"),
        where("fileName", "==", newDocName)
      );
      getDocs(docsWithSameFileName).then(docs => {
        if (docs.docs.length > 0) {
          alert("A project named " + newDocName + " already exists!");
        } else {
          // There is no documents with the same file name so it's safe to add a new document.
          addDoc(
            collection(db, "userProjects", currUser.uid, "projects"),
            {
              fileName: newDocName,
              timeStamp: serverTimestamp(),
              slateValue: JSON.stringify([
                {
                  id: nanoid(),
                  type: "paragraph",
                  children: [{ text: "" }]
                }
              ]),
              //add Tag
            }
          );
          // Reset default project name and close the modal.
          setNewDocName("New Project");
          setIsAddingDoc(false);
        }
      });
    } else {
      alert("Project name cannot be empty!");
    }
  }

  return (
    <div
      className={classes.dashboard}
    >
      <TagManager />
      <Paper
        elevation={3}
        className={classes.manager}
      >
        <section>
          <Box className={classes.topBar}>
            <Button
              variant="contained"
              sx={{
                margin: "1em",
              }}
              onClick={() => setIsAddingDoc(true)}
            >
              Add new document
            </Button>
            <Divider />
            <Box
              className={css`
                text-align: left;
                font-size: smaller;
                font-weight: bold;
                display: flex;
                padding: 0.1em 1.2em;
                :hover {
                  background-color: rgba(192, 192, 192, 0.2);
                }
              `}
            >
              <p className={css`flex-grow: 5`}>Project name</p>
              <p className={css`flex-grow: 3.75`}>Last modified at</p>
            </Box>
          </Box>
          <Modal
            open={isAddingDoc}
            onClose={() => setIsAddingDoc(false)}
          >
            <TextField
              variant="outlined"
              label="Project Title"
              defaultValue="New Project"
              fullWidth
              margin="normal"
              onChange={event => setNewDocName(event.target.value)}
            />
            <Button
              variant="text"
              onClick={() => setIsAddingDoc(false)}
              sx={{
                margin: "0 0.75em"
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={onCreateProjectHandler}
              sx={{
                margin: "0 0.75em"
              }}
            >
              Create Project
            </Button>
          </Modal>
        </section>
        <section>
          {docsData.map(data => <DocumentRow key={data.id} docData={data} />)}
        </section>
      </Paper>
    </div>
  );
}