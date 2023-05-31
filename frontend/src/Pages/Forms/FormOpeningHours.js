import React from 'react';
import { TextField, Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

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

  const handleChangeOpeningTime = (dayIndex, event) => {
    const inputTime = event.target.value;

    // Check if the entered time matches the format "HH:MM"
    const isValidTime = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(inputTime);

    if (isValidTime || inputTime === '') {
      const newOpeningTimes = [...openingTimes];
      newOpeningTimes[dayIndex] = inputTime;
      setOpeningTimes(newOpeningTimes);
    }
  };

  const handleChangeClosingTime = (dayIndex, event) => {
    const inputTime = event.target.value;

    // Check if the entered time matches the format "HH:MM"
    const isValidTime = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(inputTime);

    if (isValidTime || inputTime === '') {
      const newClosingTimes = [...closingTimes];
      newClosingTimes[dayIndex] = inputTime;
      setClosingTimes(newClosingTimes);
    }
  };

  return (
    <form autoComplete="off" dir="rtl">
      <Box style={{ marginBottom: '20px'}} marginTop={5}  bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection="column" height={140} width={1300} alignItems="center" justifyContent="center" mt={3.8} mr={2.3} padding={20} sx={{ border: '1.5px solid #f7f1e5' }}>
        <Typography color="#37474f" fontFamily="aleph" fontWeight="bold" fontSize={50} marginTop="-9rem" variant="h3" textAlign="center">הרשמת חקלאי</Typography>
        <Typography color="#37474f" fontFamily="aleph" minHeight={45} fontWeight="bold" fontSize={22} marginBottom={2} marginTop={3} variant="h2" textAlign="center">שלב 5 - שעות פתיחה וימי פעילות</Typography>
        <Grid container spacing={17.87} mr={6.9} mt={3} mb={-2}>
          <Grid item xs={1} ></Grid>
          <Box ml={13.7} mr={.5}>
            <Typography color="#37474f" fontFamily="aleph" fontWeight="bold" fontSize={20}>ראשון</Typography>
          </Box>
          <Box ml={13.4}>
            <Typography color="#37474f" fontFamily="aleph" fontWeight="bold" fontSize={20}>שני</Typography>
          </Box>
          <Box ml={12.2}>
            <Typography color="#37474f" fontFamily="aleph" fontWeight="bold" fontSize={20}>שלישי</Typography>
          </Box>
          <Box ml={12.2}>
            <Typography color="#37474f" fontFamily="aleph" fontWeight="bold" fontSize={20}>רביעי</Typography>
          </Box>
          <Box ml={12.5}>
            <Typography color="#37474f" fontFamily="aleph" fontWeight="bold" fontSize={20}>חמישי</Typography>
          </Box>
          <Box ml={13.5}>
            <Typography color="#37474f" fontFamily="aleph" fontWeight="bold" fontSize={20}>שישי</Typography>
          </Box>
          <Box ml={12.5}>
            <Typography color="#37474f" fontFamily="aleph" fontWeight="bold" fontSize={20}>שבת</Typography>
          </Box>
        </Grid>
        <Grid container spacing={0} alignItems="center" mt={-10}>
          <Box item xs={1}>
            <Typography color="#37474f" fontFamily="aleph" fontWeight="bold" fontSize={20}>שעת פתיחה</Typography>
          </Box>
          {openingTimes.map((openingTime, index) => (
            <Grid item xs={1.1} key={index} mr={4}>
              <TextField
                sx={{ backgroundColor: '#fff', width: '100%' }}
                value={openingTime}
                type="time"
                onChange={(event) => handleChangeOpeningTime(index, event)}
                placeholder="10:00"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={0} alignItems="center">
          <Box item xs={1} >
            <Typography color="#37474f" fontFamily="aleph" fontWeight="bold" fontSize={20} mt={3} mr={.4} ml={.4}>שעת סגירה</Typography>
          </Box>
          {closingTimes.map((closingTime, index) => (
            <Grid item xs={1.1} key={index} mr={4} mt={3}>
              <TextField
                sx={{ backgroundColor: '#fff', width: '100%' }}
                value={closingTime}
                type="time"
                onChange={(event) => handleChangeClosingTime(index, event)}
                placeholder="17:00"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </form>
  );
}

export default FormOpeningHours;