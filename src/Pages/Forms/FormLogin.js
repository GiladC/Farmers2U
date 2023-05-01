import { TextField, Button, Box, ThemeProvider, createTheme, Typography } from '@mui/material'
import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import form from './Form';

const {palette} = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const themeForButton = createTheme({
  palette: {
    nice: createColor('#37474f'),
    button: createColor('#64b5f6'),
  },
});

const FormLogin = () => {
    /*const navigate = useNavigate();*/
    const [inputs, setInputs] = useState({email:"", password: ""})
    const handleChange = (e) => {setInputs((prevState)=> ({...prevState, [e.target.name] : e.target.value}))}
    const handleSubmit = (e) => {e.preventDefault(); console.log(inputs);}
  return (
    <ThemeProvider theme={themeForButton}>
    <div dir="rtl">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Box marginTop={6.1}>
        <Box margin={'auto'} marginBottom={11} marginTop={5} bgcolor="#e1f5fe" boxShadow={2} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={200} alignItems={"center"} justifyContent={"center"} mt={4} padding={20} sx={{border: '1.5px solid #bf360c'}}  >
        <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} marginBottom={"0px"} variant='h3' textAlign={"center"}> התחברות חקלאי  </Typography>
                <Box marginTop={5}>
                <TextField sx={{backgroundColor:"white", marginRight:"10rem"}} name="email" value={inputs.email} onChange={handleChange} required="required" type="email" margin="normal" variant='outlined' placeholder='כתובת מייל' InputProps={{startAdornment: (
                <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />)}}/>
                <TextField sx={{backgroundColor:"white", marginRight:"10rem"}} autoComplete="new-password" name="password" value={inputs.password} onChange={handleChange} required="required" type="password" margin="normal" variant='outlined' placeholder='סיסמה'  InputProps={{startAdornment: (
                <PasswordIcon color="action" sx={{ marginRight: '0.5rem' }} />),}}/>
                <Button type="submit" sx={{marginRight:"12.8rem", fontFamily: "aleph", mt: 4, borderRadius: 4, textTransform: 'none', display: 'flex', alignItems: 'center', '&:hover':{color: 'white'} }} variant="contained" color='button' dir="rtl">להתחבר <LoginOutlinedIcon sx={{ mr: 1 }} /> </Button>
                <Button variant='text' size='medium' sx={{marginRight:"9.3rem", fontFamily: "aleph", mt: 4, borderRadius: 4, '&:hover':{textDecoration: 'none'}}} color='nice'> שחזור סיסמה  </Button>   
                <a href='/signup'>    
                  <Button variant='text' size='medium' sx={{marginRight:"2rem", fontFamily: "aleph", mt: 4, borderRadius: 4}} color='nice' > מעבר להרשמה </Button>         
                </a>  
            </Box>
            </Box>
            </Box>
        </form>
    </div>
    </ThemeProvider>

  )
}

export default FormLogin
