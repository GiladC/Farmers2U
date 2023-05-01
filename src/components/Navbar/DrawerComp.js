import React, { useState } from 'react'
import { Drawer, IconButton, List, ListItemButton, 
    ListItemIcon, ListItemText, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const DrawerComp = () => {
    const pages = [{label: "דף הבית", href: "home"}
    , {label: "לוח המודעות", href: "bullboard"}
    , {label: "התחברו לאתר", href: "login"}
    , {label: "הרשמה לאתר", href: "signup"}
    , {label: "על האתר", href: "about"}
    , {label: "החקלאים שלנו", href: "ourfarmers"}
    , {label: "שאלות נפוצות", href: "faq"}];
    const [openDrawer, setOpenDrawer] = useState(false)
    return(
        <React.Fragment>
            <Drawer open={openDrawer} onClick={() => setOpenDrawer(false)}>
                <List>
                    {
                        pages.map((page, index) => (
                            <ListItemButton onClick={() => setOpenDrawer(false)} 
                            href= {page.href} key={index}>
                            <ListItemIcon>
                                <ListItemText> {page.label} </ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                        ))
                    }
                </List>
            </Drawer>
            <IconButton sx={{color: "70AFFF", marginLeft: "auto"}} onClick={()=> setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </React.Fragment>
    );
};

export default DrawerComp