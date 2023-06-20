import React from 'react'
import { TextField, Button, Box, Typography, Grid, Paper, ThemeProvider, Menu, MenuItem, FormControlLabel, Checkbox, createTheme, FormControl, FormLabel} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


const {palette} = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const themeForButton = createTheme({
  palette: {
    button: createColor('#E8AA42'),
    white: createColor('#ffffff'),
    garbage: createColor('#9e9e9e'),
    hovergarbage: createColor('#37474f'),
  },
});
function CheckboxMenu() {
  const labels = ["ירקות", "פירות", "גבינות ומוצרי חלב", "ביצים", "דבש", "צמחים", "יינות ושמן זית", "תבלינים", "דגנים"];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [checked, setChecked] = React.useState(
    Array(9).fill(false) // Initial state for 9 checkboxes
  );
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (index) => {
    setChecked((prevChecked) => {
      const newChecked = [...prevChecked];
      newChecked[index] = !newChecked[index];
      return newChecked;
    });
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = [...prevSelectedItems];
      if (newSelectedItems.includes(labels[index])) {
        const itemIndex = newSelectedItems.indexOf(labels[index]);
        newSelectedItems.splice(itemIndex, 1);
      } else {
        newSelectedItems.push(labels[index]);
      }
      return newSelectedItems;
    });
  };
  const handleRemove = (event,label) => {
    event.stopPropagation();
    const index = labels.indexOf(label);
    setChecked((prevChecked) => {
      const newChecked = [...prevChecked];
      newChecked[index] = false;
      return newChecked;
    });

    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = [...prevSelectedItems];
      const itemIndex = newSelectedItems.indexOf(label);
      newSelectedItems.splice(itemIndex, 1);
      return newSelectedItems;
    });
  };

    
  
  return (
    <div>
      <Button variant="contained" color="white" onClick={handleClick}
       style={{
        width: "580px",
        height: "50px",
        border: "1px solid #bdbdbd", 
        overflowX: "scroll", 
        whiteSpace: "nowrap", 
        display: "flex", 
        alignItems: "center", 
       justifyContent: "flex-start", 
       background: "FFFFFF",
       '&:hover': {
         backgroundColor: '#FFFFFF',
       }, }}>

      {Boolean(anchorEl) ? <RemoveIcon /> : <AddIcon />}
      <Typography style={{ color: '#9e9e9e', fontSize: '15px', fontFamily: 'aleph' }}>
      {selectedItems.length > 0 ? 
          <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
            {selectedItems.map((item, index) => (
              <div key={index} style={{ backgroundColor: '#f5f5f5', margin: '5px', padding: '5px' }}>
                {item }
                <span style={{ cursor: 'pointer', marginRight: '10px' }} onClick={(event) => handleRemove(event,item)}>
                  x
                </span>
              </div>
            ))}
          </div>
          : 'אילו מוצרים אתם מוכרים?'}
            </Typography>
        </Button>
      <Menu
        id="checkbox-menu"
        anchorEl={anchorEl}
        keepMounted
        dir="rtl"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Position where the menu will be attached
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}  // Position from where the menu will appear
        PaperProps={{
          style: {
            maxHeight: 200, // Sets the maximum height for menu
            width: '57.7ch',
            flexGrow:1,
            
          },
        }}
      >
      <Grid container rowSpacing={1} columnSpacing={-5}>
      {labels.map((label, i) => (
          <Grid item xs={4} key={i}>
          <MenuItem  onClick={(event) => event.stopPropagation()}>
            <FormControlLabel
              control={<Checkbox checked={checked[i]} onChange={() => handleToggle(i)} color={checked[i] ? 'button' : 'default'}/>}
              label={label}

            />
          </MenuItem>
          </Grid>
        ))}
            </Grid>
    <div style={{ borderTop: '1px solid #ccc', marginTop: '10px', paddingTop: '10px' }}>
      {selectedItems.join(', ')}
    </div>
      </Menu>
      {/*<div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <strong></strong>
        {selectedItems.map((item, index) => (
          <div key={index} style={{ backgroundColor: '#f5f5f5', margin: '5px', padding: '5px' }}>
            {item }
            <span style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleRemove(item)}>
              x
            </span>
          </div>
        ))}
        </div>*/}
    </div>

  );
}

function FormProductsUpload({values, handleChange}) {
  console.log(values, handleChange);
  const additionalItems = ['אורגני', 'טבעוני'];
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
  <Box mb={2} dir="rtl">
    <CheckboxMenu />
  <Typography color="#757575"fontFamily="aleph" marginTop={1} > מוכרים מוצרים מיוחדים? סמנו כאן! </Typography>
    <Box>
        <Grid container justifyContent="space-around">
            {additionalItems.map((item, index) => (
                <Grid item xs={2} key={index}>
                    <FormControlLabel
                        control={<Checkbox />}
                        label={item}
                    />
                </Grid>
            ))}
            {[...Array(3)].map((_, index) => (
                <Grid item xs={2} key={index}></Grid>
            ))}
        </Grid>
    </Box>
  </Box>
  <Typography color="#757575"fontFamily="aleph" marginTop={-2} > פירוט מבחר המוצרים ומחיריהם: </Typography>
    <Paper>
      <TextField fullWidth multiline dir="rtl"
        /*label="שם פרטי"*/
        name ="name"
        /*value={values.firstName}*/
        variant='outlined'
        type="text"
        defaultValue={values.products} 
        onChange={handleChange('products')}
        placeholder='דוגמה: עגבניות - 8 ש"ח לק"ג, ענבים - 25 ש"ח למארז'
        required="required"
        rows={2}
        rowsMax={5}       

        /*helperText="*קישור לרשתות החברתיות (אופציונלי)"*/
        /* onChange = {handleInputChange} */
      />
    </Paper> 
  </Box>
  <Typography color="#757575"fontFamily="aleph" marginTop={3} marginBottom={2}> הוספת תמונות: </Typography>

  </Grid>

  <Grid item xs={12} style={{ marginBottom: "-1rem" }}>
  <Box display="flex" justifyContent="space-between">
    <Box margin={2} border="none" minWidth={150}>
      <Button
        variant="contained"
        component="label"
        color="button"
        sx={{width:"155px", fontFamily: "aleph", '&:hover': { color: 'white' } }}
      >
        מוצרי המשק
        <AddPhotoAlternateIcon sx={{ marginRight: '5px' }}/>
        <input type="file" label="" hidden />
      </Button>
    </Box>

    <Box margin={2} border="none" minWidth={150}>
      <Button
        variant="contained"
        component="label"
        color="button"
        sx={{ width:"155px",fontFamily: "aleph", '&:hover': { color: 'white' } }}
      >
        תמונות המשק
        <AddPhotoAlternateIcon sx={{ marginRight: '5px' }}/>
        <input type="file" label="" hidden />
      </Button>
    </Box>

    <Box margin={2} border="none" minWidth={150}>
      <Button
        variant="contained"
        component="label"
        color="button"
        sx={{width:"155px", fontFamily: "aleph", '&:hover': { color: 'white' } }}
      >
        הוסף לוגו
        <AddPhotoAlternateIcon sx={{ marginRight: '5px' }}/>
        <input type="file" label="" hidden />
      </Button>
    </Box>
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