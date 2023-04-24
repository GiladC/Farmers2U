import { TextField, Button, Box, Typography, Grid, InputLabel, Paper, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';

/*const useStyle = makeStyles(theme =>({
    root:{
      '& .MuiFormControl-root': {
        width: '80%',
        margin: theme.spacing(1)
      } 

    }
}))*/
const defaultValues = {firstName:'', lastName:'', email:'', mobile:'', gender:'male', address:'', propertyName:'', birthday: new Date()}

function Form() {
  const navigate = useNavigate();
  const [values, setValues] = useState(defaultValues)
  /*const classes = useStyle();*/
  /*const handleInputChange= e=>{
    const { name,value } = e.target
  }*/

  return (
    <form autoComplete="off" dir="rtl" /*className={classes.root}*/>
        <Box bgcolor="beige" sx={{":hover": {bgcolor: '#ffeecc', color: "black", boxShadow: "5px 5px 10px #ccc"}
      }} boxShadow={2}  border={1} display="flex" flexDirection={"column"} maxWidth={1000} maxHeight={2000} alignItems={"center"} justifyContent={"center"} margin={3} mt={4} padding={10}  >
            <Typography fontSize={50}  margin={"auto"} variant='h3' marginBottom={10} padding={3} textAlign={"center"}> הרשמה של חקלאי לאתר</Typography>
            <Grid container>
      <Grid item xs={6}>
        <Box margin={2} border="none" >
          <Paper>
            <TextField dir="rtl"
              /*label="שם פרטי"*/
              name ="name"
              value={values.firstName}
              variant='outlined'
              type="text"
              placeholder='שם פרטי'
              required="required"
              /* onChange = {handleInputChange} */
            />
          </Paper>
        </Box>
        <Box margin={2}>
          <Paper>
            <TextField
              /*label="שם משפחה"*/
              name ="name"
              value={values.lastName}
              variant='outlined'
              type="text"
              placeholder='שם משפחה'
              required="required"
            />
          </Paper>  
        </Box>
      </Grid>
      <Grid item xs={6}>
        <FormControl>
          <FormLabel> מין </FormLabel>
            <RadioGroup row={true} name ="name" /*value={values.firstName}*/>
              <FormControlLabel value ="זכר" control={<Radio />} label= "זכר" />
              <FormControlLabel value ="נקבה" control={<Radio />} label= "נקבה" />
              <FormControlLabel value ="אחר" control={<Radio />} label= "אחר" />
            </RadioGroup>
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
    /*<div>
      Form{" "}
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        מעבר לדף הבית
      </button>

      <button
        onClick={() => {
          navigate("/auth");
        }}
      >
        מעבר לטופס הרשמה
      </button>
    </div>*/
  );
}

export default Form;
