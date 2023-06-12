/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { UserStateContext, DispatchContext } from '../../App';

const Header = () => {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleLogin = () => {
    // 로그인 클릭 했을시 LoginPage 안내
    navigate('/login');
  };

  const handleLogout = () => {
    // 로그아웃 클릭했을시 IntroPage 안내
    sessionStorage.removeItem(' userToken ');

    dispatch({ type: 'LOGOUT' });

    navigate('/');
  };

  const handleRegister = () => {
    // 회원가입 클릭시 RegisterPage 안내
    navigate('/register');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose} keepMounted>
          {/* Add your menu items here */}
          <MenuItem onClick={handleMenuClose}>Menu Item 1</MenuItem>
          <MenuItem onClick={handleMenuClose}>Menu Item 2</MenuItem>
          <MenuItem onClick={handleMenuClose}>Menu Item 3</MenuItem>
        </Menu>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Don't Look Up
        </Typography>
        {!userState.isLoggedIn && (
          <Button color="inherit" onClick={handleLogin}>
            로그인
          </Button>
        )}
        {userState.isLoggedIn && (
          <Button color="inherit" onClick={handleLogout}>
            로그아웃
          </Button>
        )}
        <Button color="inherit" onClick={handleRegister}>
          회원가입
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
