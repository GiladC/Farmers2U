import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBarElements from "./components/Navbar/NavbarElements";
import Footer from './components/Footer/Footer';
import React from 'react';
import LandPage from './Pages/MainPage/LandPage';
import FormLogin from './Pages/Forms/FormLogin';
import Faq from './Pages/FAQ';
import OurFarmers from './Pages/ourfarmers/OurFarmers';
import AdsPage from './Pages/Bullboard/adsPage';
import Form from './Pages/Forms/Form';
import about from './Pages/About';
import FilterPanel from './components/FilterPanel/FilterPanel';
import Intro from './Pages/ShowFarmerProfile/intro';
import ProfileSettings from './Pages/Settings/profileSettings';
import './App.css'

function App() {
  const appContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const contentContainerStyles = {
    flexGrow: 1,
    paddingTop: '0px', // How much padding we want to have for the navbar
  };

  return (
    <Router>
      <div style={appContainerStyles}>
        <NavBarElements />
        <div style={contentContainerStyles}>
          <Routes>
            <Route path='/home' element={
             <>
                <LandPage/>
              </>
            } />
            <Route exact path='/signup' element={
              <>
                <Form/>
              </>
            } />
            <Route path='/login' element={
              <>
                <FormLogin/>
              </>
            } />
            <Route path='/settings' element={
              <>
                <ProfileSettings/>
              </>
            } />
            <Route path='/bullboard' element={
              <>
                <AdsPage/>
                <FilterPanel/>
              </>
            } />
            <Route path='/ourfarmers' element={
              <>
                <OurFarmers/>
              </>
            } />
            <Route path='/faq' element={
              <>
                <faq/>
              </>
            } />
            <Route path='/about' element={
              <>
                <about/>
              </>
            } />
            <Route path="/farmerProfile" element={
              <>
                <Intro/>
              </>
            } />
            <Route path="/" element={
              <>
                <LandPage/>
              </>
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;