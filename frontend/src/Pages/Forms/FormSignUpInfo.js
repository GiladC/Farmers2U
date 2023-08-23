import React, { useState, Grid, useEffect } from 'react';
import {
  Button,
  Box,
  Typography
} from '@mui/material';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const FormSignUpInfo = ({ setFormValue }) => {
  const [buttonText, setButtonText] = useState('הירשם עם Google');

  const [userData, setUserData] = useState({
    farm_name: '',
    email: '',
    google_profile_picture: '',
    google_name: '',
    google_family_name: '',
    // ... other fields
  });

  const handleCallbackResponse = (response) => {
    const userObject = jwt_decode(response.credential);

    setUserData({
      farm_name: '',
      email: userObject.email,
      google_profile_picture: userObject.picture,
      google_name: userObject.given_name,
      google_family_name: userObject.name,
      // ... other fields
    });

    const data = new FormData();
    data.append("jsonData", JSON.stringify({
      email: userObject.email,
    }));

    axios.post("http://127.0.0.1:5000/signup", data, {
      withCredentials: true,
    })
      .then(function (response) {
        setFormValue("email", userObject.email);
        setFormValue("google_name", userObject.given_name);
        setFormValue("google_family_name", userObject.name);
        setFormValue("google_profile_picture", userObject.picture);
        setButtonText(`הירשם עם Google (${userObject.given_name} ${userObject.name})`);
      })
      .catch(function (error) {
        if (error.response && error.response.status === 409) {
          alert("משתמש זה כבר רשום. ניתן להתחבר לאתר או להירשם עם משתמש אחר");
        }
      });
  };

  useEffect(() => {
    const initializeGoogleSignUp = () => {
      if (typeof window.google !== 'undefined' && typeof window.google.accounts !== 'undefined') {
        window.google.accounts.id.initialize({
          client_id: '814952910063-shd06kmdd43a83r3etfpq73gqi0ddf5m.apps.googleusercontent.com',
          callback: handleCallbackResponse
        });

        window.google.accounts.id.renderButton(document.getElementById('signUpDiv'), {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          text: buttonText 
        });
      } else {
        setTimeout(initializeGoogleSignUp, 100);
      }
    };

    initializeGoogleSignUp();
  }, [buttonText]); 
  
  return (

        <form autoComplete="off">
          
          <Box marginTop={5} bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={164.7} alignItems={"center"} justifyContent={"center"} mt={3.2} mr={2.3} padding={20} sx={{border: '1.5px solid #f7f1e5'}}  >
              <Box style={{marginTop: "-19.1%"}}>
              <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} marginTop="-5.5rem" variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
              <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} mt={2} fontSize={22}  mr={2} marginBottom={8} marginTop={3} variant='h2'  textAlign={"center"}> שלב 1 - חשבון גוגל</Typography>
              </Box>
            <Box container style={{paddingRight: '30px', paddingLeft: '10px'}}>
            <form>
                <Box >
                  <div
                    id="signUpDiv"
                    style={{ marginRight: '27%', paddingTop: '25px' }}
                  ></div>
                </Box>
              </form>
            </Box>
            <a href='/login'>
              <Button /*onClick={() => { <FormLogin></FormLogin> }}*/ variant='text' size='medium' sx={{fontFamily:"aleph",  mt: 4, borderRadius: 4, fontSize: 16}} color='inherit'> משתמש קיים? לחץ כאן</Button>  
            </a>
          </Box>  
        </form>
  );
};

export default FormSignUpInfo;
