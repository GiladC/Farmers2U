
import logo from './logo.svg';
import './App.css';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BasicPage from './BasicPage';

function App() {
  const onTextFieldChange = (e) => {
    setTextFieldInput(e.target.value)
  }
  const [textFieldInput, setTextFieldInput] = useState("")
  const onScanButtonClick = () => {
    console.log(textFieldInput)
  }
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>Farmers2U </h1> {/* The first website that makes local agriculture accessible to consumers through cost-effective purchasing groups */}
          <img src={require('./logo.jpg')} style={{width: '200px', height: 'auto'}} alt="Logo" />
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/basic">Basic Page</Link></li>
              <li><a href="/about" target="_blank">About</a></li>
              <li><a href="contact.html" target="_blank">Contact</a></li>
            </ul>
          </nav>
          <form>
            <input type="text" placeholder="Search" />
            <button type="submit">Search</button>
          </form>
        </header>
        <Routes>
          <Route path="/" element={<Home onTextFieldChange={onTextFieldChange} textFieldInput={textFieldInput} onScanButtonClick={onScanButtonClick} />} />
          <Route path="/basic" element={<BasicPage />} />
        </Routes>
        <Container>
          <Stack spacing={3} sx={{marginTop: '20%'}} >
            <TextField
              id="bukcket-name-input"
              value={textFieldInput}
              onChange={onTextFieldChange}
              label="Bucket Name"
              variant="filled"
              color='primary'/>
            <Button onClick={onScanButtonClick} sx={{maxWidth: "xs"}} variant="contained"> Scan Now </Button>
          </Stack>
        </Container>		
      </div>
    </BrowserRouter>
  );
}

function Home({onTextFieldChange, textFieldInput, onScanButtonClick}) {
  return (
    <Container>
      <h2>Welcome to the Home Page!</h2>
      <p>This is the Home page of the Farmers2U website. Use the form below to search for a bucket:</p>
      <Stack spacing={3} sx={{marginTop: '20%'}} >
        <TextField
          id="bukcket-name-input"
          value={textFieldInput}
          onChange={onTextFieldChange}
          label="Bucket Name"
          variant="filled"
          color='primary'/>
        <Button onClick={onScanButtonClick} sx={{maxWidth: "xs"}} variant="contained"> Scan Now </Button>
      </Stack>
    </Container>
  )
}

export default App;
/*
Here is how this page was before I pasted in what Tamir made
*/

/* import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/