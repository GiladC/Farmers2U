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
        <Box bgcolor="beige" sx={{":hover": {bgcolor: '#ffeecc', color: "black", boxShadow: "5px 5px 10px #ccc"}
  }} boxShadow={2}  border={1} display="flex" flexDirection={"column"} width={580} height={500} alignItems={"center"} justifyContent={"center"} margin={3} mt={4} padding={20}  >
              <Typography fontSize={50} margin={"auto"} variant='h3' textAlign={"center"}> הרשמה של חקלאי לאתר</Typography>
              <Typography mt={2} fontSize={25}  margin={"auto"} variant='h2'  textAlign={"center"}> שלב 1 - פרטים אישיים</Typography>
            <Grid container>
              <Grid item xs={6}>
                <Box margin={2} border="none" Width={1000}>
                  <Paper>
                    <TextField dir="rtl"
                      /*label="שם פרטי"*/
                      name ="name"
                      /*value={values.firstName}*/
                      variant='outlined'
                      type="text"
                      placeholder='*שם מלא'
                      required="required"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="end">
                              <DriveFileRenameOutlineIcon>
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
                          InputProps={{startAdornment: (
                          <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />)}}
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
            <a href='/auth'>
              <Button /*onClick={() => { <FormLogin></FormLogin> }}*/  variant='text' size='medium' sx={{ mt: 4, borderRadius: 4, fontSize: 16}} color='inherit'> מעבר לטופס התחברות </Button>  
            </a>
          </Box>    
      </form>
    </div>
  )
}

export default FormSignUpInfo;
