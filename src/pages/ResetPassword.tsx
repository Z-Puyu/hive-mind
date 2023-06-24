import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, isExistingUser, resetPassword, signIn, signInWithGoogle, signUp } from "../config/Firebase";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { css } from "@emotion/css";
import { Box, TextField, Button, Divider } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import classes from "./AuthenticationPages.module.css";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate("/dashboard");
      }
    }
  }, [user, loading]);

  return (
    <div
      className={classes.container}
    >
      <Box
        className={classes.box}
      >
        <h2>Reset Password</h2>
        <p>Send a password reset link to the following e-mail address:</p>
        <TextField
          required
          variant="outlined"
          error={email !== "" && !/\S+@\S+\.\S+/.test(email)}
          helperText={
            email !== "" && !/\S+@\S+\.\S+/.test(email)
              ? "Please enter a valid e-mail address"
              : ""
          }
          fullWidth
          margin="normal"
          placeholder="Enter your e-mail address"
          onChange={event => setEmail(event.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            margin: "1em 0",
            textTransform: "none",
          }}
          onClick={() => resetPassword(email)}
        >
          Send password reset email
        </Button>
        <div>
          Back to <Link to={"/authentication"}>Sign in</Link>.
        </div>
        <div>
          Don't have an account? <Link to={"/register"}>Register</Link> now.
        </div>
        <Divider className={css`color: gray`}>or</Divider>
        <Button
          variant="outlined"
          sx={{
            margin: "1em 0",
            textTransform: "none",
          }}
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>
      </Box>
    </div>
  );
}