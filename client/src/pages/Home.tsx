import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useEffect } from "react";

export default function Home() {
  const auth: Auth = getAuth();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => onAuthStateChanged(auth, user => {
    if (user) {
      if (user.emailVerified) {
        navigate("/Dashboard");
      } else {
        alert("Please verify your registered e-mail!")
      }
    } else {
      return <Login />;
    }
  }), []);

  return <Login />;
}