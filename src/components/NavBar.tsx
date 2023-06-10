import { Link, NavigateFunction } from "react-router-dom";
import { auth } from "../config/Firebase";
import { AuthStateHook, useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function Navbar(): JSX.Element {
  const [user]: AuthStateHook = useAuthState(auth);
  const navigate: NavigateFunction = useNavigate();

  async function signUserOut() {
    await signOut(auth);
    navigate("/");
  }

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Home</Link>
        {user ? (
          <Link to="/Editor">Editor</Link>
        ) : (
          <Link to="/Login">Login</Link>
        )}
      </div>
      <div className="user">
        {!!user ? (
          <>
            <p>{auth.currentUser?.displayName}</p>
            <img src={user?.photoURL || ""} alt="" />
            <button onClick={signUserOut}>Log Out</button>
          </>
        ) : null}
      </div>
    </div>
  );
};
