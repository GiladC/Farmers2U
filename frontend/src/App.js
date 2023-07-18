import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarElements from "./components/Navbar/NavbarElements";
import Footer from './components/Footer/Footer';
import React from 'react';
import LandPage from './Pages/MainPage/LandPage';
import FormLogin from './Pages/Forms/FormLogin';
import Faq from './Pages/FAQ';
import AdsPage from './Pages/Bullboard/adsPage';
import Form from './Pages/Forms/Form';
import About from './Pages/About';
import OurFarmers from './Pages/ourfarmers/OurFarmers';
import FilterPanel from './components/FilterPanel/FilterPanel';
import Intro from './Pages/ShowFarmerProfile/intro';
import ProfileSettings from './Pages/Settings/profileSettings';
import './App.css';
import UseToken from './Pages/Forms/UseToken';

function App() {
  const { token, removeToken, setToken } = UseToken();

  const appContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const contentContainerStyles = {
    flexGrow: 1,
    paddingTop: '0rem', // How much padding we want to have for the navbar
  };

  return (
    <BrowserRouter>
      <div style={appContainerStyles}>
        <NavbarElements token={token} removeToken={() => { removeToken(); }} />
        <div style={contentContainerStyles}>
        <Routes>
            <Route path='/home' element={
             <>
                <LandPage/>
                <Footer />

              </>
            } />
            <Route path="/signup" element={<Form setToken={setToken} />} />
            <Route path='/login' element={
              <>
                <FormLogin setToken={setToken} />
                <Footer />

              </>
            } />
            <Route path='/bullboard' element={
              <>
                <AdsPage token={token} />
              </>
            } />
            <Route path='/ourfarmers' element={
              <>
                <OurFarmers/>
              </>
            } />
            <Route path='/faq' element={
              <>
                <Faq/>
              </>
            } />
            <Route path='/about' element={
              <>
                <About/>
              </>
            } />
            <Route path="/" element={
              <>
                <LandPage/>
                <Footer />

              </>
            } />
            {token && token !== "" && token !== undefined && (
              <>
                <Route exact path="/profile" element={
                  <>
                    <Intro token={token} setToken={setToken} />
                    <Footer />

                  </>
                } />
                <Route path="/settings" element={
                  <>
                    <ProfileSettings token={token} setToken={setToken} />
                    <Footer />

                  </>
                } />
              </>
            )}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;