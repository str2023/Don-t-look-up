import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { makeStyles } from '@material-ui/core';
import logoWhite from '../../assets/Logo_white.png';
import DNLPlogWhite from '../../assets/로고-edited-2.png';
import DNLPlogoBlue from '../../assets/로고-edited-2.png';
import { UserContext } from '../../contexts/context';
import PostSearchDrawer from '../postSearch/PostSearch';
import CurrentPostButton from '../postSearch/CurrentPostButton';

import './Header.css';

const useStyles = makeStyles((theme) => ({
  styledAppBar: {
    backgroundColor: `${parseInt(new Date().getHours(), 10) >= 7 && parseInt(new Date().getHours(), 10) <= 19 ? '#89d1eb' : '#20273f'}`,
  },
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userState, dispatch, setArea } = useContext(UserContext);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

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
    sessionStorage.removeItem('userToken');
    setArea({ type: 'AREA_DESELECT' });
    dispatch({ type: 'LOGOUT' });

    navigate('/');
  };

  const handleRegister = () => {
    // 회원가입 클릭시 RegisterPage 안내
    navigate('/register');
  };

  return (
    <AppBar
      id="bar"
      style={{ backgroundColor: `${parseInt(new Date().getHours(), 10) > 7 && parseInt(new Date().getHours(), 10) < 19 ? '#42bff5' : '#15182d'}` }}
    >
      <Toolbar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon style={{ margin: '0 2.4vh 0 1.2vh' }} />
          </IconButton>
          <Link to="/" style={{ padding: '10px 0 0 0' }}>
            <img src={DNLPlogWhite} alt="logo white" style={{ height: '4em' }} />
          </Link>
        </div>
        <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose} keepMounted>
          {/* Add your menu items here */}
          <MenuItem id="menuItem" onClick={() => navigate('/main')} style={{ fontFamily: 'GmarketSansMedium' }}>
            메인페이지
          </MenuItem>
          <MenuItem id="menuItem" onClick={() => navigate('/user')} style={{ fontFamily: 'GmarketSansMedium' }}>
            마이페이지
          </MenuItem>
          <MenuItem id="menuItem" onClick={() => navigate('/favorite')} style={{ fontFamily: 'GmarketSansMedium' }}>
            즐겨찾기
          </MenuItem>
        </Menu>
        <div style={{ flex: 1 }} /> {/* This empty div pushes the rest of the content to the right side */}
        <CurrentPostButton />
        <PostSearchDrawer />
        {!userState.isLoggedIn && (
          <Button color="inherit" onClick={handleLogin} style={{ fontFamily: 'GmarketSansMedium', fontSize: '1.6vh' }}>
            로그인
          </Button>
        )}
        {userState.isLoggedIn && (
          <Button color="inherit" onClick={handleLogout} style={{ fontFamily: 'GmarketSansMedium', fontSize: '1.6vh' }}>
            로그아웃
          </Button>
        )}
        {!userState.isLoggedIn && (
          <Button color="inherit" onClick={handleRegister} style={{ fontFamily: 'GmarketSansMedium', fontSize: '1.6vh' }}>
            회원가입
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
