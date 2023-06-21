import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "../config/Firebase"
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function Login(): JSX.Element {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate("/");
      }
    }
    // maybe trigger a loading screen
  }, [user, loading]);
  return (
    <div>
      <p>Sign In With Google To Continue</p>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
}