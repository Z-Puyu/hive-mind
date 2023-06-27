import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, isExistingUser, signIn, signInWithGoogle } from "../config/Firebase"
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { css } from "@emotion/css";
import { Box, Button, Divider, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import classes from "./AuthenticationPages.module.css";
import { VisibilityOff, Visibility } from "@mui/icons-material";

export default function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate("/dashboard");
      }
    }
    // maybe trigger a loading screen
  }, [user, loading]);

  return (
    <div
      className={classes.container}
    >
      <Box
        className={classes.box}
      >
        <h2>Sign-in</h2>
        <TextField
          variant="outlined"
          label="Email"
          fullWidth
          margin="normal"
          placeholder="E-mail address"
          onChange={event => setEmail(event.target.value)}
        />
        <FormControl>
          <InputLabel htmlFor="password-input">Password</InputLabel>
          <OutlinedInput
            id="password-input"
            required
            label="Password"
            error={password !== "" && password.length < 8}
            type={isPasswordVisible ? "text" : "password"}
            fullWidth
            placeholder="Set your password"
            endAdornment={
              <InputAdornment position="end">
                {<IconButton
                  onPointerDown={() => setIsPasswordVisible(!isPasswordVisible)}
                  edge="end"
                >
                  {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>}
              </InputAdornment>
            }
            onChange={event => setPassword(event.target.value)}
          />
          <FormHelperText>
            {password !== "" && password.length < 8
              ? "The password has to at least contain 8 characters"
              : ""}
          </FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          sx={{
            margin: "1em 0",
            textTransform: "none",
          }}
          onClick={() => isExistingUser(undefined, email)
            .then(exists => exists
              ? signIn(email, password)
              : alert("This e-mail has not been registered!")
            )
          }
        >
          Sign in with e-mail and password
        </Button>
        <div>
          <Link to="/reset-password">Forgot password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
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