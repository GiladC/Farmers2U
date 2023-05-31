import React from 'react'
import { TextField, Box, Typography, Grid, Paper, Button} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import PhoneIcon from '@mui/icons-material/Phone';
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
      <Grid container style={{ marginBottom:"-50px"}}>
<Grid height={0.18} item xs={12} style={{ marginTop:"-20px"}}>
  <Box margin={2}style={{ marginTop:"-30px"}}>
    <Paper>
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        placeholder='כתובת אינטרנט / פייסבוק / אינסטגרם'
        required="required"
        defaultValue={values.facebook} 
        onChange={handleChange('facebook')}
        helperText="*קישור לרשתות החברתיות "
        rows={2}
        rowsMax={2}
        /* onChange = {handleInputChange} */
      />
    </Paper> 
  </Box>
</Grid>

<Grid  margin={2} item xs={12} mt={3} mb={0}> 
    <Paper>
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        placeholder='ספרו על עצמכם!'
        required="required"
        defaultValue={values.about} 
        onChange={handleChange('about')}
        helperText="*כאן תוכלו לשתף את הסיפור שלכם בכמה משפטים (יוצג באתר)"
        rows={2}
        rowsMax={5}
        /* onChange = {handleInputChange} */
      />
    </Paper> 
</Grid>

</Grid>
<Box mt={5} mr={1} style={{
    position: 'absolute',
    top: '85.5%',
    left: '40.5%',
    zIndex: 1,
  }}>
<Button style= {{borderWidth:'1px', minWidth:"50px", width:"5.1rem", backgroundColor: "#ffb74d", 
                marginLeft: "35px", fontFamily:"aleph", fontSize: 16,
                color: "#212121"}} variant="outlined" sx={{borderColor: 'black'}} 
  type="submit" onClick={handleSubmit}>שלח</Button>
  </Box>
  </Box>
     
</form>
</div>
  )
}

export default FormOtherInfo