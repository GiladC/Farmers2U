import { TextField, Button, Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import FormSignUpInfo from './FormSignUpInfo';


const FormLogin = () => {
    /*const navigate = useNavigate();*/
    const [inputs, setInputs] = useState({email:"", password: ""})
    const handleChange = (e) => {setInputs((prevState)=> ({...prevState, [e.target.name] : e.target.value}))}
    const handleSubmit = (e) => {e.preventDefault(); console.log(inputs);}
  return (
    <div dir="rtl">
        <form autoComplete="off" onSubmit={handleSubmit}>
            <Box bgcolor="beige" sx={{":hover": {bgcolor: '#ffeecc', color: "black", boxShadow: "5px 5px 10px #ccc"}
      }} boxShadow={2} border={1} display="flex" flexDirection={"column"}  alignItems={"center"} justifyContent={"center"} mt={-5} padding={15}  >

                <Typography variant='h3' padding={3} textAlign={"center"}> התחברות חקלאי למערכת</Typography>
                <TextField name="email" value={inputs.email} onChange={handleChange} required="required" type="email" margin="normal" variant='outlined' placeholder='כתובת מייל' InputProps={{startAdornment: (
                <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />)}}/>
                <TextField autoComplete="new-password" name="password" value={inputs.password} onChange={handleChange} required="required" type="password" margin="normal" variant='outlined' placeholder='סיסמה'  InputProps={{startAdornment: (
                <PasswordIcon color="action" sx={{ marginRight: '0.5rem' }} />),}}/>
                <Button type="submit" sx={{ mt: 4, borderRadius: 4, textTransform: 'none', display: 'flex', alignItems: 'center' }} variant="contained" color='primary' dir="rtl">להתחבר <LoginOutlinedIcon sx={{ mr: 1 }} /> </Button>
                <Button variant='text' size='medium' sx={{ mt: 4, borderRadius: 4}} color='secondary'> לשחזור סיסמה לחץ כאן </Button>   
                <a href='/form'>    
                  <Button  variant='text' size='medium' sx={{ mt: 4, borderRadius: 4}} color='inherit'> מעבר לטופס הרשמה </Button>         
                </a>  
            </Box>
        </form>
    </div>
  )
}

export default FormLogin