import React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
//import styled from 'styled-components';
//import { Link } from 'react-router-dom';
import '../../App.css';
//import { styled } from '@mui/system';
import Logo from '../../assets/farmers2u_logo.png'
//import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material'



const Footer = () => {
  return (
    <div dir='rtl'>
      <Toolbar style={{ position: "sticky", bottom: 0, width: "100%", backgroundColor: "#1d3c45", height: "20vh", color: '#eeeeee'}}>
      <a href="home">
        <img src={Logo} alt='Logo' style={{position: 'absolute', top:"1%", left:"10%", width: "150px"}}></img>
      </a>  
      <ul style={{position: 'absolute', top:"5%", left:"90%", listStyleType: 'none'}}>
        <li style={{ paddingBlock: '20px'}}>
          <Link to = "home" style={{fontWeight:"bold", fontFamily: 'Alef', variant: 'body2', textDecoration: "none", color: "white"}}>
            דף הבית
          </Link>
        </li>
        <li>
          <Link to = "bullboard" style={{fontWeight:"bold",fontFamily: 'Alef', variant: 'body2', textDecoration: "none", color: "white"}}>
            לוח מודעות
          </Link>
        </li>
      </ul>
      <ul style={{position: 'absolute', top:"5%", left:"72%", listStyleType: 'none'}}>
        <li style={{ paddingBlock: '20px'}}>
          <Link to = "about" style={{fontWeight:"bold",fontFamily: 'Alef', variant: 'body2', textDecoration: "none", color: "white"}}>
            על האתר
          </Link>
        </li>
        <li>
          <Link to = "faq" style={{fontWeight:"bold",fontFamily: 'Alef', variant: 'body2', textDecoration: "none", color: "white"}}>
            שאלות נפוצות
          </Link>
        </li>
      </ul>
      <ul style={{position: 'absolute', top:"5%", left:"53%", listStyleType: 'none'}}>
      <li style={{ paddingBlock: '20px'}}>
          <Link to = "bullboard" style={{fontWeight:"bold",fontFamily: 'Alef', variant: 'body2', textDecoration: "none", color: "white"}}>
            חיפוש מוצרים
          </Link>
        </li>
        <li>
          <Link to = "ourfarmers" style={{fontWeight:"bold",fontFamily: 'Alef', variant: 'body2', textDecoration: "none", color: "white"}}>
            החקלאים שלנו
          </Link>
        </li>
      </ul>
      <ul style={{position: 'absolute', top:"5%", left:"30%", listStyleType: 'none'}}>
        <li style={{ paddingBlock: '20px'}}>
          <Link to = "login" style={{fontWeight:"bold",fontFamily: 'Alef', variant: 'body2', textDecoration: "none", color: "white"}}>
            התחברות
          </Link>
        </li>
        <li>
          <Link to = "signup" style={{fontWeight:"bold",fontFamily: 'Alef', variant: 'body2', textDecoration: "none", color: "white"}}>
            פתיחת פרופיל חקלאי
          </Link>
        </li>
      </ul>         
      <Typography fontFamily='Alef' variant='body2' style={{fontFamily: 'Alef', variant: 'body2', position: 'absolute', bottom: 0, left: "50%", transform: 'translateX(-50%)'}}fontSize={15}  margin={"auto"} marginBottom={1} padding={0}  color="white" align="center">
      © כל הזכויות שמורות
      {" | "}
      Farmers2U
      {" | "} 
      {new Date().getFullYear()} 
      {" | "}
      <Link to ="./pages/terms" color="inherit" style={{textDecoration: "none", color: "white"}}>
        תנאי השימוש
      </Link>
    </Typography>
      </Toolbar>
    </div>
  )
}

export default Footer;