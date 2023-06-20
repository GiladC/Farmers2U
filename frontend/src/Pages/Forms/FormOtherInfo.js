import React from 'react'
import { TextField, Box, Typography, Grid, Paper, Button, } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import axios from "axios";
import PublishSharpIcon from '@mui/icons-material/PublishSharp';

function FormOtherInfo({values, handleChange}) {
  console.log(values, handleChange);
  const {farmName, email, password, phoneNumber1,
    phoneNumber2, city, address, farmerName, prices, products, facebook, instagram} = values
  const handleSubmit = (data) => {
    data.preventDefault();

    axios({
        method: "POST",
        url: "http://127.0.0.1:5000/signup",
        data:{
        farmName: values.farmName,
        email: values.email,
        password: values.password,
        about: values.about,
        phoneNumber1: values.phoneNumber1,
        phoneNumber2: values.phoneNumber2,
        city: values.city,
        address: values.address,
        farmerName: "",
        prices: values.prices,
        products: values.products,
        facebook: values.facebook,
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
  return (
    <div  >  
    <form mr={3}autoComplete="off" dir="rtl" /*className={classes.root}*/>  
    <Box marginTop={5} bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={160.2} alignItems={"center"} justifyContent={"center"} mt={3.8} mr={2.3} padding={20} sx={{border: '1.5px solid #f7f1e5'}}  >
    <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} marginTop="-9.2rem" variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
    <Typography color="#37474f" fontFamily="aleph" minHeight={45} fontWeight={'bold'} fontSize={22}  mr={2} marginBottom={12} marginTop={3} variant='h2'  textAlign={"center"}> שלב 6 - פרטים נוספים</Typography>
<Grid marginTop={-12} marginBottom={-10} container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>
  <Paper>
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="facebook"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        placeholder='קישור לפייסבוק'
        required="required"
        rows={1}
        rowsMax={5}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
                <FacebookIcon sx={{ ml: 0.1, my: 0.5 }}>
                </FacebookIcon>
            </InputAdornment>
          )
          
        }}
        /* onChange = {handleInputChange} */
      />
    </Paper> 
  </Grid>
  <Grid item xs={6}>
  <Paper>
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="instagram"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        placeholder='קישור לאינסטגרם'
        required="required"
        rows={1}
        rowsMax={5}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
                <InstagramIcon sx={{ ml: 0.1, my: 0.5 }}>
                </InstagramIcon>
            </InputAdornment>
          )
          
        }}
        /* onChange = {handleInputChange} */
      />
    </Paper> 
  </Grid>
  <Grid item xs={12}>
  <Paper>
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="website"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        placeholder='כתובת אתר (אם קיים)'
        rows={1}
        rowsMax={5}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
                <LanguageIcon sx={{ ml: 0.1, my: 0.5 }}>
                </LanguageIcon>
            </InputAdornment>
          )
          
        }}
        /* onChange = {handleInputChange} */
      />
    </Paper> 
  </Grid>
  <Grid item xs={12}>
  <Paper>
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        placeholder='ספרו על עצמכם!'
        required="required"
        helperText="*כאן תוכלו לשתף את הסיפור שלכם בכמה משפטים (יוצג באתר)"
        rows={2}
        rowsMax={5}
        /* onChange = {handleInputChange} */
      />
    </Paper> 
  </Grid>
</Grid>

<Box display="flex"   alignItems="center" 
  justifyContent="center" mt={5} mr={1} style={{
    position: 'absolute',
    top: '85.8%',
    left: '42.9%',
    zIndex: 1,
    
  }}>
<Button style= {{borderWidth:'1px', minWidth:"50px", width:"5.1rem", backgroundColor: "#ffb74d", 
                fontFamily:"aleph", fontSize: 16,
                color: "#212121"}} variant="outlined" sx={{borderColor: 'black'}} 
  type="submit" onClick={handleSubmit}>שלח</Button>
  </Box>
  </Box>
     
</form>
</div>
  )
}

export default FormOtherInfo

{/*        defaultValue={values.about} 
onChange={handleChange('about')}*/}