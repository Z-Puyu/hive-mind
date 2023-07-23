import { Link, NavigateFunction } from "react-router-dom";
import { auth } from "../../config/Firebase";
import { signUserOut } from "../../config/Firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import classes from "./NavBar.module.css";
import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";

export default function Navbar(): JSX.Element {
  const [currUser, setCurrUser] = useState<User | null>(null)
  const navigate: NavigateFunction = useNavigate();

  const onLogOutHandler = () => {
    signUserOut();
    navigate("/authentication");
  }

  useEffect(() => onAuthStateChanged(auth, user => {
    if (user) {
      setCurrUser(user);
    } else {
      setCurrUser(null);
      navigate("/authentication");
    }
  }), []);

  return (
    <div id="nav-bar" className={classes.navBar}>
      <div className={classes.links}>
        {currUser?.emailVerified
          ? <div>
              <Link to="/dashboard">Dashboard</Link>
            </div>
          : <Link to="/authentication">Login</Link>}
      </div>
      <div className={classes.user} onClick={() => navigate("/user-profile")}>
        {currUser ? (
          <>
            <p>{currUser.displayName}</p>
            <img
              src={currUser.photoURL!}
              alt={currUser.photoURL!}
            />
            <Button
              sx={{
                backgroundColor: "rgb(128, 128, 128)",
                height: "2em",
                padding: "0.5em",
                ":hover": {
                  backgroundColor: "rgb(92, 92, 92)"
                }
              }}
              variant="contained"
              onClick={onLogOutHandler}
            >
              Log Out
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
};
