import { auth, provider } from "../config/Firebase"
import { signInWithPopup } from "firebase/auth"
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function Login(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();

  async function signInWithGoogle() {
    await signInWithPopup(auth, provider);
    navigate("/");
  }

  return (
    <div>
      <p>Sign In With Google To Continue</p>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
}