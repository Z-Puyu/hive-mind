import { useState } from "react";
import { resetPassword, signInWithGoogle } from "../config/Firebase";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { css } from "@emotion/css";
import { Box, TextField, Button, Divider } from "@mui/material";
import classes from "./AuthenticationPages.module.css";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const navigate: NavigateFunction = useNavigate();

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
          onClick={() => resetPassword(email).then(() => navigate("/authentication"))}
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