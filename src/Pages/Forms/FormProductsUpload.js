import React from 'react'
import { TextField, Button, Box, Typography, Grid, Paper, FormControl, FormLabel} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

function FormProductsUpload() {
  return (
    <div>
        <form autoComplete="off" dir="rtl" /*className={classes.root}*/>
  <Box bgcolor="beige" sx={{":hover": {bgcolor: '#ffeecc', color: "black", boxShadow: "5px 5px 10px #ccc"}
}} boxShadow={2}  border={1} display="flex" flexDirection={"column"} width={580} height={500} alignItems={"center"} justifyContent={"center"} margin={3} mt={4} padding={20}  >
      <Typography fontSize={50}  margin={"auto"} variant='h3'  padding={3} textAlign={"center"}> הרשמה של חקלאי לאתר</Typography>
      <Typography mt={2} fontSize={25}  margin={"auto"} variant='h2'  padding={3} textAlign={"center"}> שלב 4 - מוצרי המשק החלקאי</Typography>
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
        placeholder='*מוצרי המשק החקלאי (ציינו מחירים על יד כל מוצר)
        '
        helperText="*פירוט מבחר המוצרים ומחיריהם"
        required="required"
        rows={4}
        rowsMax={5}
        /*helperText="*קישור לרשתות החברתיות (אופציונלי)"*/
        /* onChange = {handleInputChange} */
      />
    </Paper> 
  </Box>
  <Box margin={2} marginLeft={15}>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <FormLabel> כאן תוכלו להוסיף תמונות של המוצרים! </FormLabel>
      </FormControl>
  </Box>
  </Grid>

  <Grid item xs={6}>
      <Box margin={2} border="none" Width={1000}>
        <Button
        /*margin={10}*/
        variant="contained"
        component="label"
      >
        הוספת תמונות
        <input
          type="file"
          label =""
          hidden
        />
      </Button>
    </Box>
    <Box margin={2} marginTop={2.4}>

    </Box>
  </Grid>
  <Grid item xs={6}>
      <Box margin={2} border="none" Width={1000} marginLeft={40} marginTop={2.4}>
      <Button width={10} height={5} variant="outlined" startIcon={<DeleteIcon />}>
        </Button>
      </Box>
      <Box margin={2.7}>

      </Box>

    </Grid>
    <Grid item xs={12}>
  <Box margin={2} >
      <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <FormLabel> כאן תוכלו להוסיף תמונות של המשק החקלאי שתרצו שנפרסם בפרופיל שלכם! </FormLabel>
                  </FormControl>
  </Box>
  </Grid>
  <Grid item xs={6}>
      <Box margin={2} border="none" Width={1000}>
        <Button
        /*margin={10}*/
        variant="contained"
        component="label"
      >
        הוספת תמונות
        <input
          type="file"
          label =""
          hidden
        />
      </Button>
    </Box>
    <Box margin={2} marginTop={2.4}>

    </Box>
  </Grid>
  <Grid item xs={6}>
      <Box margin={2} border="none" Width={1000} marginLeft={40} marginTop={2.4}>
      <Button width={10} height={5} variant="outlined" startIcon={<DeleteIcon />}>
        </Button>
      </Box>
      <Box margin={2.7}>

      </Box>

    </Grid>
</Grid>
  </Box>    
</form>
    </div>
  )
}

export default FormProductsUpload