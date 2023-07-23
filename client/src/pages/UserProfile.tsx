import { Box, Button, Card, TextField } from "@mui/material";
import classes from "./UserProfile.module.css"
import { User, onAuthStateChanged, updateProfile } from "@firebase/auth";
import { useState, useEffect, useRef } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { auth, db, storage, upload } from "../config/Firebase";
import { getDownloadURL, ref } from "@firebase/storage";
import { DoneSharp } from "@mui/icons-material";
import { doc, updateDoc } from "@firebase/firestore";

export default function UserProfile() {
  const [currUser, setCurrUser] = useState<User | null>(null);
  const [newPhotoURL, setNewPhotoURL] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [newUserName, setNewUserName] = useState<string | null>(null);
  const [newUserEmail, setNewUserEmail] = useState<string | null>(null);
  const [newUserBio, setNewUserBio] = useState<string | null>(null);
  const navigate: NavigateFunction = useNavigate();
  const uploadingEntry: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  useEffect(() => onAuthStateChanged(auth, user => {
    if (user) {
      setCurrUser(user);
      setNewPhotoURL(user.photoURL);
      setUserName(user.displayName);
      setUserEmail(user.email);
      setNewUserName(user.displayName);
      setNewUserEmail(user.email);
    } else {
      setCurrUser(null);
      navigate("/authentication");
    }
  }), []);

  const onUploadImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      upload(event.target.files[0], currUser!)
        .then(() => getDownloadURL(ref(storage, "userAvatars/" + currUser!.uid))
          .then(url => setNewPhotoURL(url))
        )
    }
  }

  const onUpdateProfileHandler = () => {
    setUserName(newUserName);
    setUserEmail(newUserEmail);
    updateProfile(currUser!, {
      photoURL: newPhotoURL,
      displayName: newUserName,
    }).then(() => currUser?.reload());
    updateDoc(doc(db, "users", currUser?.uid!), {
      name: newUserName,
      email: newUserEmail,
      bio: newUserBio
    })
  }

  return userName && userEmail ? (
    <Card className={classes.userProfileConfig} sx={{ borderRadius: "1em" }}>
      <Box className={classes.overview}>
        <img
          className={classes.avatar}
          src={newPhotoURL ? newPhotoURL : ""}
          alt={newPhotoURL ? newPhotoURL : ""}
          onClick={() => uploadingEntry.current?.click()}
        />
        <input
          ref={uploadingEntry}
          className={classes.invisibleButton}
          type="file"
          accept=".jpg, .jpeg, .png"
          multiple={false}
          onChange={event => onUploadImageHandler(event)}
        />
        <span className={classes.userName}>{userName}</span>
        <span className={classes.email}>{userEmail}</span>
        {currUser?.emailVerified ? null : <span className={classes.msg}>
          {"(E-mail has NOT been verified)"}
        </span>}
        <Button
          variant="text"
          sx={{
            marginTop: "50%",
            color: "green",
            ":hover": {
              backgroundColor: "rgba(0, 192, 0, 0.1)"
            }
          }}
          onClick={onUpdateProfileHandler}
        >
          <DoneSharp />
          Update Profile
        </Button>
      </Box>
      <Box className={classes.details}>
        <TextField
          variant="standard"
          label="Display Name"
          defaultValue={userName}
          onChange={event => setNewUserName(event.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          variant="standard"
          label="E-mail Address"
          defaultValue={userEmail}
          onChange={event => setNewUserEmail(event.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          variant="outlined"
          label="Bio"
          placeholder="Say something about yourself..."
          value={newUserBio}
          multiline
          minRows={10}
          onChange={event => setNewUserBio(event.target.value)}
          fullWidth
          margin="normal"
        />
      </Box>
    </Card>
  ) : null;
}