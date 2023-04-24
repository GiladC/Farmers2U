import React from 'react';
import styled from 'styled-components';
//import { Link } from 'react-router-dom';
import './App.css';

const FooterLine = styled.hr`
background: #ffcf66;
height: 220px;
position: fixed;
bottom: 0;
width: 100%;
`;

const MenuItemHeadline = styled.div`
  padding: 0 1rem;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  text-decoration: underline;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RightMenu = styled.div`
  position: absolute;
  top: 550px;
  right: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MidMenu = styled.div`
  position: absolute;
  top: 550px;
  right: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LeftMenu = styled.div`
  position: absolute;
  top: 550px;
  right: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuItem = styled.div`
  padding: 0 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const AllRightsReserved = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
`;



function Footer() {
  return (
    <>
      <FooterLine />
      <RightMenu>
        <MenuItem>Fruits</MenuItem>
        <MenuItem>Vegtables</MenuItem>
        <MenuItem>Whatever we support</MenuItem>
      </RightMenu>
      <MidMenu>
        <MenuItem>Homepage</MenuItem>
        <MenuItem>Our Farmers</MenuItem>
        <MenuItem>Luah Moad'ot</MenuItem>
      </MidMenu>
      <LeftMenu>
        <MenuItem>FAQ</MenuItem>
        <MenuItem>About</MenuItem>
        <MenuItem>Contact</MenuItem>
      </LeftMenu>
      <MenuItemHeadline style={{top: '510px', right: '90px', marginBottom: '20px' }}>What can I buy here?</MenuItemHeadline>
      <MenuItemHeadline style={{top: '510px', right: '470px', marginBottom: '20px' }}>Website navigation</MenuItemHeadline>
      <MenuItemHeadline style={{top: '510px', right: '880px', marginBottom: '20px' }}>Something</MenuItemHeadline>
      <AllRightsReserved>
        <p>All Rights Reserved to Farmers2U &copy; 2023</p>
      </AllRightsReserved>
      <div>
        <h1>Farmers2U</h1>
      </div>
    </>
  );
}

export default Footer;
