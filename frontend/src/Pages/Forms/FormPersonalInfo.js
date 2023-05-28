import {useState,React} from 'react'
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


const {palette} = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const themeForButton = createTheme({
  palette: {
    nice: createColor('#e1f5fe'),
  },
});


function FormSignUpInfo() {
  const [phone, setPhone] = useState('');
  const [value, setValue] = useState('')
  const [value2, setValue2] = useState('')
  const handleChange = (newValue) => {
    setValue(newValue)
  }
  const handleChange2 = (newValue) => {
    setValue2(newValue)
  }
  const flagStyle = {
    flexDirection: 'row-reverse',
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const { control, handleSubmit } = useForm({
    defaultValues: {
      phone: ""
    }
  });
  return (
    <ThemeProvider theme={themeForButton}>
    <div>
      <form autoComplete="off" /*className={classes.root}*/>
        <Box marginTop={5} bgcolor="#e1f5fe" boxShadow={2} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={200} alignItems={"center"} justifyContent={"center"} margin={3} mt={4} padding={20} sx={{border: '1.5px solid #bf360c'}}  >
              <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} margin={"auto"} variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
              <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} mt={2} fontSize={22}  margin={5} variant='h2'  textAlign={"center"}> שלב 2 - פרטי המשק החקלאי</Typography>
            <Grid container style={{paddingRight: '30px'}}>
              <Grid item xs={5.8}>
                <Box margin={2} border="none" >
                <Paper>
                        <TextField dir="rtl"
                          /*label="שם פרטי"*/
                          name ="name"
                          /*value={values.firstName}*/
                          variant='outlined'
                          type="text"
                          placeholder='*עיר / קיבוץ / יישוב'
                          required="required"
                          /* onChange = {handleInputChange} */
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position={'end'}>
                                  <LocationCityIcon sx={{ ml: 0.7, my: 0.5 }}>
                                  </LocationCityIcon>
                              </InputAdornment>
                            )
                            
                          }}
                          /* onChange = {handleInputChange} */
                        />
                      </Paper>
                </Box>
                <Box margin={2}>
                <Paper >
                      <MuiTelInput
                        /*label="Phone number"*/
                        forceCallingCode
                        value={value2}
                        disableAreaCodes
                        preferredCountries={["IL"]}
                        placeholder ="050 234 5678"
                        onChange={handleChange2}
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
                      type="text"
                      position=''
                      placeholder='*כתובת המשק החקלאי '
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
                <Box margin={2} border="none" mt={0}>
                <Paper>
                  <MuiTelInput
                          /*label="Phone number"*/
                          forceCallingCode
                          value={value}
                          disableAreaCodes
                          preferredCountries={["IL"]}
                          placeholder ="03 900 1234"
                          onChange={handleChange}
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

          </Box>    
      </form>
    </div>
    </ThemeProvider>
  )
}

export default FormSignUpInfo;
