import { css } from "@emotion/css";
import { AddSharp } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Tag as TagObj } from "../../utils/UtilityInterfaces";
import Modal from "../windows/Modal";
import Colour from "../Colour";
import { nanoid } from "nanoid";
import Tag from "./Tag";
import classes from "./TagManager.module.css"
import { DocumentData, addDoc, collection, deleteDoc, doc, onSnapshot, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config/Firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface ColourObj {
  id: string;
  isSelected: boolean;
  value: string;
}

// Static constant so we delcare it outside the component function 
// to prevent repeated initialisation.
const DEFAULT_COLOURS: ColourObj[] = [
  { id: nanoid(), isSelected: false, value: "rgb(237, 81, 38)" },
  { id: nanoid(), isSelected: false, value: "rgb(252, 139, 5)" },
  { id: nanoid(), isSelected: false, value: "rgb(235, 177, 13)" },
  { id: nanoid(), isSelected: false, value: "rgb(65, 179, 73)" },
  { id: nanoid(), isSelected: false, value: "rgb(99, 187, 208)" },
  { id: nanoid(), isSelected: false, value: "rgb(22, 97, 171)" },
  { id: nanoid(), isSelected: false, value: "rgb(128, 118, 163)" },
];

export default function TagManager() {
  const [tags, setTags] = useState<DocumentData[]>([]);
  const [newTagName, setNewTagName] = useState<string>("New Tag");
  const [newTagColour, setNewTagColour] = useState<ColourObj | null>(null)
  const [isAddingTag, setIsAddingTag] = useState<boolean>(false);
  const [isEditingTag, setIsEditingTag] = useState<boolean>(false);
  const [currTag, setCurrTag] = useState<DocumentData | null>(null);
  const [colours, setColours] = useState<ColourObj[]>(DEFAULT_COLOURS);
  const [currUser, setCurrUser] = useState<User | null>(null);

  useEffect(() => onAuthStateChanged(auth, user => {
    if (user) {
      setCurrUser(user);
      onSnapshot(
        query(
          collection(db, "userProjects", user.uid, "tags"),
        ),
        docsSnap => {
          const currtags: DocumentData[] = [];
          docsSnap.forEach(doc => currtags.push({ ...doc.data(), user: user.uid, id: doc.id }));
          setTags(currtags);
        }
      )
    }
  }), []);

  // With early return, we avoid unnecessary initialisation of the functions below.
  if (!currUser) {
    return null;
  }

  const onAddTagHandler = () => {
    if (!newTagColour) {
      alert("Please select a colour for the tag!");
    } else if (newTagName === "") {
      alert("Tag name cannot be empty!");
    } else {
      // The tag has a name and a colour so it's safe to add.
      const updatedTags: DocumentData[] = tags;
      if (updatedTags.filter(tag => tag.tagName === newTagName).length !== 0) {
        alert("A tag with this name already exists!");
      } else {
        updatedTags.push({ id: nanoid(), tagColour: newTagColour!, tagName: newTagName });
        setTags(updatedTags);
        // After adding the new tag, we must restore relevant states to their default values.
        const availableColours: ColourObj[] = colours;
        setColours(availableColours
          .map(colour => colour.isSelected ? { ...colour, isSelected: false } : colour));
        addDoc(
          collection(db, "userProjects", currUser.uid, "tags"),
          {
            tagName: newTagName,
            tagColour: newTagColour,
          }
        );
        setNewTagName("New Tag");
        setNewTagColour(null);
        setIsAddingTag(false); // Closes the modal
      }
    }
  }

  const onUpdateTagHandler = (tag: DocumentData) => {
    updateDoc(doc(db, "userProjects",
      tag.user, "tags", tag.id), {
      tagName: newTagName,
      tagColour: newTagColour,
    });
    setIsEditingTag(false);
  }

  const onEditTagHandler = (tag: DocumentData) => {
    setColours(colours.map(colour => colour.id === tag.tagColour.id
      ? { ...colour, isSelected: true } : colour));
    setNewTagColour(tag.tagColour);
    setIsEditingTag(true);
    setCurrTag(tag);
  }

  //Once a tag is clicked, it is set to be the filter tag.
  const onFilterHandler = (tag: DocumentData) => {
    for (let tag of tags)
    {
      updateDoc(doc(db, "userProjects",
      tag.user, "tags", tag.id), {
        isDisplayed: false,  
      });
    } 
    updateDoc(doc(db, "userProjects",
    tag.user, "tags", tag.id), {
      isDisplayed: true,
  });
  }

  // Once Show All button is clicked, all projects are shown.
  const onShowAllHandler = () => {
    for (let tag of tags)
    {
      {
        updateDoc(doc(db, "userProjects",
        tag.user, "tags", tag.id), {
          isDisplayed: true,  
        });
      } 
    }
  }
  /**
   * Toggle the selection of colours. If the target colour is currently unselected,
   * set it as selected and record its RGB value into the state. Otherwise, 
   * set the colour as unselected and erase its RGB value from the state.
   * 
   * @param id The ID of the colour.
   */
  const onCheckColourHandler = (id: string) => {
    let availableColours: ColourObj[] = [...colours];
    // There has to exist a colour with the matching ID 
    // as this ID was itself retrieved from the array.
    const target: ColourObj = availableColours.find(colour => colour.id === id)!;
    if (!target.isSelected) {
      availableColours = availableColours.map(colour => colour.isSelected
        ? { ...colour, isSelected: false } : colour);
    }
    availableColours.splice(availableColours.indexOf(target), 1,
      { ...target, isSelected: !target.isSelected });
    setNewTagColour(newTagColour?.id === target.id ? null : target);
    setColours(availableColours);
  }

  const onConfigureNewTagHandler = () => {
    setIsAddingTag(true);
    if (newTagColour) {
      const defaultColours: ColourObj[] = [...colours];
      const index: number = defaultColours.indexOf(newTagColour);
      defaultColours[index] = {...defaultColours[index], isSelected: false};
      setColours(defaultColours);
      setNewTagColour(null);
    }
  }

  return (
    <Box
      className={classes.manager}
    >
      <Button
        variant="contained"
        sx={{
          margin: "10% auto",
          borderRadius: "2.5em",
          backgroundColor: "rgb(44, 150, 120)",
          ":hover": {
            backgroundColor: "rgb(34, 148, 83)",
          },
        }}
        onClick={onConfigureNewTagHandler}
      >
        <AddSharp />
        Add New Tag
      </Button>
      <Modal
        open={isAddingTag}
        onClose={() => setIsAddingTag(false)}
      >
        <TextField
          variant="outlined"
          label="Tag Name"
          defaultValue="New Tag"
          fullWidth
          margin="normal"
          onChange={event => setNewTagName(event.target.value)}
        />
        <Box
          className={classes.textTooltip}
        >
          <strong>Tag Colour:</strong>
          <br />
          <Box
            className={classes.listOfTags}
          >
            {colours.map(rgb => <Colour
              key={rgb.id}
              colour={rgb.value}
              isSelected={rgb.isSelected}
              onCheck={() => onCheckColourHandler(rgb.id)}
              size={css`
                width: 30px; 
                height: 30px;
              `}
            />)}
          </Box>
        </Box>
        <Button
          variant="text"
          onClick={() => setIsAddingTag(false)}
          sx={{
            margin: "0 0.75em",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onAddTagHandler}
          sx={{
            margin: "0 0.75em",
          }}
        >
          Add
        </Button>
      </Modal>
      <Modal
        open={isEditingTag}
        onClose={() => setIsEditingTag(false)}
      >
        <TextField
          variant="outlined"
          label="Tag Name"
          defaultValue={currTag?.tagName}
          fullWidth
          margin="normal"
          onChange={event => setNewTagName(event.target.value)}
        />
        <Box
          className={classes.textTooltip}
        >
          <strong>Tag Colour:</strong>
          <br />
          <Box
            className={classes.listOfTags}
          >
            {colours.map(rgb => <Colour
              key={rgb.id}
              colour={rgb.value}
              isSelected={rgb.isSelected}
              onCheck={() => onCheckColourHandler(rgb.id)}
              size={css`
                width: 30px; 
                height: 30px;
              `}
            />)}
          </Box>
        </Box>
        <Button
          variant="text"
          onClick={() => setIsEditingTag(false)}
          sx={{
            margin: "0 0.75em",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => onUpdateTagHandler(currTag!)}
          sx={{
            margin: "0 0.75em",
          }}
        >
          Update
        </Button>
      </Modal>
      {tags.map(tag => <Tag
        key={tag.id}
        colour={tag.tagColour ? tag.tagColour.value : ""}
        name={tag.tagName}
        onEdit={() => onEditTagHandler(tag)}
        onDelete={() => deleteDoc(doc(db, "userProjects",
          tag.user, "tags", tag.id))}
        onClick={() => onFilterHandler(tag)}
      />)}
      <button onClick={onShowAllHandler}>Show All</button>
    </Box>
  );
}