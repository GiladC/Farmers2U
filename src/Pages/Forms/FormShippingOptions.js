import React from 'react'
import { Checkbox, TextField, Box, Typography, Grid, Paper, FormControl, FormLabel, FormControlLabel } from '@mui/material'



function FormShippingOptions() {
  return (
    <div>
    <form autoComplete="off" dir="rtl" /*className={classes.root}*/>
  <Box bgcolor="beige" sx={{":hover": {bgcolor: '#ffeecc', color: "black", boxShadow: "5px 5px 10px #ccc"}
}} boxShadow={2}  border={1} display="flex" flexDirection={"column"} width={580} height={500} alignItems={"center"} justifyContent={"center"} margin={3} mt={4} padding={20}  >
      <Typography fontSize={50}  margin={"auto"} variant='h3'  padding={3} textAlign={"center"}> הרשמה של חקלאי לאתר</Typography>
      <Typography mt={2} fontSize={25}  margin={"auto"} variant='h2'  padding={3} textAlign={"center"}> שלב 3 - משלוחים והזמנות</Typography>
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
  <Grid item margin={2} xs={12} mt={3} width >
  <Box sx={{ display: 'flex', alignItems: 'center', ml: 3 }}>
    <FormControl sx={{ m: 1, minWidth: 80 }}>
      <FormLabel sx={{ display: 'flex', flexWrap: 'wrap', wordWrap: 'break-word' }}> מהו טווח המשלוח? </FormLabel>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <FormControlLabel
          control={<Checkbox />}
          label="אין משלוחים"
          sx={{ marginRight: '1rem' }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="אשדוד והסביבה"
          sx={{ marginRight: '1rem' }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="גבעת זאב, בית חורון והסביבה"
          sx={{ marginRight: '1rem' }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="ירושלים והסביבה"
          sx={{ marginRight: '1rem' }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <FormControlLabel
          control={<Checkbox />}
          label="הרצליה רחבי העיר"
          sx={{ marginRight: '1rem' }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="חולון / בת ים"
          sx={{ marginRight: '1rem' }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="חיפה וחוף הכרמל"
          sx={{ marginRight: '1rem' }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="מודיעין עלית והסביבה"
          sx={{ marginRight: '1rem' }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <FormControlLabel
          control={<Checkbox />}
          label="כוכב יאיר והסביבה"
          sx={{ marginRight: '1rem' }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="כפר סבא / רעננה / הוד השרון"
          sx={{ marginRight: '1rem' }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="לב השרון ונתניה"
          sx={{ marginRight: '1rem' }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="מודיעין עלית והסביבה"
          sx={{ marginRight: '1rem' }}
        />
      </Box>
    </FormControl>
  </Box>
  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <FormControlLabel
          control={<Checkbox />}
          label="עמק חפר / חדרה והסביבה"
          sx={{ marginRight: '1rem' }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="עפולה והסביבה"
          sx={{ marginRight: '1rem' }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="פתח תקווה / ראש העין והסביבה"
          sx={{ marginRight: '1rem' }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="קריות וצפונה"
          sx={{ marginRight: '1rem' }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <FormControlLabel
          control={<Checkbox />}
          label="קריית אונו / יהוד / שוהם והסביבה"
          sx={{ marginRight: '1rem' }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="רמת גן / גבעתיים והסביבה"
          sx={{ marginRight: '1rem' }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="ראשון לציון / רחובות והסביבה"
          sx={{ marginRight: '1rem' }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="תל אביב"
          sx={{ marginRight: '1rem' }}
        />
      </Box>
</Grid>
</Grid>
  </Box>    
</form>
</div>
  )
}

export default FormShippingOptions