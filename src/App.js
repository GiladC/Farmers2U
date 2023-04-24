import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import MainPage from './pages/MainPage';
import BullBoard from './pages/BullBoard';
import FarmerCreateUser from './pages/FarmerCreateUser';
  
function App() {
return (
    <Router>
    <Navbar />
    <Routes>
        <Route path='/MainPage' element={<MainPage/>} />
        <Route path='/BullBoard' element={<BullBoard/>} />
        <Route path='/FarmerCreateUser' element={<FarmerCreateUser/>} />
    </Routes>
    </Router>
);
}
  
export default App;