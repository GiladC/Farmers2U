import React, {useState} from 'react'
import { AppBar, Toolbar, Tabs, Tab, Button, useMediaQuery, 
    useTheme, Box } from '@mui/material';
import Farmers2ULogo from './farmers2u_logo.svg';
import DrawerComp from './DrawerComp';

const NavbarElements = () => {
    const [value, setValue] = useState();
    const theme = useTheme(0);
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const pages = ["דף הבית", "לוח המודעות"];
    return(
        <React.Fragment>
            <AppBar position="static" sx={{background: '#F5FDFF'}}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    {
                        isMatch ? (
                            <>
                    <img src={Farmers2ULogo} alt="Farmers2ULogo"
                    style={{ width: '65px', height: '65px'}}/>
                                <DrawerComp />
                            </>
                        ) : (
                            <>
                              <Button href='Login'
                                sx={{ marginRight: "auto", marginLeft: 0 }}
                                variant="contained"
                              >
                                כניסת משתמש{" "}
                              </Button>
                              <Button href='SignUp'
                              sx={{ marginRight: "auto" }} variant="contained">
                                יצירת משתמש{" "}
                              </Button>
                              <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                                <Tabs
                                  sx={{ color: "#0062E2" }}
                                  textColor="inherit"
                                  value={value}
                                  onChange={(e, value) => setValue(value)}
                                  indicatorColor="secondary"
                                >
                                  {pages.map((page, index) => (
                                    <Tab key={index} label={page} sx={{fontSize: '30px'}}/>
                                  ))}
                                </Tabs>
                              </Box>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <img
                                  src={Farmers2ULogo}
                                  alt="Farmers2ULogo"
                                  style={{ width: "65px", height: "65px", marginRight: "auto" }}
                                />
                              </Box>
                            </>
                          )
                    }
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default NavbarElements