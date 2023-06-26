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
import PersonIcon from '@mui/icons-material/Person';
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
        phoneNumber1: phone,
        phoneNumber2: whatsApp,
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
  const handleKeyDown = (event) => {
    // Check if the key is not a digit
    if (!/^[0-9]$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
        event.preventDefault();
    }
};
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  
  const handleChangePhone = (event) => {
    const phoneNumber = event.target.value;
  
    // Regex for 10 digit numbers starting with 05 or 07
    const tenDigitPattern = /^0[57][0-9]{8}$/;
  
    // Regex for 9 digit numbers starting with 02, 03, 04, 08 or 09
    const nineDigitPattern = /^0[23489][0-9]{7}$/;
  
    const isValid = tenDigitPattern.test(phoneNumber) || nineDigitPattern.test(phoneNumber);
  
    setPhone(phoneNumber);
    setFormValue("phone_number_official",phoneNumber)
    setPhoneError(!isValid && phoneTouched);
  };
  
  const handlePhoneBlur = () => {
    setPhoneTouched(true);
    setPhoneError(!(/^0[57][0-9]{8}$/.test(phone) || /^0[23489][0-9]{7}$/.test(phone) || phone === ''));
    if  (phone === '')
    setPhoneTouched(false);
  };

  const [whatsApp, setWhatsApp] = useState('');
  const [whatsAppError, setWhatsAppError] = useState(false);
  const [whatsAppTouched, setWhatsAppTouched] = useState(false);
  
  const handleChangeWhatsApp = (event) => {
    const whatsAppNumber = event.target.value;
  
    // Regex for 10 digit numbers starting with 05 or 07
    const tenDigitPattern = /^0[57][0-9]{8}$/;
  
    // Regex for 9 digit numbers starting with 02, 03, 04, 08 or 09
    const nineDigitPattern = /^0[23489][0-9]{7}$/;
  
    const isValid = tenDigitPattern.test(whatsAppNumber) || nineDigitPattern.test(whatsAppNumber);
  
    setWhatsApp(whatsAppNumber);
    setFormValue("phone_number_whatsapp",whatsAppNumber)
    setWhatsAppError(!isValid && whatsAppTouched);
    console.log(whatsApp)

  };
  
  const handleWhatsAppBlur = () => {
    setWhatsAppTouched(true);
    setWhatsAppError(!(/^0[57][0-9]{8}$/.test(whatsApp) || /^0[23489][0-9]{7}$/.test(whatsApp) || whatsApp === ''));
    if  (whatsApp === '')
    setWhatsAppTouched(false);
  };
  const [farmName, setFarmName] = useState('')
  const [farmerName, setFarmerName] = useState('')
  const handleChangeFarm = (newValue) =>{
    setFarmName(newValue.target.value)
    setFormValue("farm_name",newValue.target.value)
  }
  const handleChangeFarmerName = (newValue) =>{
    setFarmerName(newValue.target.value)
    setFormValue("farmer_name",newValue.target.value)
  }
  // const [valuePhone, setValuePhone] = useState('')

  // const handleChangePhone = (newValue) => {
  //   setValuePhone(newValue)
  //   setFormValue("phoneNumber1",newValue)
  // }
  // const [valuePhone2, setValuePhone2] = useState('')

  // const handleChangePhone2 = (newValue) => {
  //   setValuePhone2(newValue)
  //   setFormValue("phoneNumber2",newValue)
  // }
  // const [phone, setPhone] = useState('');
  // const [value, setValue] = useState('')
  // const [value2, setValue2] = useState('')
  // const flagStyle = {
  //   flexDirection: 'row-reverse',
  // };
  // const handlePhoneChange = (e) => {
  //   setPhone(e.target.value);
  // };
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
              <div style={{ position: 'relative' }} >
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <LocationOnIcon style={{ color: 'gray' }} sx={{zIndex: 2, marginRight: 56, mb: -7 }}/>
                </div>
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
                width: '105%', 
                maxWidth: '485px', 
                left: '45.5%', 
                transform: 'translateX(-50%)',
                maxHeight: '220px',
                overflowY: 'auto',
                  }}>
                  {loading && <div>טוען...</div>}
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
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        /*value={values.firstName}*/
        variant='outlined'
        marginTop={6}
        type="text"
        placeholder='שם איש קשר'
        defaultValue={values.farmer_name}
        onChange={handleChangeFarmerName}
        required="required"
        rows={1}
        rowsMax={5}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
                <PersonIcon sx={{ ml: -0.5, my: 0.5 }}>
                </PersonIcon>
            </InputAdornment>
          )
          
        }}
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
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        placeholder='שם העסק'
        defaultValue={values.farm_name}
        onChange={handleChangeFarm}
        required="required"
        rows={1}
        rowsMax={5}  
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
                <DriveFileRenameOutlineIcon sx={{ ml: -0.5, my: 0.5 }}>
                </DriveFileRenameOutlineIcon>
            </InputAdornment>
          )
          
        }}
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
  <div style={{ height: '10px' }}>  
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        /*value={values.firstName}*/
        variant='outlined'
        marginTop={6}
        type="text"
        placeholder='מספר וואטסאפ'
        required="required"
        onKeyDown={handleKeyDown}
        error={whatsAppError}
        // helperText={whatsAppError ? 'Invalid phone number' : ''}
        value={whatsApp}
        onChange={handleChangeWhatsApp}
        onBlur={handleWhatsAppBlur}
        rows={1}
        inputProps={{
          maxLength: 10,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
                <WhatsAppIcon sx={{ ml: -0.5, my: 0.5 }}>
                </WhatsAppIcon>
            </InputAdornment>
          )
          
        }}
        sx={{ 
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0px 1.5px 1.5px rgba(0, 0, 0, 0.25)',
          fontFamily: 'arial'

        }} 
        /* onChange = {handleInputChange} */
      />    <div style={{height: "20px" }}>
          {whatsAppError && <Typography variant="body2" color="error">טלפון לא חוקי</Typography>}
          </div>
          </div>
  </Grid>
  <Grid container item xs={5}>
  <div style={{ height: '10px' }}>  
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        placeholder='מספר טלפון של העסק'
        required="required"
        onKeyDown={handleKeyDown}
        error={phoneError}
       // helperText={phoneError ? 'Invalid phone number' : ''}
        value={phone}
        onChange={handleChangePhone}
        onBlur={handlePhoneBlur}
        rows={1}
        inputProps={{
          maxLength: 10,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
                <PhoneIcon sx={{ ml: -0.5, my: 0.5 }}>
                </PhoneIcon>
            </InputAdornment>
          )
          
        }}
        sx={{ 
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0px 1.5px 1.5px rgba(0, 0, 0, 0.25)',
          fontFamily: 'arial'

        }} 
        /* onChange = {handleInputChange} */
      /> <div style={{height: "20px"}}>
        {phoneError && <Typography variant="body2" color="error">טלפון לא חוקי</Typography>}
        </div>
        </div>

  </Grid>
{/*   <Grid item xs={5}>
  <Grid item>
    <Tooltip title="מספר וואטסאפ">
      <WhatsAppIcon sx={{ marginLeft: "8%", my: -6 }}></WhatsAppIcon>
    </Tooltip>
  </Grid>
  <Paper>
                  <MuiTelInput
                          forceCallingCode
                          value={valuePhone2}
                          disableAreaCodes
                          // preferredCountries={["IL"]}
                          type="tel"
                          placeholder ="03 900 1234"
                          defaultValue={values.phoneNumber2} 
                          onChange={handleChangePhone2}
                          defaultCountry="IL"
                          flagSize="small"
                          inputProps={{
                            maxLength: 12
                          }}
                          FormHelperTextProps={{
                            dir: "rtl"
                          }}
                        />
                    </Paper> 
  </Grid> */}
{/*   <Grid container item xs={5}>
  <Grid item>
    <Tooltip title="מספר טלפון של העסק">
      <PhoneIcon sx={{ marginLeft: "980%", my: -6 }} />
    </Tooltip>
    </Grid>
  <FormControl>
                <Paper >
                
                      <MuiTelInput
                        forceCallingCode
                        value={valuePhone}
                        disableAreaCodes
                        preferredCountries={["IL"]}
                        placeholder ="050 234 5678"
                        defaultValue={values.phoneNumber1} 
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
  
  </Grid> */}
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