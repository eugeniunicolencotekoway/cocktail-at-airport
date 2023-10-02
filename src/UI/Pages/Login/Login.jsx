import React, {useReducer, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AuthActions, isLoggedIn} from "../../../Store";
import {Navigate} from "react-router-dom";
import './Login.css';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  InputLabel
} from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {createAction} from "@reduxjs/toolkit";

const MAIL_REGEX = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
const usernameChangedAction = createAction('[Login] username')
const passwordChangedAction = createAction('[Login] password')

const loginValidator = (value) => {
  if (!value) {
    return 'This field is required.';
  }
  if (!MAIL_REGEX.test(value)) {
    return 'Invalid email.';
  }
  return null;
}
const passwordValidator = (value) => {
  if (!value) {
    return 'This field is required.';
  }
  return null;
}

const loginFormInitialState = {
  username: {
    value: '',
    error: null,
  },
  password: {
    value: '',
    error: null,
  },
  valid: false,
}

const loginFormReducer = (state, action) => {
  switch (action.type) {
    case usernameChangedAction.type:
      const usernameError = loginValidator(action.payload);
      return {...state, username: {value: action.payload, error: usernameError}, valid: !usernameError};
    case passwordChangedAction.type:
      const passwordError = passwordValidator(action.payload);
      return {...state, password: {value: action.payload, error: passwordError}, valid: !passwordError};
    default:
      return state;
  }
}


const Login = () => {
  const authenticated = useSelector(isLoggedIn);
  const [loginState, dispatchLoginForm] = useReducer(loginFormReducer, loginFormInitialState);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const {username, password} = loginState;

  const submitHandler = () => {
    const {username, password} = loginState;
    if (username.value === 'admin@me.me' && password.value === 'admin123') {
      dispatch(AuthActions.logIn());
    } else {
      setShowAlert(true);
    }
  }

  const closeAlertHandler = () => {
    setShowAlert(false);
  }

  const handleClickShowPassword = () => {
    setShowPassword(prevState => !prevState);
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInput = (event, input) => {
    const value = event.target.value;
    if (input === 'username') {
      dispatchLoginForm(usernameChangedAction(value));
    } else {
      dispatchLoginForm(passwordChangedAction(value));
    }
  }

  const handleEnterKey = (event) => {
    if (event.key !== 'Enter') {
      return;
    }

    if (!loginState.valid) {
      dispatchLoginForm(usernameChangedAction(username.value));
      dispatchLoginForm(passwordChangedAction(password.value));
    }
  }

  if (authenticated) {
    return <Navigate to="/"/>
  }

  return (
    <>
      <div className="login-form-wrapper">
        <div className="login-form">
          <h1 className="login-form-title">Login</h1>

          <FormControl className="custom-form-control" variant="standard" error={!!username.error}>
            <InputLabel htmlFor="username-input">Username</InputLabel>
            <Input
              id="username-input"
              type="text"
              defaultValue={username.value}
              onChange={(e) => handleInput(e, 'username')}
              onBlur={(e) => handleInput(e, 'username')}
              onKeyDown={handleEnterKey}
            />
            {!!username.error && (<FormHelperText>{username.error}</FormHelperText>)}
          </FormControl>

          <FormControl className="custom-form-control" variant="standard" error={!!password.error}>
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <Input
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              defaultValue={password.value}
              onChange={(e) => handleInput(e, 'password')}
              onBlur={(e) => handleInput(e, 'password')}
              onKeyDown={handleEnterKey}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                  </IconButton>
                </InputAdornment>
              }
            />
            {!!password.error && (<FormHelperText>{password.error}</FormHelperText>)}
          </FormControl>

          <div className="login-form-submit-area">
            <Button variant="outlined" disabled={!loginState.valid} onClick={submitHandler}>Submit</Button>
          </div>
        </div>
      </div>
      <Dialog
        open={showAlert}
      >
        <DialogTitle id="alert-dialog-title">
          Username or password is incorrect.
        </DialogTitle>

        <DialogActions>
          <Button onClick={closeAlertHandler}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}


export default Login;
