import React from 'react'
import { Checkbox, TextField, Box, Typography, Grid, InputLabel, Autocomplete, Popper, Paper,Slider, FormControl, FormLabel, FormControlLabel } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 100,
    label: '100',
  },
  {
    value: 150,
    label: '150',
  },
];


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cpath fill="currentColor" d="M3 4a2 2 0 0 0-2 2v11h2a3 3 0 0 0 3 3a3 3 0 0 0 3-3h6a3 3 0 0 0 3 3a3 3 0 0 0 3-3h2v-5l-3-4h-3V4m-7 2l4 4l-4 4v-3H4V9h6m7 .5h2.5l1.97 2.5H17M6 15.5A1.5 1.5 0 0 1 7.5 17A1.5 1.5 0 0 1 6 18.5A1.5 1.5 0 0 1 4.5 17A1.5 1.5 0 0 1 6 15.5m12 0a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5Z"%2F%3E%3C%2Fsvg%3E')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#E8AA42' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#E8AA42',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cpath fill="currentColor" fill-rule="evenodd" d="M9 8a3 3 0 1 1 6 0H9ZM7 8a5 5 0 0 1 10 0h3a1 1 0 0 1 .996 1.09l-.835 9.182A3 3 0 0 1 17.174 21H6.826a3 3 0 0 1-2.987-2.728L3.004 9.09A1 1 0 0 1 4 8h3Z" clip-rule="evenodd"%2F%3E%3C%2Fsvg%3E')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));
const PrettoSlider = styled(Slider)({
  width:'90%',
  alignSelf:'center',
  color: '#E8AA42',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#E8AA42',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});


function FormShippingOptions({values, handleChange}) {
  const [isShipping, setIsShipping] = useState(false)
  const handleSwitch = (event) => {
    setIsShipping(event.target.checked);
  };
  const [distance, setDistance] = useState(5)
  const handleDistanceChange = (event, newValue) => {
      setDistance(newValue);
    };
  console.log(values, handleChange);
  return (
    <div>
    <form autoComplete="off" dir="rtl" /*className={classes.root}*/>
    <Box marginTop={5} bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={160.2} alignItems={"center"} justifyContent={"center"} mt={3.8} mr={2.3} padding={20} sx={{border: '1.5px solid #f7f1e5'}}  >
    <Box marginTop={2} marginBottom={5}>
    <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} marginTop="-7.3rem" variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
    <Typography color="#37474f" fontFamily="aleph" minHeight={45} fontWeight={'bold'} fontSize={22}  mr={2} marginBottom={2} marginTop={3} variant='h2'  textAlign={"center"}> שלב 3 - משלוחים והזמנות</Typography>
    </Box>
      <Grid container style={{ marginBottom:"-30px"}}>
      <Grid item xs={12} style={{ marginTop:"-40px"}}>
      <Stack direction="row" spacing={1} alignItems="center" display='flex' justifyContent='center'>
            <Typography fontFamily="aleph">עושים משלוחים</Typography>
            <MaterialUISwitch sx={{ m: 1 }} checked = {isShipping} onChange= {handleSwitch}/>
            <Typography fontFamily="aleph">איסוף עצמי בלבד</Typography>
        </Stack>
        {/* מרחק המשלוח*/}
        {/*!isShipping */}
        <Stack>
             <Typography fontFamily="aleph" sx={{ fontSize: '20px', color: isShipping ? '#1d3c45' : "#bdbdbd", display: 'flex', justifyContent: 'center', paddingTop: '5%'}}>טווח המשלוח (בק"מ)</Typography>
             <PrettoSlider
        aria-label="distance"
        defaultValue={5}
        value = {distance}
        onChange={handleDistanceChange}
        // getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={5}
        marks = {marks}
        min={0}
        max={150}
        disabled={!isShipping}
      />
             </Stack>
  <Box margin={2} >
    <Paper>
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        placeholder=" מדיניות הזמנות ומשלוחים:
        ציינו את כל הפרטים הרלוונטיים כמו: מינימום הזמנה, מחיר משלוח משתנה,
        בהתאם למיקום / סכום הזמנה וכו' ..."
        required="required"
        defaultValue={values.prices} 
        onChange={handleChange('prices')}
        rows={3}
        rowsMax={5}
        /*helperText="*קישור לרשתות החברתיות (אופציונלי)"*/
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

export default FormShippingOptions