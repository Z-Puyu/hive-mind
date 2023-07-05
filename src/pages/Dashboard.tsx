import { css } from "@emotion/css";
import { Box, Button, Divider, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { db } from "../config/Firebase";
import {
  DocumentData,
  Query,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where
} from "firebase/firestore";
import DocumentRow from "../components/navigation/DocumentRow";
import { nanoid } from "nanoid";
import Modal from "../components/windows/Modal";
import classes from "./Dashboard.module.css";
import { Auth, User, getAuth, onAuthStateChanged } from "firebase/auth";
import TagManager from "../components/navigation/TagManager";
import  Tag  from "../components/navigation/Tag";

export default function Dashboard(): JSX.Element | null {
  const auth: Auth = getAuth();
  const [isAddingDoc, setIsAddingDoc] = useState<boolean>(false);
  const [isAddingToTag, setIsAddingToTag] = useState<boolean>(false);
  const [newDocName, setNewDocName] = useState<string>("New Project");
  const [docsData, setDocsData] = useState<DocumentData[]>([]);
  const [tagsData, setTagsData] = useState<DocumentData[]>([]);
  const [currUser, setCurrUser] = useState<User | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);

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
        },
      )
      onSnapshot(
        query(
          collection(db, "userProjects", user.uid, "tags"),
        ),
        docsSnap => {
          const currTags: DocumentData[] = [];
          docsSnap.forEach(doc => currTags.push({ ...doc.data(), user: user.uid, id: doc.id }));
          setTagsData(currTags);
        //   let n = currTags.length;
        //   let tmp = [];
        //   for (let i = 0; i < n; i += 1)
        //   {
        //     tmp.push(false);
        //     setIsChecked(tmp);
        //   }
        //   //console.log(n);
        //   //console.log(tmp);
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
          // There is no douments with the same file name so it's safe to add a new document.
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

  const onAddtoTagHandler = (tags: DocumentData[]) => {
    for (let tag of tags) {
      if (tag.isTobeAddedToDocs = true){
        updateDoc(doc(db, "userProjects",
        tag.user, "tags", tag.id), {
        projects: selectedDoc,
        });
      }
      tag.isTobeAddedToDocs = false;
    }
    console.log(tagsData);
  }

  const onCheckHandler = (tag: DocumentData) => {
    updateDoc(doc(db, "userProjects",
      tag.user, "tags", tag.id), {
        isTobeAddedToDocs: !tag.isTobeAddedToDocs,
    });
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
              onClick={() => setIsAddingToTag(true)}
            >
              Add tag
            </Button>
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
          <Modal
            open={isAddingToTag}
            onClose={() => setIsAddingToTag(false)}
          >
            <div>
              {tagsData.map(tag => 
                <div className="tag-popup">
                  <input 
                  type="checkbox"
                  name="mycheckbox"
                  value={tag.id}
                  //checked={isChecked}
                  onChange={event => onCheckHandler(tag)}
                  />
                  <Tag
                  key={tag.id}
                  colour={tag.tagColour ? tag.tagColour.value : ""}
                  name={tag.tagName}
                  onDelete={() => deleteDoc(doc(db, "userProjects",
                    tag.user, "tags", tag.id))}
                  />
                </div>)}
            </div>
            <Button
              variant="text"
              onClick={() => {
                setIsAddingToTag(false);
                for (let tagData of tagsData)
                {
                  tagData.isTobeAddedToDocs = false;
                }
              }}
              sx={{
                margin: "0 0.75em"
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => onAddtoTagHandler(tagsData)}
              sx={{
                margin: "0 0.75em"
              }}
            >
              Confirm
            </Button>
          </Modal>
        </section>
        <section>
          {docsData.map(data => <DocumentRow key={data.id} docData={data} selected={selectedDoc} updateSelectedDoc={setSelectedDoc} />)}
        </section>
      </Paper>
    </div>
  );
}