import React from 'react'
import { TextField, Box, Typography, Grid, Paper} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import PhoneIcon from '@mui/icons-material/Phone';

function FormOtherInfo() {
  return (
    <div>
    <form autoComplete="off" dir="rtl" /*className={classes.root}*/>
    <Box marginTop={5} bgcolor="#e1f5fe" boxShadow={2} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={200} alignItems={"center"} justifyContent={"center"} margin={3} mt={4} padding={20} sx={{border: '1.5px solid #bf360c'}}  >
    <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} marginBottom={"0px"} variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
    <Typography color="#37474f" fontFamily="aleph" minHeight={45} fontWeight={'bold'} fontSize={22}  margin={5} variant='h2'  textAlign={"center"}> שלב 6 - פרטים נוספים</Typography>
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
        helperText="*קישור לרשתות החברתיות "
        rows={1}
        rowsMax={2}
        /* onChange = {handleInputChange} */
      />
    </Paper> 
  </Box>
</Grid>
<Grid item margin={2} xs={12} mt={3} style={{ marginBottom:"-3px"}}>
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
        rows={1}
        rowsMax={5}
        /* onChange = {handleInputChange} */
      />
    </Paper> 
</Grid>

</Grid>
  </Box>    
</form>
</div>
  )
}

export default FormOtherInfo