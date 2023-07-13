import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle, signUp } from "../config/Firebase";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { css } from "@emotion/css";
import { 
  Box, 
  TextField, 
  Button, 
  Divider, 
  IconButton, 
  InputAdornment, 
  FormControl, 
  OutlinedInput, 
  FormHelperText, 
  InputLabel 
} from "@mui/material";
import classes from "./AuthenticationPages.module.css";
import { VisibilityOff, Visibility } from "@mui/icons-material";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
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
        <h2>User Registration</h2>
        <TextField
          required
          variant="outlined"
          label="User name"
          fullWidth
          margin="normal"
          placeholder="Enter your user name"
          onChange={event => setUserName(event.target.value)}
        />
        <TextField
          required
          variant="outlined"
          label="Email"
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
                <IconButton
                  onPointerDown={() => setIsPasswordVisible(!isPasswordVisible)}
                  edge="end"
                >
                  {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
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
          onClick={() => signUp(userName, email, password)}
        >
          Register
        </Button>
        <div>
          Already have an account? <Link to={"/authentication"}>Sign in</Link>.
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