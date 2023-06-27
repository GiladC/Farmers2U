import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

// day, setOpenening, setClosing
export default function WorkingHours(props) {
  // const [value2, setValue2] = React.useState(dayjs('2022-04-17T17:300'));
  
  const handle1 = (newValue) => {
    props.setOpening(newValue);
  }

  const handle2 = (newValue) => {
    props.setClosing(newValue);
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <Box gap={2} display= 'grid' gridTemplateColumns= '1fr 3fr 3fr' paddingTop={2} paddingRight={2} paddingLeft={2} sx={{direction: 'rtl'}} direction= 'row' alignItems= 'center'>
        <Typography variant='h5' color= 'rgb(2, 0, 99)' fontSize={20} fontWeight= {540}>{props.day}:</Typography>
        <TimeField
          direction= 'rtl'
          label="פתיחה"
          value={props.opening}
          onChange={handle1}
          format='HH:mm'
          sx={{
          "& label":{left: "unset",
          right: "1.75rem",
          transformOrigin: "right"},
          "& legend": {
            textAlign: "right",
          }}}
        />
        <TimeField
          label="סגירה"
          value={props.closing}
          onChange={handle2}
          format='HH:mm'
          sx={{
          "& label":{left: "unset",
          right: "1.75rem",
          transformOrigin: "right"},
          "& legend": {
            textAlign: "right",
          }}}
        />
      </Box>
    </LocalizationProvider>
  );
}