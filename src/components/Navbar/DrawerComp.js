import React, { useState } from 'react'
import { Drawer, IconButton, List, ListItemButton, 
    ListItemIcon, ListItemText, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const DrawerComp = () => {
    const pages = [{label: "דף הבית", href: "home"}
    , {label: "לוח המודעות", href: "ds"}
    , {label: "התחברו לאתר", href: "SDda"}
    , {label: "הרשמה לאתר", href: "Sas"}
    , {label: "על האתר", href: "ASdfsg"}
    , {label: "החקלאים שלנו", href: "ASDs"}
    , {label: "שאלות נפוצות", href: "ddd"}];
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