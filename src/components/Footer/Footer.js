import React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
//import styled from 'styled-components';
//import { Link } from 'react-router-dom';
import '../../App.css';
//import { styled } from '@mui/system';
import Logo from '../../logos/farmers2u_logo.png'
//import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material'



const Footer = () => {
  return (
    <div>
      <Toolbar style={{ position: "fixed", bottom: 0, width: "100%", backgroundColor: "#eeeeee", height: "20vh", color: '#eeeeee'}}>
      <a href="./pages/MainPage">
        <img src={Logo} alt='Logo' style={{position: 'absolute', top:"17%", left:"10%", width: "100px"}}></img>
      </a>  
      <ul style={{position: 'absolute', top:"5%", left:"90%"}}>
        <li style={{ paddingBlock: '15px'}}>
          <Link to = "./pages/MainPage" style={{fontFamily: 'Alef', variant: 'body2', textDecoration: "none", color: "#616161"}}>
            דף הבית
          </Link>
        </li>
        <li>
          <Link to = "./pages/BullBoard" style={{fontFamily: 'Alef', variant: 'body2', textDecoration: "none", color: "#616161"}}>
            לוח מודעות
          </Link>
        </li>
      </ul>
      <ul style={{position: 'absolute', top:"5%", left:"72%"}}>
        <li style={{ paddingBlock: '15px'}}>
          <Link to = "./pages/About" style={{fontFamily: 'Alef', variant: 'body2', textDecoration: "none", color: "#616161"}}>
            על האתר
          </Link>
        </li>
        <li>
          <Link to = "./pages/FAQ" style={{fontFamily: 'Alef', variant: 'body2', textDecoration: "none", color: "#616161"}}>
            שאלות נפוצות
          </Link>
        </li>
      </ul>
      <ul style={{position: 'absolute', top:"5%", left:"53%"}}>
      <li style={{ paddingBlock: '15px'}}>
          <Link to = "./pages/BrowseProducts" style={{fontFamily: 'Alef', variant: 'body2', textDecoration: "none", color: "#616161"}}>
            חיפוש מוצרים
          </Link>
        </li>
        <li>
          <Link to = "./pages/OurFarmers" style={{fontFamily: 'Alef', variant: 'body2', textDecoration: "none", color: "#616161"}}>
            החקלאים שלנו
          </Link>
        </li>
      </ul>
      <ul style={{position: 'absolute', top:"5%", left:"30%"}}>
        <li style={{ paddingBlock: '15px'}}>
          <Link to = "./pages/FarmerLogin" style={{fontFamily: 'Alef', variant: 'body2', textDecoration: "none", color: "#616161"}}>
            התחברות
          </Link>
        </li>
        <li>
          <Link to = "./pages/FarmerCreateUser" style={{fontFamily: 'Alef', variant: 'body2', textDecoration: "none", color: "#616161"}}>
            פתיחת פרופיל חקלאי
          </Link>
        </li>
      </ul>         
      <Typography fontFamily='Alef' variant='body2' style={{fontFamily: 'Alef', variant: 'body2', position: 'absolute', bottom: 0, left: "50%", transform: 'translateX(-50%)'}}fontSize={15}  margin={"auto"} marginBottom={1} padding={0}  color="text.secondary" align="center">
      © כל הזכויות שמורות
      {" | "}
      Farmers2U
      {" | "} 
      {new Date().getFullYear()} 
      {" | "}
      <Link to ="./pages/Terms" color="inherit" style={{textDecoration: "none", color: "#616161"}}>
        תנאי השימוש
      </Link>
    </Typography>
      </Toolbar>
    </div>
  )
}

export default Footer;