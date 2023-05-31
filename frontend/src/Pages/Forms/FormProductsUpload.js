import React from 'react'
import { TextField, Button, Box, Typography, Grid, Paper, ThemeProvider, createTheme, FormControl, FormLabel} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

const {palette} = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const themeForButton = createTheme({
  palette: {
    button: createColor('#E8AA42'),
    garbage: createColor('#9e9e9e'),
    hovergarbage: createColor('#37474f'),
  },
});

function FormProductsUpload({values, handleChange}) {
  console.log(values, handleChange);
  return (
    <ThemeProvider theme={themeForButton}>
    <div>
        <form autoComplete="off" dir="rtl" /*className={classes.root}*/>
    <Box marginTop={5} bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={142.5} alignItems={"center"} justifyContent={"center"} margin={3} mt={4} padding={20} sx={{border: '1.5px solid #f7f1e5'}}  >
    <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} mr={2.3} marginTop="-7.9rem" variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
    <Typography color="#37474f" fontFamily="aleph" minHeight={45} fontWeight={'bold'} fontSize={22} mr={2} marginBottom={2} marginTop={3} variant='h2'  textAlign={"center"}> שלב 4 - מוצרי המשק החקלאי</Typography>
      <Grid container height={278} style={{ marginTop:"-4rem"}} >
  <Grid item xs={12} style={{ marginBottom:"-1.2rem"}}>
  <Box marginBottom={2} marginTop={8} style={{ marginBottom:"-1rem"}}>
    <Paper>
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        defaultValue={values.products} 
        onChange={handleChange('products')}
        placeholder='*מוצרי המשק החקלאי (ציינו מחירים על יד כל מוצר)'
        helperText="*פירוט מבחר המוצרים ומחיריהם"
        required="required"
        rows={1}
        rowsMax={5}       

        /*helperText="*קישור לרשתות החברתיות (אופציונלי)"*/
        /* onChange = {handleInputChange} */
      />
    </Paper> 
  </Box>
  
  <Box margin={2} marginLeft={15} style={{ marginBottom:"0.2rem"}}>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <FormLabel sx={{ typography: { fontFamily: 'aleph' } }}> כאן תוכלו להוסיף תמונות של המוצרים! </FormLabel>
      </FormControl>
  </Box>
  </Grid>

  <Grid item xs={6} style={{ marginBottom:"-1rem"}}>
      <Box margin={2} border="none" Width={1000} style={{ marginBottom:"-1rem"}}>
        <Button
        /*margin={10}*/
        variant="contained"
        component="label"
        color="button"
        sx={{fontFamily: "aleph", '&:hover':{color: 'white'}}}
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
  <Grid item xs={6} style={{ marginBottom:"-1.5rem"}}>
      <Box margin={2} border="none" Width={1000} marginLeft={40} marginTop={2.4} style={{ marginBottom:"-1rem"}}>
      <Button color= "garbage" width={10} height={5} variant="outlined" startIcon={<DeleteIcon color= "garbage" />}>
        </Button>
      </Box>
      <Box margin={2.7}>

      </Box>

    </Grid>
    <Grid item xs={12} style={{ marginBottom:"-1rem"}}>
  <Box margin={2} style={{ marginBottom:"0.2rem"}}>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <FormLabel sx={{ typography: { fontFamily: 'aleph' } }}> כאן תוכלו להוסיף תמונות של המשק שתרצו שנפרסם בפרופיל שלכם! </FormLabel>
      </FormControl>
  </Box>
  </Grid>
  <Grid item xs={6} style={{ marginBottom:"-1rem"}}>
      <Box margin={2} border="none" Width={1000} style={{ marginBottom:"-1rem"}}>
        <Button
        /*margin={10}*/
        variant="contained"
        component="label"
        color="button"
        sx={{fontFamily: "aleph", '&:hover':{color: 'white'}}}
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
  <Grid item xs={6} style={{ marginBottom:"-1rem"}}>
      <Box margin={2} border="none" Width={1000} marginLeft={40} marginTop={2.4} style={{ marginBottom:"-1rem"}}>
      <Button color= "garbage" width={10} height={5} variant="outlined" startIcon={<DeleteIcon color= "garbage"/>}>
        </Button>
      </Box>
      <Box margin={2.7}>

      </Box>
  
    </Grid>
    <Box margin={2} marginRight={2} style={{ marginBottom:"-1rem"}}>
      <FormControl sx={{ m: 1, minWidth: 80}}>
        <FormLabel sx={{ typography: { fontFamily: 'aleph' } }}> כאן תוכלו להוסיף לוגו של המשק שלכם! </FormLabel>
      </FormControl>
  </Box>
    <Grid item xs={6} >
      <Box margin={2} border="none" Width={1000}>
        <Button
        /*margin={10}*/
        variant="contained"
        component="label"
        color="button"
        sx={{fontFamily: "aleph", '&:hover':{color: 'white'}}}
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
    <Grid item xs={6} style={{ marginBottom:"-1rem"}}>
      <Box margin={2} border="none" Width={1000} marginLeft={40} marginTop={2.8}>
      <Button color= "garbage" width={10} height={5} variant="outlined" startIcon={<DeleteIcon color= "garbage"/>}>
        </Button>
      </Box>
      <Box marginBottom ={2.8}>

      </Box>
  
    </Grid>
        
</Grid>

  </Box> 
     
</form>

    </div>
    </ThemeProvider>

  )
}

export default FormProductsUpload