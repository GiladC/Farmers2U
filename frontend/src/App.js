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
    paddingTop: '0px', // How much padding we want to have for the navbar
  };

  return (
    <BrowserRouter>
      <div style={appContainerStyles}>
        <NavbarElements token={token} removeToken={() => { removeToken(); }} />
        <div style={contentContainerStyles}>
          <Routes>
            <Route path="/home" element={<LandPage />} />
            <Route path="/signup" element={<Form />} />
            <Route path="/login" element={<FormLogin setToken={setToken} />} />
            {token && token !== "" && token !== undefined && (
              <>
                <Route exact path="/farmerProfile" element={<Intro token={token} setToken={setToken} />} />
                <Route path="/settings" element={<ProfileSettings />} />
              </>
            )}
            <Route path="/bullboard" element={<AdsPage />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<LandPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
