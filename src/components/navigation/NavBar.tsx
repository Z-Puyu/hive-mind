import { Link, NavigateFunction } from "react-router-dom";
import { auth } from "../../config/Firebase";
import { AuthStateHook, useAuthState } from "react-firebase-hooks/auth";
import { signUserOut } from "../../config/Firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import classes from "./NavBar.module.css"

export default function Navbar(): JSX.Element {
  const [user]: AuthStateHook = useAuthState(auth);
  const navigate: NavigateFunction = useNavigate();

  const onLogOutHandler = () => {
    signUserOut();
    navigate("/authentication");
  }

  return (
    <div
      className={classes.navBar}
    >
      <div className={classes.links}>
        <Link to="/">Dashboard</Link>
        {user ? null : <Link to="/authentication">Login</Link>}
      </div>
      <div className={classes.user}
      >
        {user ? (
          <>
            <p>{user.displayName}</p>
            <img src={user.photoURL || ""} alt="" />
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
