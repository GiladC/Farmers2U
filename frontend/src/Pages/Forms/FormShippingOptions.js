import React from 'react'
import { Checkbox, TextField, Box, Typography, Grid, InputLabel, Autocomplete, Popper, Paper, FormControl, FormLabel, FormControlLabel } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const destinations = [
  { title: 'אשדוד והסביבה', year: 1994 },
  { title: 'גבעת זאב, בית חורון והסביבה', year: 1972 },
  { title: 'הרצליה פיתוח ונוף הים', year: 1974 },
  { title: 'הרצליה רחבי העיר', year: 2008 },
  { title: 'חולון, בת ים', year: 1957 },
  { title: "חיפה וחוף הכרמל", year: 1993 },
  { title: 'חשמונאים מודיעין עילית והסביבה', year: 1994 },
  {
    title: 'יקנעם, טבעון והסביבה',
    year: 2003,
  },
  { title: 'ירושלים והסביבה', year: 1966 },
  {
    title: 'כוכב יאיר,סלעית, גוש חורשים והסביבה',
    year: 2001,
  },
  {
    title: 'עמק חפר, חדרה, פרדס חנה ועד זיכרון יעקב',
    year: 1980,
  },
  { title: 'עפולה, כפר תבור והסביבה', year: 1994 },
  {
    title: 'צפון תל אביב ורמת השרון',
    year: 2002,
  },
  { title: "קריות וצפונה", year: 1975 },
  { title: 'קריית אונו, יהוד, שוהם והסביבה', year: 1990 },
  { title: 'רמת גן, גבעתיים והסביבה', year: 1999 },
  { title: 'ראשון לציון, רחובות והסביבה', year: 1954 },
  {
    title: 'תל אביב מרכז + יפו',
    year: 1977,
  },
  { title: 'תל אביב - צפון ישן', year: 2002 },
  { title: 'אין משלוחים', year: 2002 }
];




function FormShippingOptions() {
  return (
    <div>
    <form autoComplete="off" dir="rtl" /*className={classes.root}*/>
    <Box marginTop={5} bgcolor="#e1f5fe" boxShadow={2} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={200} alignItems={"center"} justifyContent={"center"} margin={3} mt={4} padding={20} sx={{border: '1.5px solid #bf360c'}}  >
    <Box marginTop={2}>
    <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} marginBottom={"0px"} variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
    <Typography color="#37474f" fontFamily="aleph" minHeight={45} fontWeight={'bold'} fontSize={22}  margin={5} variant='h2'  textAlign={"center"}> שלב 3 - משלוחים והזמנות</Typography>
    </Box>
      <Grid container style={{ marginBottom:"-30px"}}>
      <Grid item xs={12} style={{ marginTop:"-40px"}}>
  <Box margin={2} >
    <Paper>
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        placeholder=" מחירי משלוחים (במידה וקיימים):
        ציינו את כל הפרטים הרלוונטיים כמו: מינימום הזמנה, מחיר משלוח משתנה,
        בהתאם למיקום / סכום הזמנה וכו' ..."
        required="required"
        helperText="*מדיניות הזמנות ומשלוחים"
        rows={3}
        rowsMax={5}
        /*helperText="*קישור לרשתות החברתיות (אופציונלי)"*/
        /* onChange = {handleInputChange} */
      />
    </Paper> 
  </Box>
  </Grid>
  <Grid item margin={2} xs={12} mt={3} width style={{ marginBottom:"40px"}}>
    <InputLabel style={{fontFamily:"aleph", textAlign: 'right', paddingRight: '20px'}}>מהו טווח המשלוח?</InputLabel>
    <Paper>
    <Autocomplete
    ListboxProps={{ style: { direction: 'rtl' } }}
    multiple
    id="checkboxes-tags-demo"
    options={destinations}
    disableCloseOnSelect
    getOptionLabel={(option) => option.title}
    renderOption={(props, option, { selected }) => (
      <li {...props}>
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          dir="rtl"
          style={{ marginRight: 8 }}
          checked={selected}
        />
        {option.title}
      </li>
    )}
    style={{ width: 550 }}
    dir="rtl"
    PaperComponent={({ children }) => (
      <Paper style={{ top: 'auto', bottom: 0, maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
        {children}
      </Paper>
    )}
    PopperComponent={({ anchorEl, children, ...props }) => (
      <Popper
        {...props}
        anchorEl={anchorEl}
        placement="bottom-end"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {children}
      </Popper>
    )}
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder="אזורי משלוח"
        dir="rtl"
      />
    )}
  />
  </Paper>
</Grid>

</Grid>
  </Box>    
</form>
</div>
  )
}

export default FormShippingOptions