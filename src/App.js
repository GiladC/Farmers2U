import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBarElements from "./components/Navbar/NavbarElements";
import Footer from'./components/Footer/Footer';
import React from 'react';
import LandPage from './Pages/MainPage/LandPage';
import FormLogin from './Pages/Forms/FormLogin';
import faq from './Pages/FAQ';
import ourfarmers from './Pages/OurFarmers';
import AdsPage from './Pages/Bullboard/adsPage';
import Form from './Pages/Forms/Form';
import about from './Pages/About';
import FilterPanel from './components/FilterPanel/FilterPanel';
import Intro from './Pages/ShowFarmerProfile/intro';
import './App.css'

function App() {
  return (
    <Router>
      <NavBarElements/>
      <div>
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
          <Route path='/bullboard' element={
            <>
              <AdsPage/>
              <FilterPanel/>
            </>
          } />
          <Route path='/ourfarmers' element={
            <>
              <ourfarmers/>
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;