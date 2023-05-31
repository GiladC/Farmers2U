import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import { TextField, Button, Box, Typography, Grid, Paper, FormControl} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EmailIcon from '@mui/icons-material/Email';
import FormLogin from './FormLogin';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from "axios";


function FormSignUpInfo({values, handleChange}) {
  console.log(values, handleChange);
  const navigate = useNavigate();
  //const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <div>
      <form autoComplete="off" dir="rtl" /*className={classes.root}*/>
        <Box marginTop={5} bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={164.7} alignItems={"center"} justifyContent={"center"} mt={3.2} mr={2.3} padding={20} sx={{border: '1.5px solid #f7f1e5'}}  >
              <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} marginTop="-5.5rem" variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
              <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} mt={2} fontSize={22}  mr={2} marginBottom={8} marginTop={3} variant='h2'  textAlign={"center"}> שלב 1 - פרטים אישיים</Typography>
            <Grid container style={{paddingRight: '30px', paddingLeft: '10px'}}>
              <Grid item xs={5.8}>
                <Box margin={2} border="none">
                  <Paper>
                    <TextField dir="rtl"
                      /*label="שם פרטי"*/
                      name ="name"
                      /*value={values.firstName}*/
                      variant='outlined'
                      type="text"
                      //position=''
                      placeholder='*שם העסק'
                      defaultValue={values.farmName}
                      onChange={handleChange("farmName")}
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
                <Box margin={2} mt={4}>
                  <Paper>
                        <TextField dir="rtl"
                          /*label="שם פרטי"*/
                          name ="email"
                          //value={email}
                          variant='outlined'
                          type="email"
                          defaultValue={values.email}
                          onChange={handleChange("email")}
                          //onChange={(e) => setEmail(e.target.value)}
                          placeholder='*כתובת מייל'
                          required="required"
                          /* onChange = {handleInputChange} */
                          InputProps={{endAdornment: (
                          <EmailIcon sx={{ color: 'action.active', ml: 1.6, my: 0.5 }} />)}}
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
                        //value={password} 
                        defaultValue={values.password}
                        onChange={handleChange("password")}
                        type={showPassword ? 'text' : 'password'}
                        placeholder='*סיסמה'
                        dir="rtl"
                        required="required"
                        /* helperText="*סיסמה זאת תהיה הכרחית להתחברות" */
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                          </InputAdornment>
                          )
                        }}
                      />
                    </Paper> 
                </Box>
                <Box margin={2} border="none" mt={2}>
                    <Paper>
                      <TextField
                        /*label="שם משפחה"*/
                        name ="name"
                        /*value={values.lastName}*/
                        value={password2} 
                        variant='outlined'
                        type={showPassword2 ? 'text' : 'password'}
                        onChange={(e) => setPassword2(e.target.value)}
                        placeholder='*אימות סיסמה'
                        dir="rtl"
                        required="required"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword2}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword2 ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                          </InputAdornment>
                          )
                        }}
                      />
                    </Paper> 
                </Box>
                </FormControl>
              </Grid>
              
            </Grid>
            <a href='/login'>
              <Button /*onClick={() => { <FormLogin></FormLogin> }}*/ variant='text' size='medium' sx={{fontFamily:"aleph",  mt: 4, borderRadius: 4, fontSize: 16}} color='inherit'> משתמש קיים? לחץ כאן</Button>  
            </a>
          </Box>    
      </form>
    </div>
  )
}

export function handleSubmit() {
    alert("נא להזין כתובת מייל");
  
}

export default FormSignUpInfo;