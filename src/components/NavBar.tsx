import { Link, NavigateFunction } from "react-router-dom";
import { auth } from "../config/Firebase";
import { AuthStateHook, useAuthState } from "react-firebase-hooks/auth";
import { signUserOut } from "../config/Firebase";
/* import "../App.css"; */
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/css";

export default function Navbar(): JSX.Element {
  const [user]: AuthStateHook = useAuthState(auth);
  const navigate: NavigateFunction = useNavigate();

  const onLogOutHandler = () => {
    signUserOut();
    navigate("/");
  }

  return (
    <div
      className={css`
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background-color: rgb(20, 35, 52);
        margin: none;
        padding: 1em;
        box-shadow: 0 10px 20px rgb(128, 128, 128, 0.75);
      `}
    >
      <div className={css`
        text-align: center;
        margin-right: 50px;
        a {
          color: rgb(255, 255, 255);
          text-decoration: none;
          border-bottom: 3px solid rgb(255, 255, 255);
          padding-bottom: 2px;
          margin: 10px;
        }
      `}>
        <Link to="/">Home</Link>
        {user ? (
          <Link to="/Editor">Editor</Link>
        ) : (
          <Link to="/Login">Login</Link>
        )}
      </div>
      <div className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 50px;
        p {
          font-size: 15px;
          margin-right: 10px;
          color: #ffffff;
        }
        img {
          width: 30px;
          margin-right: 10px;
          border-radius: 50%;
        }
      `}>
        {!!user ? (
          <>
            <p>{auth.currentUser?.displayName}</p>
            <img src={user?.photoURL || ""} alt="" />
            <button onClick={onLogOutHandler}>Log Out</button>
          </>
        ) : null}
      </div>
    </div>
  );
};
