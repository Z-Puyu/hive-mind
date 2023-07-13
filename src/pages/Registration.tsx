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
import { valid } from "semver";

const validatePassword = (password: string) => {
  if (password.length < 8 || password.length > 15) {
    return "The password must be between 8 and 15 characters (inclusive) in length";
  }
  if (!/\d/.test(password)) {
    return "The password must contain at least 1 number";
  }
  if (!/[a-zA-Z]/.test(password)) {
    return "The password must contain at least 1 alphabet";
  }
  return null;
};

const validateEmail = (email: string) => !/\S+@\S+\.\S+/.test(email) 
  ? "Please enter a valid e-mail address" : null;

const canRegister = (userName: string, email: string, pin: string, repeatedPin: string) =>
  userName !== "" && !validateEmail(email) && !validatePassword(pin) && pin === repeatedPin;

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<[boolean, boolean]>([false, false]);

  const navigate: NavigateFunction = useNavigate();

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
          error={userName === ""}
          helperText={userName === "" ? "The user name cannot be empty" : null}
          fullWidth
          margin="normal"
          placeholder="Enter your user name"
          onChange={event => setUserName(event.target.value)}
        />
        <TextField
          required
          variant="outlined"
          label="Email"
          error={validateEmail(email) !== null}
          helperText={
            validateEmail(email)
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
            error={validatePassword(password) !== null}
            type={isPasswordVisible[0] ? "text" : "password"}
            fullWidth
            placeholder="Set your password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onPointerDown={() => setIsPasswordVisible(
                    [!isPasswordVisible[0], isPasswordVisible[1]]
                  )}
                  edge="end"
                >
                  {isPasswordVisible[0] ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            onChange={event => setPassword(event.target.value)}
          />
          <FormHelperText sx={{color: "rgb(225, 0, 0)"}}>
            {validatePassword(password)}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password-input2">Password</InputLabel>
          <OutlinedInput
            id="password-input2"
            required
            label="Repeat password"
            disabled={validatePassword(password) !== null}
            error={repeatedPassword !== password}
            type={isPasswordVisible[1] ? "text" : "password"}
            fullWidth
            placeholder="Repeat your password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onPointerDown={() => setIsPasswordVisible(
                    [isPasswordVisible[0], !isPasswordVisible[1]]
                  )}
                  edge="end"
                >
                  {isPasswordVisible[1] ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            onChange={event => setRepeatedPassword(event.target.value)}
          />
          <FormHelperText sx={{color: "rgb(225, 0, 0)"}}>
            {password === repeatedPassword ? null : "The passwords do not match"}
          </FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          sx={{
            margin: "1em 0",
            textTransform: "none",
          }}
          disabled={!canRegister(userName, email, password, repeatedPassword)}
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