import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { TextField, Button, Box, Typography, ThemeProvider, createTheme, Grid, Paper, FormControl} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EmailIcon from '@mui/icons-material/Email';
import FormLogin from './FormLogin';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { MuiTelInput, isValidPhoneNumber } from "mui-tel-input";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


const {palette} = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const themeForButton = createTheme({
  palette: {
    nice: createColor('#e1f5fe'),
  },
});

function FormPersonalInfo({values, handleChange, setFormValue}) {
  const [address, setAddress] = useState("")
  const [coordintes,setCoordinates] = useState({
    lat: null,
    lng: null
  })
  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value)
    setFormValue("address",value)
    setCoordinates(latLng);
  };

  const {farmName, email, password, phoneNumber1,
     phoneNumber2, city, /*{address},*/ farmerName, prices, products, facebook, instagram} = values
  const handleSubmit = (data) => {
    data.preventDefault();
    alert(values.address)

    axios({
        method: "POST",
        url: "http://127.0.0.1:5000/signup",
        data:{
        farmName: values.farmName,
        email: values.email,
        password: values.password,
        about: "",
        phoneNumber1: valuePhone,
        phoneNumber2: valuePhone2,
        city: values.city,
        address: values.address,
        farmerName: "",
        prices: "",
        products: "",
        facebook: "",
        instagram: "",
        }
    })
    .then(function (response) {
        //handle success
        console.log(response)

        alert('המשתמש נוסף בהצלחה.');  
        window.location.href = '/';
    })
    .catch(function (response) {
        //handle error
        console.log(response)
        if (response.status === 400) {
            alert("שגיאה");
        }
    });
}
  console.log(values, handleChange);
  const [valuePhone, setValuePhone] = useState('')

  const handleChangePhone = (newValue) => {
    setValuePhone(newValue)
    setFormValue("phoneNumber1",newValue)
  }
  const [valuePhone2, setValuePhone2] = useState('')

  const handleChangePhone2 = (newValue) => {
    setValuePhone2(newValue)
    setFormValue("phoneNumber2",newValue)
  }
  const [phone, setPhone] = useState('');
  const [value, setValue] = useState('')
  const [value2, setValue2] = useState('')
  const flagStyle = {
    flexDirection: 'row-reverse',
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  //const { control, handleSubmit } = useForm({
  //  defaultValues: {
  //    phone: ""
  //  }
  //});
  return (
    <ThemeProvider theme={themeForButton}>
    <div>
      <form autoComplete="off" /*className={classes.root}*/>
        <Box marginTop={5} bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={164.7} alignItems={"center"} justifyContent={"center"} mt={3.2} mr={2.3} padding={20} sx={{border: '1.5px solid #f7f1e5'}}  >
              <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} marginTop="-4.1rem" variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
              <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} mt={2} fontSize={22}   mr={2} marginBottom={8} marginTop={3} variant='h2'  textAlign={"center"}> שלב 2 - פרטי המשק החקלאי</Typography>
            <Grid container style={{paddingRight: '0px', paddingLeft: '34px'}}>
              <Grid item xs={5.8} >
                <Box margin={2} border="none" dir="rtl" >
                  <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
            searchOptions={{
              types: ['address'],
              region: 'il',
              language: 'iw',
            }}

          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: '*כתובת המשק החקלאי ',
                    className: 'location-search-input',
                  })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
                  }}
                />
                <div style={{ position: 'relative', width: '100%' }}>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion, index) => {
                    const style = {
                      //position: 'absolute',
                      //zIndex: '1000',
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                      cursor: 'pointer',
                      padding: '10px',                      
                    };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, { style })}
                        key={index}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
                </Box>
                <Box margin={2} mt={4}>
                <Paper >
                      <MuiTelInput
                        /*label="Phone number"*/
                        forceCallingCode
                        value={valuePhone}
                        disableAreaCodes
                        preferredCountries={["IL"]}
                        placeholder ="050 234 5678"
                        defaultValue={values.phoneNumber1} 
                        onChange={handleChangePhone}
                        defaultCountry="IL"
                        helperText="*וואטסאפ / טלגרם"
                        inputProps={{
                          maxLength: 12
                        }}
                        FormHelperTextProps={{
                          dir: "rtl"
                        }}
                      />
                    </Paper> 
                </Box>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <Box margin={2} border="none" >
                  <Paper>
                    <TextField dir="rtl"
                      /*label="שם פרטי"*/
                      name ="name"
                      /*value={values.firstName}*/
                      variant='outlined'
                      defaultValue={values.address} 
                      onChange={handleChange('address')}
                      type="text"
                      position=''
                      placeholder='לא בשימוש (אפשר שם איש קשר) '
                      required="required"
                      textAlign= "right"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position={'end'}>
                              <DriveFileRenameOutlineIcon sx={{ ml: 0.7, my: 0.5 }}>
                              </DriveFileRenameOutlineIcon>
                          </InputAdornment>
                        )
                        
                      }}
                      /* onChange = {handleInputChange} */
                    />
                  </Paper>
                </Box>
                <Box margin={2} border="none" mt={2}>
                <Paper>
                  <MuiTelInput
                          /*label="Phone number"*/
                          forceCallingCode
                          value={valuePhone2}
                          disableAreaCodes
                          preferredCountries={["IL"]}
                          type="tel"
                          placeholder ="03 900 1234"
                          defaultValue={values.phoneNumber2} 
                          onChange={handleChangePhone2}
                          defaultCountry="IL"
                          helperText="*מספר טלפון של העסק"
                          inputProps={{
                            maxLength: 12
                          }}
                          FormHelperTextProps={{
                            dir: "rtl"
                          }}
                        />
                    </Paper> 
                </Box>
                </FormControl>
              </Grid>
              
            </Grid>
              <Button /*onClick={() => { <FormLogin></FormLogin> }}*/  variant='text' size='medium' color='nice' sx={{fontFamily:"aleph",  mt: 4, borderRadius: 4, fontSize: 16}} > .</Button>  
              {/* <Button type="submit" onClick={handleSubmit}>  בדיקה</Button> */}

          </Box>    
      </form>
    </div>
    </ThemeProvider>
  )
}

export default FormPersonalInfo;
