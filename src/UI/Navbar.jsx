import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {ThemeContext} from '../Context';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions, isLoggedIn } from '../Store';
import {Link, redirect, useNavigate} from "react-router-dom";

const Navbar = () => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authenticated = useSelector(isLoggedIn);

  const navigateLogin = () => {
    if (authenticated) {
      dispatch(AuthActions.logOut());
    }

    navigate('/login');
  }

  const navigateHome = () => {
    if (authenticated) {
      navigate('/');
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color={themeContext.color}>
        <Toolbar>
          <Typography variant="h6" component="div" className="cursor-pointer" onClick={navigateHome} sx={{ flexGrow: 1 }}>
            Cocktail at airport project
          </Typography>
          <Button color="inherit" onClick={navigateLogin}>{authenticated ? "Logout" : "Login"}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default React.memo(Navbar);
