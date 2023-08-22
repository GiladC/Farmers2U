import React, { useState, useEffect } from 'react';
import {
  TextField,
  Grid,
  Button,
  Box,
  ThemeProvider,
  createTheme,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';


const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const themeForButton = createTheme({
  palette: {
    nice: createColor('#37474f'),
    button: createColor('#E8AA42')
  }
});

const FormSignUpInfo = ({values, handleChange, setFormValue}) => {
  const {farm_name, /*email,*/ google_profile_picture, google_name, google_family_name, 
    shipping_distance, is_shipping, opening_hours, closing_hours, logo_picture, products_pictures, types_of_products,
    farm_pictures, phone_number_official, phone_number_whatsapp, phone_number_telegram, about, address,
    farmer_name, delivery_details, products, farm_site, facebook, instagram
    } = values
  console.log(values, handleChange);
  const [email, setEmail] = useState('');
  const handleCallbackResponse = (response) => {
    const data = new FormData(); 
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    data.append("jsonData", JSON.stringify({
    email: userObject.email,
    }))
    axios.post("http://127.0.0.1:5000/signup", data)
      .then(function (response) {
        setFormValue("email", userObject.email);
        setFormValue("google_name", userObject.given_name); 
        setFormValue("google_family_name", userObject.name);
        setFormValue("google_profile_picture", userObject.picture);
        setEmail(userObject.email);
        console.log(userObject);
      })
      .catch(function (error) {        
        if (error.response && error.response.status === 409) {
          alert("משתמש זה כבר רשום. ניתן להתחבר לאתר או להירשם עם משתמש אחר")
        }

      });
  };

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
        text: 'הירשם עם Google'
      });
    } else {
      // Google's library is not loaded yet, let's try again in a moment
      setTimeout(initializeGoogleSignUp, 5);
    }
  };
  
  useEffect(() => {
    initializeGoogleSignUp();
  }, []);

  return (

        <form autoComplete="off">
          
          <Box marginTop={5} bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={164.7} alignItems={"center"} justifyContent={"center"} mt={3.2} mr={2.3} padding={20} sx={{border: '1.5px solid #f7f1e5'}}  >
              <Box style={{marginTop: "-19.1%"}}>
              <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} marginTop="-5.5rem" variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
              <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} mt={2} fontSize={22}  mr={2} marginBottom={8} marginTop={3} variant='h2'  textAlign={"center"}> שלב 1 - חשבון גוגל</Typography>
              </Box>
            <Grid container style={{paddingRight: '30px', paddingLeft: '10px'}}>
            <form>
                <Box sx={{marginLeft:"85%"}}>
                  <div
                    id="signUpDiv"
                    style={{ marginRight: '27%', paddingTop: '25px' }}
                  ></div>
                </Box>
              </form>
            </Grid>
            <a href='/login'>
              <Button /*onClick={() => { <FormLogin></FormLogin> }}*/ variant='text' size='medium' sx={{fontFamily:"aleph",  mt: 4, borderRadius: 4, fontSize: 16}} color='inherit'> משתמש קיים? לחץ כאן</Button>  
            </a>
          </Box>  
        </form>
  );
};

export default FormSignUpInfo;