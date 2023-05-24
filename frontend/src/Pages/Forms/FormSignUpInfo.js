import React from 'react'
import IconButton from '@mui/material/IconButton';
import { TextField, Button, Box, Typography, Grid, Paper, FormControl} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EmailIcon from '@mui/icons-material/Email';
import FormLogin from './FormLogin';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';


function FormSignUpInfo() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <form autoComplete="off" dir="rtl" /*className={classes.root}*/>
        <Box marginTop={5} bgcolor="#e1f5fe" boxShadow={2} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={200} alignItems={"center"} justifyContent={"center"} margin={3} mt={4} padding={20} sx={{border: '1.5px solid #bf360c'}}  >
              <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} margin={"auto"} variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
              <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} mt={2} fontSize={22}  margin={5} variant='h2'  textAlign={"center"}> שלב 1 - פרטים אישיים</Typography>
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
                      placeholder='*שם מלא'
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
                <Box margin={2} border="none" mt={0}>
                    <Paper>
                      <TextField
                        /*label="שם משפחה"*/
                        name ="name"
                        /*value={values.lastName}*/
                        variant='outlined'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='*אימות סיסמה'
                        dir="rtl"
                        required="required"
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

export default FormSignUpInfo;
