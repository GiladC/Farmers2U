import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBarElements from "./components/Navbar/NavbarElements";
import Footer from'./components/Footer/Footer';
import React from 'react';
import Main from './Pages/MainPage/MainPage';
import Auth from './Pages/FarmerLogin';
import faq from './Pages/FAQ';
import ourfarmers from './Pages/OurFarmers';
import bullboard from './Pages/BullBoard';
import Form from './Pages/FarmerCreateUser';
import Logo from './assets/farmers2u_logo.png';
import about from './Pages/About';

function App() {
  return (
    <Router>
      <NavBarElements/>
      <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <Routes>
          <Route path='/home' element={
            <>
              <Main/>
            </>
          } />
          <Route exact path='/signup' element={
            <>
              <Form/>
            </>
          } />
          <Route path='/login' element={
            <>
              <Auth/>
            </>
          } />
          <Route path='/bullboard' element={
            <>
              <bullboard/>
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
          <Route path="/" element={
            <>
              <Main />
            </>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;