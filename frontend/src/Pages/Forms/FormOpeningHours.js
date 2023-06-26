import React from 'react';
import { TextField, Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import WorkingHours from '../../components/Settings/workingHours'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';

// export default function WorkingHours({day}) {
//   const [value, setValue] = React.useState(null);
//   // const [value2, setValue2] = React.useState(dayjs('2022-04-17T17:300'));
//   const [value2, setValue2] = React.useState(null);


{/*const useStyles = makeStyles({
  transparentBackground: {
    background: '#f7f1e5',
  },
});*/}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  margin: theme.spacing(1), // Add margin to create space around the text
}));

function FormOpeningHours(values, handleChange) {
  {/*const classes = useStyles();*/}
  console.log(values, handleChange);

  const [openingTimes, setOpeningTimes] = useState(['', '', '', '', '', '', '']); // Opening times for each day
  const [closingTimes, setClosingTimes] = useState(['', '', '', '', '', '', '']); // Closing times for each day
  const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  const handleChangeOpeningTime = (dayIndex, inputTime) => {
    //const inputTime = event.target.value;
    console.log(inputTime);

    // Check if the entered time matches the format "HH:MM"
    const isValidTime = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(inputTime);

    if (isValidTime || inputTime === '') {
      const newOpeningTimes = [...openingTimes];
      newOpeningTimes[dayIndex] = inputTime;
      setOpeningTimes(newOpeningTimes);
      alert(newOpeningTimes)

    }
    console.log(openingTimes);

  };

  const handleChangeClosingTime = (dayIndex, inputTime) => {
    //const inputTime = event.target.value;

    // Check if the entered time matches the format "HH:MM"
    const isValidTime = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(inputTime);

    if (isValidTime || inputTime === '') {
      const newClosingTimes = [...closingTimes];
      newClosingTimes[dayIndex] = inputTime;
      setClosingTimes(newClosingTimes);
    }
    console.log(closingTimes);

  };
  const resetOpeningTime = (dayIndex) => {
    const newOpeningTimes = [...openingTimes];
    newOpeningTimes[dayIndex] = '';
    setOpeningTimes(newOpeningTimes);
  };
  
  const resetClosingTime = (dayIndex) => {
    const newClosingTimes = [...closingTimes];
    newClosingTimes[dayIndex] = '';
    setClosingTimes(newClosingTimes);
  };
  

  return (
    <form autoComplete="off" dir="rtl">
      <Box style={{ marginBottom: '20px'}} marginTop={5}  bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection="column" height={140} width={1300} alignItems="center" justifyContent="center" mt={3.8} mr={2.3} padding={20} sx={{ border: '1.5px solid #f7f1e5' }}>
        <Typography color="#37474f" fontFamily="aleph" fontWeight="bold" fontSize={50} marginTop="-9rem" variant="h3" textAlign="center">הרשמת חקלאי</Typography>
        <Typography color="#37474f" fontFamily="aleph" minHeight={45} fontWeight="bold" fontSize={22} marginBottom={2} marginTop={3} variant="h2" textAlign="center">שלב 5 - שעות פתיחה וימי פעילות</Typography>
        <Grid container spacing={22} mr={24}>
        {days.map((day, index) => (
            <Grid item xs={1} key={day}>
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <Box gap={2} display= 'flex' flexDirection='column'  gridTemplateColumns= '1fr 3fr 3fr' paddingTop={2} paddingRight={2} paddingLeft={2} sx={{direction: 'rtl'}} direction= 'row' alignItems= 'center'>
        <Typography variant='h5' fontFamily="aleph" color= 'rgb(2, 0, 99)' fontSize={20} fontWeight= {540}>
          {day}
          </Typography>
      <Box position="relative">
      <Paper>
        <TimeField
          direction= 'rtl'
          label="פתיחה"
          value={null}
          onChange={(event) => handleChangeOpeningTime(index, event)}
          //value={value}
          //onChange={(newValue) => setValue(newValue)}
          format='HH:mm'
          sx={{
          "& label":{left: "unset",
          right: "1.75rem",
          transformOrigin: "right"},
          "& legend": {
            textAlign: "right",
          },
          width: '150px',
          }}
        />
        </Paper>
      {/* <button style={{position: 'absolute', bottom: 0, left: 0}} onClick={() => resetOpeningTime(index)}>X</button> */}
      </Box>
      <Paper>
        <TimeField
          label="סגירה"
          value={null}
          onChange={(event) => handleChangeClosingTime(index, event)}
          //value={value2}
          //onChange={(newValue) => setValue2(newValue)}
          format='HH:mm'
          sx={{
          "& label":{left: "unset",
          right: "1.75rem",
          transformOrigin: "right"},
          "& legend": {
            textAlign: "right",
          },
          width: '150px',
          }}
        />
        </Paper>
      </Box>
    </LocalizationProvider>
    </Grid>
        ))}
        </Grid>
      </Box>
    </form>
  );
}

export default FormOpeningHours;