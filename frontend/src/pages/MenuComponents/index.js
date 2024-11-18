import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../logo.jpg';
import { useTranslation } from 'react-i18next';
import Switch from '@mui/material/Switch';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { auth, onAuthStateChanged, logout } from '../../firebase_setup/firebase';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const MyIcon = () => (
  <Avatar src={logo} variant="rounded"/>
  
  
);



function MenuComponent() {

  const { t, i18n} = useTranslation();
  const [checked, setChecked] = useState(i18n.language === 'tib');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();
  const handleLogout=() => {
    logout()
      .then(() => {
        console.log('User signed out successfully');
        navigate('/signin'); // Redirect to login page after logout
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };
  const settings = [
    {name:t('setting.profile')},
    {name:t('setting.setting')}, 
    {name:t('setting.logout'),onClick:  handleLogout}
  ];
  const pages = [
    { name: t('pages.home'), link: '/' },
    { name: t('pages.songs'), link: '/songs' },
    { name: t('pages.artist'), link: '/artists' },
    { name: t('pages.about'), link: '/about' }
  ];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    setChecked(i18n.language === 'tib');
  }, [i18n.language]);;
  const handleLanguageChange = (event) => {
    const newLanguage = event.target.checked ? 'tib' : 'eng';
    i18n.changeLanguage(newLanguage);
    setChecked(event.target.checked);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
        //navigate('/signin'); // Redirect to sign-in page if not signed in
      }
    });
  
    return () => unsubscribe();
  });
  const handleSignIn=() => {
    navigate('/signin');
  };
  
  return (
    <AppBar position="static" sx={{bgcolor:"#f5c442"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MyIcon component="a"
            href="/"/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              ml: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.0.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            སྦྲང་བརྩི།
          </Typography>

          {/* For mobile view */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography
                    component="a"
                    variant='h2'
                    fontWeight={7000}
                    href={page.link}
                    sx={{ textAlign: 'center', color: 'inherit', textDecoration: 'none' }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* For desktop view */}
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          སྦྲང་བརྩི།
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                href={page.link}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', fontSize:'1.4rem'}}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Switch 
        checked={checked}
        onChange={handleLanguageChange}
        name="languageSwitch"
        inputProps={{ 'aria-label': 'language switch' }}/>
        {
          <Typography sx={{mr:'4px'}}>{checked?"བོད།":"ENG"}</Typography>
        }
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={isSignedIn?handleOpenUserMenu:handleSignIn} sx={{ p: 0 }}>
                <PersonOutlineIcon/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Typography textalign="center" onClick={setting.onClick} style={{ cursor: 'pointer' }}>{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MenuComponent;
