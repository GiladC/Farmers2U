import React, { useState } from 'react';
import { AppBar, Toolbar, Tabs, Tab, Button, useMediaQuery, ThemeProvider, createTheme, useTheme, Box } from '@mui/material';
import Farmers2ULogo from '../../assets/farmers2u_logo.svg'
import DrawerComp from './DrawerComp';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import LogoutIcon from '@mui/icons-material/Logout';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const themeForButton = createTheme({
  palette: {
    button: createColor('#E8AA42'),
    logout: createColor('#BA000D'),
  },
});

  const NavbarElements = ({ token, removeToken }) => {
  const navigate = useNavigate();
  const handleSettingsClick = () => {
    navigate('/settings');
  };
  const handleProfileClick = () => {
    navigate('/profile');
  };
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('lg'));
  const { pathname } = useLocation();

  const logMeOut = () => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/logout",
    })
      .then((response) => {
        removeToken();
        localStorage.removeItem('email');
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  const logged = localStorage.getItem('email');

  const pages = [
    { label: 'שאלות נפוצות', href: 'faq' },
    { label: 'על האתר', href: 'about' },
    { label: 'החקלאים שלנו', href: 'ourfarmers' },
    { label: 'לוח המודעות', href: 'bullboard' },
    { label: 'דף הבית', href: 'home' }
  ];

  const [value, setValue] = useState(() => {
    // Find the index of the page whose href matches the current pathname
    const pageIndex = pages.findIndex((page) => page.href === pathname.slice(1));
    return pageIndex === -1 ? -1 : pageIndex;
  });

  return (
    <ThemeProvider theme={themeForButton}>
      <React.Fragment>
        <AppBar position="static" sx={{ background: '#1d3c45' }}> {/*old version 1B9C85*/}
          <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {isMatch ? (
              <>
                <img src={Farmers2ULogo} alt="Farmers2ULogo" style={{ width: '65px', height: '65px' }} />
                <DrawerComp />
              </>
            ) : (
              <>
                {!token && (
                  <>
                    <Button href="login" color='button' sx={{width: '140px', height:'36px', fontFamily: "aleph", marginRight: 'auto', marginLeft: 3, '&:hover': { color: 'white', fontWeight:'bold' } }} variant="contained">
                      כניסת משתמש{' '}
                    </Button>
                    <Button href="signup" color="button" sx={{width: '140px', height:'36px', fontFamily: "aleph", marginRight: 'auto', marginLeft: '4rem', '&:hover': { color: 'white' , fontWeight:'bold'} }} variant="contained">
                      יצירת משתמש{' '}
                    </Button>
                  </>
                )}
                {token && (
                  <>
                    <LogoutIcon  type="submit" onClick={logMeOut}
                    sx={{width: '30px', height:'40px', fontSize: 'large', cursor: 'pointer'}}/>
                    {/* optional-red color while hovering. doesn't look good: , '&:hover': { color: 'red' , fontWeight:'bold'}*/}
                    {/*<button className="btn btn-outline-danger" type="submit" onClick={logMeOut} 
                    style={{width: '140px', height:'36px', fontFamily: "aleph", marginRight: 'auto', marginLeft: '4rem', '&:hover': { color: 'white' , fontWeight:'bold'} }} variant="contained">התנתקות</button>*/}
                    <Button color= "button" type="submit" onClick={handleSettingsClick} 
                    sx={{ width: '140px', height:'36px', fontSize: "medium", fontFamily: "aleph", marginRight: 'auto', marginLeft: '1.8rem', cursor: 'pointer', '&:hover': { color: 'white' , fontWeight:'bold'} }}  variant="contained">אזור אישי</Button>
                    {/* <Button color= "button" type="submit" onClick={handleProfileClick} 
                    sx={{width: '140px', height:'36px', fontSize: "medium", fontFamily: "aleph", marginRight: 'auto', marginLeft: '2rem', cursor: 'pointer', '&:hover': { color: 'white' , fontWeight:'bold'} }} variant="contained">פרופיל</Button> */}
                  </>
                )}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                  <Tabs
                    sx={{ color: '#0062E2' }}
                    textColor="inherit"
                    value={value}
                    indicatorColor="none"
                  >
                    {pages.map((page, index) => (
                      <Tab
                        key={index}
                        label={page.label}
                        href={page.href}
                        sx={{ marginRight: 'auto', marginLeft: "45px", fontFamily: "aleph", fontSize: '18.5px', '&:hover': { textDecoration: 'none' } }}
                        value={index}
                        style={{color: '#FFFFFF', fontWeight:'bold'}}
                      />
                    ))}
                  </Tabs>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={Farmers2ULogo}
                    alt="Farmers2ULogo"
                    style={{ width: '65px', height: '65px', marginRight: 'auto' }}
                  />
                </Box>
              </>
            )}
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default NavbarElements;
