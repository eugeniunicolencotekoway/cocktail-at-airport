import React, {useContext} from 'react';
import {styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Fab from '@mui/material/Fab';
import Tekoway from './Icons/Tekoway';
import {ThemeContext} from '../Context';
import {ColorLensRounded} from '@mui/icons-material';


const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

const Footer = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <>
      <AppBar position="fixed" color={themeContext.color} sx={{top: 'auto', bottom: 0}}>
        <Toolbar>
          <StyledFab
            color="error"
            aria-label="add"
            style={{left: -450}}
            onClick={() => themeContext.changeTheme('error')}
          >
            <ColorLensRounded/>
          </StyledFab>
          <StyledFab
            color="warning"
            aria-label="add"
            style={{left: -300}}
            onClick={() => themeContext.changeTheme('warning')}
          >
            <ColorLensRounded/>
          </StyledFab>
          <StyledFab
            color="success"
            aria-label="add"
            style={{left: -150}}
            onClick={() => themeContext.changeTheme('success')}
          >
            <ColorLensRounded/>
          </StyledFab>
          <StyledFab
            color="info"
            aria-label="add"
            onClick={() => themeContext.changeTheme('info')}
          >
            <Tekoway/>
          </StyledFab>
          <StyledFab
            color="primary"
            aria-label="add"
            style={{left: 150}}
            onClick={() => themeContext.changeTheme('primary')}
          >
            <ColorLensRounded/>
          </StyledFab>
          <StyledFab
            color="secondary"
            aria-label="add"
            style={{left: 300}}
            onClick={() => themeContext.changeTheme('secondary')}
          >
            <ColorLensRounded/>
          </StyledFab>
          <StyledFab
            color="default"
            aria-label="add"
            style={{left: 450}}
            onClick={() => themeContext.changeTheme('default')}
          >
            <ColorLensRounded/>
          </StyledFab>
        </Toolbar>
      </AppBar>
    </>
  );
};


export default Footer;
