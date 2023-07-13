import { css } from "@emotion/css";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
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
import Colour from "../components/Colour";
import ProjectManagerHead from "../components/navigation/ProjectManagerHead";
import compare from "../utils/Comparator";
import { DeleteOutlineSharp, NoteAddSharp } from "@mui/icons-material";

export default function Dashboard(): JSX.Element | null {
  const auth: Auth = getAuth();
  const [isAddingDoc, setIsAddingDoc] = useState<boolean>(false);
  const [newDocName, setNewDocName] = useState<string>("New Project");
  const [docsData, setDocsData] = useState<DocumentData[]>([]);
  const [tagsData, setTagsData] = useState<DocumentData[]>([]);
  const [activeTags, setActiveTags] = useState<DocumentData[]>([]);
  const [currUser, setCurrUser] = useState<User | null>(null);
  const [selectedDocs, setSelectedDocs] = useState<DocumentData[]>([]);
  const [tagMenuAnchor, setTagMenuAnchor] = useState<HTMLElement | null>(null);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState<string>("timeStamp");

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
              owner: currUser.displayName,
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

  const onToggleTagHandler = (tag: DocumentData) => {
    const updatedDocs: DocumentData[] = [...selectedDocs];
    for (let i: number = 0; i < updatedDocs.length; i += 1) {
      if (!Array.isArray(updatedDocs[i].tags)) {
        updatedDocs[i] = { ...updatedDocs[i], tags: [] };
      }
      const updatedTags: DocumentData[] = [...updatedDocs[i].tags];
      if (updatedTags.some(assignedTag => assignedTag.id === tag.id)) {
        updatedDocs[i] = {
          ...updatedDocs[i],
          tags: isTagActive(tag)
            ? updatedTags.filter(assignedTag => assignedTag.id !== tag.id)
            : updatedTags
        }
      } else {
        updatedDocs[i] = {
          ...updatedDocs[i],
          tags: updatedTags.concat([tag])
        }
      }
    }
    updatedDocs.forEach(updatedDoc => updateDoc(
      doc(db, "userProjects", currUser.uid, "projects", updatedDoc.id), updatedDoc
    ));
    setSelectedDocs(updatedDocs);
  }

  const isTagActive = (tag: DocumentData) => {
    if (selectedDocs.length === 0) {
      return false;
    }
    for (let i: number = 0; i < selectedDocs.length; i += 1) {
      if (Array.isArray(selectedDocs[i].tags)
        && !selectedDocs[i].tags.some((assignedTag: DocumentData) => assignedTag.id === tag.id)) {
        return false;
      }
    }
    // Either all projects have no tags, or the tag is assigned to every project.
    if (!Array.isArray(selectedDocs[0].tags) || selectedDocs[0].tags.length === 0) {
      return false;
    }
    return true;
  };

  const onFilterHandler = (tag: DocumentData) => {
    if (activeTags.some(activeTag => activeTag.id === tag.id)) {
      const updatedTags: DocumentData[] = [...activeTags];
      const index: number = activeTags.findIndex(activeTag => activeTag.id === tag.id);
      updatedTags.splice(index, 1);
      setActiveTags(updatedTags);
    } else {
      setActiveTags(activeTags.concat([{ ...tag }]));
    }
  }

  const isVisibleDoc = (data: DocumentData) => activeTags.length === 0
    || (Array.isArray(data.tags) && activeTags.every(activeTag => data.tags
      .some((tag: DocumentData) => activeTag.id === tag.id)))

  const onSortProjectsHandler = (sortFilter: string) => {
    setOrder(filter === sortFilter && order === "asc" ? "desc" : "asc");
    setFilter(sortFilter);
  }

  const onDeleteDocsHandler = () => {
    setDocsData(docsData.filter(data => !selectedDocs
      .some(doc => doc.id === data.id)))
    selectedDocs.forEach(docData => deleteDoc(doc(db, "userProjects",
      docData.user, "projects", docData.id)))
  }

  const visibleDocs = docsData.filter(data => isVisibleDoc(data))
    .sort((a, b) => compare(a, b, filter as keyof (typeof a), order));

  return (
    <div
      className={classes.dashboard}
    >
      <TagManager
        onFilter={onFilterHandler}
        onClearFilters={() => setActiveTags([])}
      />
      <Paper
        elevation={3}
        className={classes.manager}
      >
        <section>
          <Box className={classes.topBar}>
            {selectedDocs.length > 0 ? <>
              <Button
                variant="outlined"
                sx={{
                  margin: "1em 0.25em",
                  borderRadius: "5em"
                }}
                onClick={onDeleteDocsHandler}
              >
                <DeleteOutlineSharp sx={{ marginRight: "0.5em" }} />
                Delete All Selected
              </Button>
              <Button
                variant="contained"
                sx={{
                  margin: "1em 0.25em",
                  borderRadius: "5em"
                }}
                onClick={event => setTagMenuAnchor(event.currentTarget)}
              >
                Manage Tags
              </Button>
            </> : null}
            <Menu
              open={!!tagMenuAnchor}
              onClose={() => setTagMenuAnchor(null)}
              anchorEl={tagMenuAnchor}
            >
              <List>
                {tagsData.map(tag => <ListItem>
                  <ListItemButton
                    onClick={() => onToggleTagHandler(tag)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={isTagActive(tag)}
                        tabIndex={-1}
                        disableRipple
                      />
                      <span className={classes.tagColour}>
                        <Colour
                          colour={tag.tagColour.value}
                          size={css`
                            width: 12.5px;
                            height: 12.5px;
                          `}
                          static
                        />
                      </span>
                    </ListItemIcon>
                    <ListItemText primary={tag.tagName} />
                  </ListItemButton>
                </ListItem>)}
              </List>
            </Menu>
            <Button
              variant="contained"
              sx={{
                margin: "1em 1em 1em 0.25em",
                borderRadius: "5em",
              }}
              onClick={() => setIsAddingDoc(true)}
            >
              <NoteAddSharp sx={{ marginRight: "0.5em" }} />
              Add new document
            </Button>
            <Divider />
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
        <section className={css`padding: 0.5em 1em`}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              size="medium"
            >
              <ProjectManagerHead
                numSelected={selectedDocs.length}
                rowCount={visibleDocs.length}
                sortOrder={order}
                sortFilter={filter}
                onSelectAll={() => setSelectedDocs(selectedDocs.length === docsData.length
                  ? [] : docsData)}
                onSortBy={onSortProjectsHandler}
              />
              <TableBody>
                {visibleDocs.map(data => <DocumentRow
                  key={data.id}
                  docData={data}
                  onSelect={() => setSelectedDocs(selectedDocs.concat([data]))}
                  onRemove={() => setSelectedDocs(selectedDocs.filter(doc => doc.id !== data.id))}
                  isChecked={selectedDocs.some(doc => doc.id === data.id)}
                />)}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </Paper>
    </div>
  );
}