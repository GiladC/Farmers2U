import React from 'react'
import { TextField, Box, Typography, Grid, Paper, FormControl, FormLabel, Select, MenuItem } from '@mui/material'
import LocationCityIcon from '@mui/icons-material/LocationCity';
import InputAdornment from '@mui/material/InputAdornment';
import AgricultureIcon from '@mui/icons-material/Agriculture';

function FormPersonalInfo() {
  return (
    <div>
    <form autoComplete="off" dir="rtl" /*className={classes.root}*/>
  <Box bgcolor="beige" sx={{":hover": {bgcolor: '#ffeecc', color: "black", boxShadow: "5px 5px 10px #ccc"} 
}} boxShadow={2}  border={1} display="flex" flexDirection={"column"} width={580} height={500} marginTop={10} alignItems={"center"} justifyContent={"center"} margin={3} mt={4} padding={20}  >
      <Typography fontSize={50}  margin={"auto"} variant='h3' padding={3} textAlign={"center"}> הרשמה של חקלאי לאתר</Typography>
      <Typography mt={20} fontSize={25}  margin={"auto"} variant='h2' padding={3} textAlign={"center"}> שלב 2 - מיקום המשק החקלאי</Typography>
        <Grid container>
          <Grid item xs={6}>
            <Box margin={2} border="none">
              <Paper>
                <TextField dir="rtl"
                  /*label="שם פרטי"*/
                  name ="name"
                  /*value={values.firstName}*/
                  variant='outlined'
                  type="text"
                  placeholder='*כתובת המשק החקלאי'
                  required="required"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                          <AgricultureIcon>
                          </AgricultureIcon>
                      </InputAdornment>
                    )
                  }}      
                  /* onChange = {handleInputChange} */
                />
              </Paper>
            </Box>
            <Box margin={2}>
              <Paper >
                <TextField
                  /*label="שם משפחה"*/
                  name ="name"
                  /*value={values.lastName}*/
                  variant='outlined'
                  type="text"
                  placeholder='*עיר / קיבוץ / מושב'
                  required="required"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                          <LocationCityIcon>
                          </LocationCityIcon>
                      </InputAdornment>
                    )
                  }}
                  /*helperText="*קישור לרשתות החברתיות (אופציונלי)"*/
                />
              </Paper>  
            </Box>
          </Grid>
          <Grid item xs={6} mt={3}>
            <FormControl>
                <div>
                  <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <FormLabel> מאיזה אזור אתם בארץ? </FormLabel>
                    <Select dir="rtl"
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      /*value={age}*/
                      /*onChange={handleChange}*/
                      autoWidth
                      label="Age"
                    >
                      
                      <MenuItem value="" dir="rtl">
                        <em>חלוקה לפי מחוזות</em>
                      </MenuItem>
                      <MenuItem dir="rtl" value={1}>מחוז הצפון</MenuItem>
                      <MenuItem dir="rtl" value={2}>מחוז חיפה</MenuItem>
                      <MenuItem dir="rtl" value={3}>מחוז תל אביב</MenuItem>
                      <MenuItem dir="rtl" value={4}>מחוז ירושלים</MenuItem>
                      <MenuItem dir="rtl" value={5}>מחוז הדרום</MenuItem>
                      <MenuItem dir="rtl" value={6}>מחוז יהודה ושומרון</MenuItem>
                    </Select>
                  </FormControl>
                </div>
            </FormControl>
          </Grid>
          </Grid>
  </Box>    
</form>
</div>
  )
}

export default FormPersonalInfo