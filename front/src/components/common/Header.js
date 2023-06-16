import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import logoWhite from '../../assets/Logo_white.png';
import { UserContext } from '../../contexts/context';
import PostSearchDrawer from '../postSearch/PostSearch';
import CurrentPostButton from '../postSearch/CurrentPostButton';

import './Header.css';

const Header = () => {
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
    <AppBar className="bar">
      <Toolbar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <img src={logoWhite} alt="logo white" style={{ height: '4em' }} />
          </Link>
        </div>
        <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose} keepMounted>
          {/* Add your menu items here */}
          <MenuItem id="menuItem" onClick={() => navigate('/main')}>
            메인페이지
          </MenuItem>
          <MenuItem id="menuItem" onClick={() => navigate('/user')}>
            마이페이지
          </MenuItem>
          <MenuItem id="menuItem" onClick={() => navigate('/favorite')}>
            즐겨찾기
          </MenuItem>
        </Menu>
        <div style={{ flex: 1 }} /> {/* This empty div pushes the rest of the content to the right side */}
        <CurrentPostButton />
        <PostSearchDrawer />
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
        {!userState.isLoggedIn && (
          <Button color="inherit" onClick={handleRegister}>
            회원가입
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
