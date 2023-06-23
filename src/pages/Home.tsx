import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Login from "./Login";

export default function Home() {
  const auth: Auth = getAuth();
  const navigate: NavigateFunction = useNavigate();
  onAuthStateChanged(auth, user => {
    if (user) {
      navigate("/Dashboard");
    } else {
      return <Login />;
    }
  });
  return <Login />;
}