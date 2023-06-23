import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { TextField, Button, Box, Typography, ThemeProvider, createTheme, Grid, Paper, FormControl, Tooltip} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EmailIcon from '@mui/icons-material/Email';
import FormLogin from './FormLogin';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { MuiTelInput, isValidPhoneNumber } from "mui-tel-input";
import { Controller, useForm } from "react-hook-form";
import { HelpOutline } from '@mui/icons-material';
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
  const [addressN, setAddress] = useState("")
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

  const {farm_name, /*email,*/ google_profile_picture, google_name, google_family_name, 
  shipping_distance, is_shipping, opening_hours, closing_hours, logo_picture, products_pictures, types_of_products, 
  farm_pictures, phone_number_official, phone_number_whatsapp, phone_number_telegram, about, address,
  farmer_name, delivery_details, products, farm_site, facebook, instagram
  } = values
  const handleSubmit = (data) => {
    data.preventDefault();
    alert(values.address)
    alert(values.phone_number_official)
    alert(values.phone_number_whatsapp)
    alert(values.farmer_name)
    alert(values.farm_name)


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
    setFormValue("phone_number_official",newValue)
  }
  const [valuePhone2, setValuePhone2] = useState('')

  const handleChangePhone2 = (newValue) => {
    setValuePhone2(newValue)
    setFormValue("phone_number_whatsapp",newValue)
  }
  const [phone, setPhone] = useState('');
  const [value, setValue] = useState('')
  const [farmName, setFarmName] = useState('')
  const [farmerName, setFarmerName] = useState('')
  const [value2, setValue2] = useState('')
  const flagStyle = {
    flexDirection: 'row-reverse',
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleChangeFarm = (newValue) =>{
    setFarmName(newValue.target.value)
    setFormValue("farm_name",newValue.target.value)
  }
  const handleChangeFarmerName = (newValue) =>{
    setFarmerName(newValue.target.value)
    setFormValue("farmer_name",newValue.target.value)
  }
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
            
  <Grid marginLeft={10.5} marginTop={-4} marginBottom={-10} container rowSpacing={3} columnSpacing={4}>
  <Grid marginLeft={4} dir='rtl' item xs={9.57}>
  <Grid item>
      <LocationOnIcon sx={{marginRight: -3, my: -6 }}></LocationOnIcon>
  </Grid>
  <PlacesAutocomplete
            value={addressN}
            onChange={setAddress}
            onSelect={handleSelect}
            searchOptions={{
              types: ['address'],
              region: 'il',
              language: 'iw',
            }}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div style={{ position: 'relative' }}>
                <input
                  {...getInputProps({
                    placeholder: 'כתובת המשק החקלאי ',
                    className: 'location-search-input',
                    onBlur: () => {
                      if (!address) setAddress('');
                  }
                  })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
                    height: '35px',
                    border: address ? '1px solid #bdbdbd' : '1px solid red',
                    border: '1px solid #bdbdbd', 
                    borderRadius: '4px',
                    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
                    fontFamily: 'arial',
                    color: 'black',                  
                  }}
                  required
                />
                    {/* {!address && <p style={{ color: 'red', position: 'absolute', bottom: '-20px', left: '0' }}>שדה חובה</p>} */}
                    <style type="text/css">
                    {`
                      .location-search-input::-webkit-input-placeholder { color: #9e9e9e; }
                      .location-search-input::-moz-placeholder { color: #9e9e9e; }
                      .location-search-input:-ms-input-placeholder { color: #9e9e9e; }
                      .location-search-input:-moz-placeholder { color: #9e9e9e; }
                    `}
                  </style>
                <div style={{position: 'absolute',
                 zIndex: 1000,
                backgroundColor: '#fff', 
                width: '100%', 
                maxWidth: '475px', 
                left: '49.9%', 
                transform: 'translateX(-50%)',
                maxHeight: '220px',
                overflowY: 'auto',
                  }}>
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
  </Grid>
  <Grid container item xs={5}>
  <Grid item>
    <Tooltip title="שם איש קשר">
      <DriveFileRenameOutlineIcon sx={{marginLeft: '-140%', my: -6 }} />
    </Tooltip>
    </Grid>
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        value={farmerName}
        variant='outlined'
        type="text"
        placeholder='שם איש קשר'
        defaultValue={values.farmer_name} 
        onChange={handleChangeFarmerName}
        required="required"
        rows={1}
        rowsMax={5}
        sx={{ 
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0px 1.5px 1.5px rgba(0, 0, 0, 0.25)',
          fontFamily: 'arial'

        }} 
        /* onChange = {handleInputChange} */
      />
  </Grid>
  <Grid container item xs={5}>
  <Grid item>
    <Tooltip title="שם העסק">
      <DriveFileRenameOutlineIcon sx={{marginLeft: '980%', my: -6 }} />
    </Tooltip>
    </Grid>
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        value={farmName}
        variant='outlined'
        type="text"
        placeholder='שם העסק'
        required="required"
        defaultValue={values.farm_name} 
        onChange={handleChangeFarm}
        rows={1}
        rowsMax={5}
        sx={{ 
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0px 1.5px 1.5px rgba(0, 0, 0, 0.25)',
          fontFamily: 'arial'

        }} 
        /* onChange = {handleInputChange} */
      />
  </Grid>
  <Grid item xs={5}>
  <Grid item>
    <Tooltip title="מספר וואטסאפ">
      <WhatsAppIcon sx={{marginLeft: "-15%", my: -6 }}></WhatsAppIcon>
    </Tooltip>
  </Grid>
  <Paper>
                  <MuiTelInput
                          /*label="Phone number"*/
                          forceCallingCode
                          value={valuePhone2}
                          disableAreaCodes
                          preferredCountries={["IL"]}
                          type="tel"
                          placeholder ="050 234 5678"
                          defaultValue={values.phone_number_whatsapp} 
                          onChange={handleChangePhone2}
                          defaultCountry="IL"
                          inputProps={{
                            maxLength: 12
                          }}
                          FormHelperTextProps={{
                            dir: "rtl"
                          }}
                        />
                    </Paper> 
  </Grid>
  <Grid container item xs={5}>
  <Grid item>
    <Tooltip title="מספר טלפון של העסק">
      <PhoneIcon sx={{ marginLeft: "980%", my: -6 }} />
    </Tooltip>
    </Grid>
  <FormControl>
                <Paper >
                
                      <MuiTelInput
                        /*label="Phone number"*/
                        forceCallingCode
                        value={valuePhone}
                        disableAreaCodes
                        preferredCountries={["IL"]}
                        placeholder ="050 234 5678"
                        defaultValue={values.phone_number_official} 
                        onChange={handleChangePhone}
                        defaultCountry="IL"
                        inputProps={{
                          maxLength: 12
                        }}
                        FormHelperTextProps={{
                          dir: "rtl"
                        }}
                      />
                    </Paper>
                    </FormControl>
  
  </Grid>
</Grid>
              <Button /*onClick={() => { <FormLogin></FormLogin> }}*/  variant='text' size='medium' color='nice' sx={{fontFamily:"aleph",  mt: 4, borderRadius: 4, fontSize: 16}} > .</Button>  
              <Button type="submit" onClick={handleSubmit}>  בדיקה</Button>

          </Box>    
      </form>
    </div>
    </ThemeProvider>
  )
}

export default FormPersonalInfo;