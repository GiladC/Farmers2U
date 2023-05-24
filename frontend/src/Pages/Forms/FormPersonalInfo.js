import React from 'react'
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

const {palette} = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const themeForButton = createTheme({
  palette: {
    nice: createColor('#e1f5fe'),
  },
});


function FormSignUpInfo() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <ThemeProvider theme={themeForButton}>
    <div>
      <form autoComplete="off" dir="rtl" /*className={classes.root}*/>
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
                <Box margin={2}>
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
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <Box margin={2} border="none" >
                    <Paper>
                      <TextField
                        /*label="שם משפחה"*/
                        name ="name"
                        /*value={values.lastName}*/
                        variant='outlined'
                        placeholder='*מספר טלפון של העסק'
                        dir="rtl"
                        required="required"
                        /* helperText="*סיסמה זאת תהיה הכרחית להתחברות" */
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                            <PhoneIcon sx={{ ml: 0.8, my: 0.5 }}> 
                            </PhoneIcon>
                        </InputAdornment>
                          )
                        }}
                      />
                    </Paper> 
                </Box>
                <Box margin={2} border="none" mt={0}>
                    <Paper>
                      <TextField
                        /*label="שם משפחה"*/
                        name ="name"
                        /*value={values.lastName}*/
                        variant='outlined'
                        placeholder=' וואטסאפ / טלגרם'
                        dir="rtl"
                        required="required"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                            <PhoneIcon sx={{ ml: 0.8, my: 0.5 }}> 
                            </PhoneIcon>
                        </InputAdornment>
                          )
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
