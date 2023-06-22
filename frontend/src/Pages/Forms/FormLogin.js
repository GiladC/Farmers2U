import { TextField, Button, Box, ThemeProvider, createTheme, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import axios from 'axios';
import { Email } from '@mui/icons-material';
import jwt_decode from "jwt-decode"

const {palette} = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const themeForButton = createTheme({
  palette: {
    nice: createColor('#37474f'),
    button: createColor('#E8AA42'),
  },
});

const FormLogin = (props) => {
  const [ user, setUser ] = useState({});
  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
  }

  function handleSignOut(event){ {/*probably unecessery */}
    setUser({});
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "814952910063-shd06kmdd43a83r3etfpq73gqi0ddf5m.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );
  },[]);

    const navigate = useNavigate();
    /*const [inputs, setInputs] = useState({email:"", password: ""})
    const handleChange = (e) => {setInputs((prevState)=> ({...prevState, [e.target.name] : e.target.value}))}*/
    /*const handleSubmit = (e) => {e.preventDefault(); console.log(inputs);}*/
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    const logInUser = (e) => {
      e.preventDefault(); // Prevents the default form submission behavior, adding email and password to url
      //setEmail(''); option to reset values after sumbitting
      //setPassword('');
      if(email.length === 0){
        setErrorMessage("נא להזין כתובת מייל");
      }
      else if(password.length === 0){
        setErrorMessage("נא להזין סיסמה");
      }
      else{
        axios({
          method: "POST",
          url: "http://127.0.0.1:5000/logintoken",
          data:{
            email: email,
            password: password
          }
      })
        .then(function (response) {
            console.log(response);
            props.setToken(response.data.access_token)
            //alert(email)
            alert("התחברת בהצלחה");
            
            
            localStorage.setItem('email', email)
            console.log(response.data);
            navigate("/bullboard");
            
            //navigate("/");
        })
        .catch(function (error) {
          console.log(error.response)
          console.log(error.response.status);
          console.log(error.response.headers);
          if (error.response && error.response.status === 401) {
            setErrorMessage('הפרטים שהוזנו שגויים');
          }
        })
    }
      setEmail(''); 
      setPassword('');
}
  // If we have no user: sign in button
  //If we have a user: show the logout button

  return (
    <ThemeProvider theme={themeForButton}>
    <div dir="rtl">
    {/*<button onClick={ (e) => handleSignOut(e)}>Sign Out</button>  GOOGLE SIGNOUT BUTTON, incomplete. needs to adapt to regular signout  */ }
    { user &&
    <div>
      {/*<img src={user.picture}></img> !!!----OPTIONAL - farmers image shown in login----!!!
      <h3>{user.name}</h3> */}
      </div>
    }
        <form autoComplete="off" /*onSubmit={handleSubmit}*/>
        <Box marginTop={6.1}>
      <Box
        margin="auto"
        marginBottom={11}
        marginTop={5}
        bgcolor="#f7f1e5"
        boxShadow={0}
        borderRadius={2}
        border={2}
        display="flex"
        flexDirection="column"
        width={580}
        height={200}
        alignItems="center"
        justifyContent="center"
        mt={4}
        padding={20}
        sx={{ border: '1.5px solid #f7f1e5' }}
      >
        <Typography
          color="#37474f"
          fontFamily="aleph"
          fontWeight="bold"
          fontSize={50}
          marginBottom="0px"
          variant="h3"
          textAlign="center"
        >
          התחברות חקלאי
        </Typography>
        <Box marginTop={5}>
          <form onSubmit={logInUser}>
            <TextField
              sx={{ backgroundColor: 'white', marginRight: '10rem' }}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              margin="normal"
              variant="outlined"
              placeholder="כתובת מייל"
              InputProps={{
                startAdornment: (
                  <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                ),
              }}
            />
            <TextField
              sx={{ backgroundColor: 'white', marginRight: '10rem' }}
              autoComplete="new-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              margin="normal"
              variant="outlined"
              placeholder="סיסמה"
              InputProps={{
                startAdornment: (
                  <PasswordIcon
                    color="action"
                    sx={{ marginRight: '0.5rem' }}
                  />
                ),
              }}
            />
            <Box>
            <Button
              type="submit"
              onClick={logInUser}
              sx={{
                marginRight: '12.8rem',
                fontFamily: 'aleph',
                mt: 4,
                borderRadius: 4,
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                '&:hover': { color: 'white' },
              }}
              variant="contained"
              color="button"
              dir="rtl"
            >
              להתחבר <LoginOutlinedIcon sx={{ mr: 1 }} />
            </Button>
            <Box>
            <div id="signInDiv" style={{marginRight:'27%', paddingTop: '25px'}}></div>
            </Box>
            </Box>
          </form>
          {errorMessage && (
            <Box
              mt={1}
              fontSize={13}
              color="red"
              textAlign="center"
              sx={{
                fontFamily: 'aleph',
                marginRight: '-4rem' // Add a right margin to move the error message to the right
              }}
            >
              {errorMessage}
            </Box>
          )}
          <Box mt={1}>
          <Button
            variant="text"
            size="medium"
            sx={{
              marginRight: '9.3rem',
              fontFamily: 'aleph',
              mt: 4,
              borderRadius: 4,
              '&:hover': { textDecoration: 'none' },
            }}
            color="nice"
          >
            שחזור סיסמה
          </Button>
          <a href="/signup">
            <Button
              variant="text"
              size="medium"
              sx={{
                marginRight: '2rem',
                fontFamily: 'aleph',
                mt: 4,
                borderRadius: 4,
              }}
              color="nice"
            >
              מעבר להרשמה
            </Button>
          </a>
          </Box>
        </Box>
      </Box>
    </Box>
        </form>
    </div>
    </ThemeProvider>

  )
}

export default FormLogin