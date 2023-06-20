import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { Box, Typography } from '@mui/material';

export default function WorkingHours({day}) {
  const [value, setValue] = React.useState(null);
  // const [value2, setValue2] = React.useState(dayjs('2022-04-17T17:300'));
  const [value2, setValue2] = React.useState(null);
  


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <Box gap={2} display= 'grid' gridTemplateColumns= '1fr 3fr 3fr' paddingTop={2} paddingRight={2} paddingLeft={2} sx={{direction: 'rtl'}} direction= 'row' alignItems= 'center'>
        <Typography variant='h5' color= 'rgb(2, 0, 99)' fontSize={20} fontWeight= {540}>{day}:</Typography>
        <TimeField
          direction= 'rtl'
          label="פתיחה"
          value={value}
          onChange={(newValue) => setValue(newValue)}
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
          value={value2}
          onChange={(newValue) => setValue2(newValue)}
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