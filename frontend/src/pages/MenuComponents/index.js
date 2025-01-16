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
import { alpha, styled } from '@mui/material/styles';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';
import Drawer from '@mui/material/Drawer';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Divider from '@mui/material/Divider';


const MyIcon = () => (
  <Avatar src={logo} variant="rounded"/>
);

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

function MenuComponent() {

  const { t, i18n} = useTranslation();
  const [checked, setChecked] = useState(i18n.language === 'tib');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
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
  const handleProfile=() => {
    navigate('/dashboard/')
  }
  const settings = [
    {name:t('setting.profile'), onClick: handleProfile},
    {name:t('setting.setting')}, 
    {name:t('setting.logout'),onClick:  handleLogout}
  ];
  const pages = [
    { name: t('pages.home'), link: '/' },
    { name: t('pages.contributor'), link: '/contributor' },
    { name: t('pages.songs'), link: '/songs'},
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
    <AppBar position="fixed"
    enableColorOnDark
    sx={{
      boxShadow: 0,
      bgcolor: 'transparent',
      backgroundImage: 'none',
      mt: 'calc(var(--template-frame-height, 0px) + 28px)',
    }}>
      <Container maxWidth="xl">
      <StyledToolbar variant="dense" disableGutters>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
        <MyIcon component="a"href="/"/>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          
          {pages.map((page) => (
              <Button
                key={page.name}
                href={page.link}
                onClick={handleCloseNavMenu}
                variant="text" color="info" size="small"
              >
                {page.name}
              </Button>
            ))}
        </Box>
      </Box>
      <Box 
        sx={{
          display: { xs: 'none', md: 'flex' },
          gap: 1,
          alignItems: 'center',
        }}
      > 
      <Button color="primary" variant="text" size="small">
      <Switch 
        checked={checked}
        onChange={handleLanguageChange}
        name="languageSwitch"
        inputProps={{ 'aria-label': 'language switch' }}/>
        {
          <Typography sx={{mr:'4px'}}>{checked?"བོད།":"ENG"}</Typography>
        }
      </Button>
      <Button color="primary" variant="text" size="small">
      <Tooltip title="Open settings">
          <PersonOutlineIcon onClick={isSignedIn?handleOpenUserMenu:handleSignIn}/>
      </Tooltip>
      </Button>
      <ColorModeIconDropdown />
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
                  <Button color="primary" variant="text" size="small">
                    <Typography textalign="center" onClick={setting.onClick} style={{ cursor: 'pointer' }}>{setting.name}</Typography>
                  </Button>
                </MenuItem>
              ))}
        </Menu>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
              <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <PersonOutlineIcon/>
                
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                {pages.map((page) => (
                <MenuItem key={page.name} href={page.link}> {page.name} </MenuItem>
                ))}
                <Divider sx={{ my: 3 }} />
                {isSignedIn ? (
                  <MenuItem>
                  <Button color="primary" variant="contained" fullWidth>
                    Sign Out
                  </Button>
                  </MenuItem>
                ): (
                  <>
                  <MenuItem>
                  <Button color="primary" variant="contained" fullWidth>
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth>
                    Sign in
                  </Button>
                </MenuItem>
                  </>  
                )} 
              </Box>
            </Drawer>
          </Box>
      </StyledToolbar>
      </Container>
    </AppBar>
  );
}

export default MenuComponent;
