import { Link } from "react-router-dom";
import { auth } from "../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  async function signUserOut() {
    await signOut(auth);
    navigate("/");
  }

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/"> Home </Link>
        {user ? (
          <Link to="/editor"> Editor </Link>
        ) : (
          <Link to="/login"> Login </Link>
        )}
      </div>
      <div className="user">
        {user && (
          <>
            <p>{auth.currentUser?.displayName}</p>
            <img src={user?.photoURL || ""} />
            <button onClick={signUserOut}>Log Out</button>
          </>
        )}
      </div>
    </div>
  );
}
