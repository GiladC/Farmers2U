import React from 'react'
import { TextField, Box, Typography, Grid, Paper} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import PhoneIcon from '@mui/icons-material/Phone';

function FormOtherInfo() {
  return (
    <div>
    <form autoComplete="off" dir="rtl" /*className={classes.root}*/>
    <Box bgcolor="beige" sx={{":hover": {bgcolor: '#ffeecc', color: "black", boxShadow: "5px 5px 10px #ccc"}
}} boxShadow={2}  border={1} display="flex" flexDirection={"column"} width={580} height={500} alignItems={"center"} justifyContent={"center"} margin={3} mt={4} padding={20}  >
      <Typography fontSize={50}  margin={"auto"} variant='h3'  padding={3} textAlign={"center"}> הרשמה של חקלאי לאתר</Typography>
      <Typography mt={2} fontSize={25}  margin={"auto"} variant='h2'  padding={3} textAlign={"center"}> שלב 5 - פרטים נוספים</Typography>
      <Grid container>
<Grid item xs={12}>
  <Box margin={2} >
    <Paper>
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        placeholder='כתובת של האתר / פייסבוק'
        required="required"
        helperText="*קישור לרשתות החברתיות "
        rows={1}
        rowsMax={2}
        /* onChange = {handleInputChange} */
      />
    </Paper> 
  </Box>
</Grid>
<Grid  margin={2} item xs={12} mt={3}>
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
        rows={3}
        rowsMax={5}
        /* onChange = {handleInputChange} */
      />
    </Paper> 
</Grid>
<Grid item margin={2} xs={12} mt={3} width >
    <Paper >
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        placeholder='שעות פתיחה וימי פעילות'
        helperText="*שעות פעילות"
        required="required"
        rowsMax={1}
        /* onChange = {handleInputChange} */
      />
    </Paper>
</Grid>
<Grid item xs={6} mt={4}>
  <Box margin={2} maxWidth={230} border="none" >
    <Paper >
      <TextField dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        placeholder='*מספר טלפון '
        required="required"
        helperText="*מספר קשר עבור לקוחות"
        InputProps={{
        startAdornment: (
    <InputAdornment position="end">
        <PhoneIcon>
        </PhoneIcon>
    </InputAdornment>
    
  )
}}
        /* onChange = {handleInputChange} */
      />
      </Paper>
    </Box>
    
</Grid>
</Grid>
  </Box>    
</form>
</div>
  )
}

export default FormOtherInfo