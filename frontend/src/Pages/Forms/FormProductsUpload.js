import React, { useState, useRef } from 'react'
import { TextField, Button, Box, Typography, Grid, Paper, ThemeProvider, Menu, MenuItem, FormControlLabel, Checkbox, createTheme, FormControl, FormLabel} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from "axios";



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
      console.log(newChecked)
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
          : 'אילו סוגי מוצרים אתם מוכרים?'}
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

function FormProductsUpload({values, handleChange, setFormValue}) {
  const {farm_name, /*email,*/ google_profile_picture, google_name, google_family_name, 
  shipping_distance, is_shipping, opening_hours, closing_hours, logo_picture, products_pictures, types_of_products,
  farm_pictures, phone_number_official, phone_number_whatsapp, phone_number_telegram, about, address,
  farmer_name, delivery_details, products, farm_site, facebook, instagram
  } = values
  const additionalItems = ['אורגני', 'טבעוני'];
  const [image, setImage] = useState(null);
  const [productsImages, setProductsImages] = useState(null);
  const [farmImages, setFarmImages] = useState(null);
  const [responseMsg, setResponseMsg] = useState({
    status: "",
    message: "",
    error: "",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(); 
    data.append("jsonData", JSON.stringify({
      email:"tamirsadovsky@gmail.com",
      google_name: "picture",
      google_profile_picture: "picture",
      shipping_distance: "",
      is_shipping:"",
      opening_hours:"",
      closing_hours:"",
      google_name: "Golan",
      google_family_name: "Farmson",
      farm_name: "משק הגולן",
      logo_picture: "",
      farm_pictures: "",
      products_pictures: "",
      about: "המשק קיים מזה 20 שנה והוא משק משפחתי שעובר מדור לדור. המטרה שלנו היא להביא את הירקות האיכותיים ביותר, במחירים הגונים.",
      phone_number_official: "0",
      phone_number_whatsapp: "0",
      phone_number_telegram: "0",
      address: "בן דרור 17",
      farmer_name: "Golan",
      delivery_details: "משלוחים רק בצפון, החל ממחיר הזמנה של 120 ש\"ח.\n\nניתן לעשות הזמנות מראש ולקחת באיסוף עצמי.",
      products: "מלפפון: 5.9 ש\"ח לק\"ג\n\nעגבניה: 5 ש\"ח לק\"ג\n\nבצל: 6.4 ש\"ח לק\"ג\n\nגזר: 6 ש\"ח לק\"ג\n\nחציל: 7 ש\"ח לק\"ג",
      farm_site: "www.golanfarm.com",
      facebook: "www.facebook/golanfarm.com",
      instagram: "www.instagram/golanfarm.com"

    }))
    for (let i = 0; i < image.length; i++) {
      data.append("files[]", image[i]);
      data.append("labels[]", "1");
    }
    for (let i = 0; i < productsImages.length; i++) {
      data.append("files[]", productsImages[i]);
      data.append("labels[]", "2");
    }
    for (let i = 0; i < farmImages.length; i++) {
      data.append("files[]", farmImages[i]);
      data.append("labels[]", "3");
    }
    console.log(image)
    console.log(productsImages)
    console.log(farmImages)
    
    axios.post("http://127.0.0.1:5000/signup", data)
    .then((response) => {
            console.log(response)
        if (response.status === 201) {
          this.setState({
            responseMsg: {
              status: response.data.status,
              message: response.data.message,
            },
          });
          setTimeout(() => {
            this.setState({
              image: "",
              responseMsg: "",
            });
          }, 100000);
  
          document.querySelector("#imageForm").reset();
        }
            alert("Successfully Uploaded");
    })
    .catch((error) => {
        console.error(error); 
        if (error.response) {
            console.log(error.response)
            if (error.response.status === 401) {
                alert("Invalid credentials");
            }
        }
    });
     
  };
  

  const fileValidate = (file) => {
    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg"
    ) {
      setResponseMsg({
        ...responseMsg,
        error: "",
      });
      return true;
    } else {
      setResponseMsg({
        ...responseMsg,
        error: "File type allowed only jpg, png, jpeg",
      });
      return false;
    }
  };

  const handleChangePhotoLogo = (e) => {
    if (e.target.files.length > 0) {
      const selectedPhoto = e.target.files;
      alert(selectedPhoto[0])
      const labelLogo = "1"
      fileValidate(selectedPhoto);
      setImage(selectedPhoto)
      console.log(selectedPhoto)
      setFormValue("logo_picture", selectedPhoto)
      //alert(image)
      // Log the contents of the images object
      //for (const [key, value] of images.entries()) {
      //  console.log(`${key}: ${value}`);
      //}
    }
  };
  const handleChangePhotoFarm = (e) => {
    if (e.target.files.length > 0) {
      const selectedPhoto = e.target.files;
      const labelLogo = "2"
      fileValidate(selectedPhoto);
      setFarmImages(selectedPhoto)
      console.log(selectedPhoto)
      setFormValue("farm_pictures", selectedPhoto)
      console.log(values)

    }
  };
  const handleChangePhotoProducts = (e) => {
    if (e.target.files.length > 0) {
      const selectedPhoto = e.target.files;
      const labelLogo = "3"
      fileValidate(selectedPhoto);
      setProductsImages(selectedPhoto)
      console.log(selectedPhoto)
      setFormValue("products_pictures", selectedPhoto)
    }
  };

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
<form onSubmit={submitHandler} autoComplete="off" dir="rtl" /*className={classes.root}*/ encType="multipart/form-data">
            
            <Box marginTop={5} bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={142.5} alignItems={"center"} justifyContent={"center"} margin={3} mt={4} padding={20} sx={{border: '1.5px solid #f7f1e5'}}  >
              <Grid container height={278} style={{ marginTop:"-4rem"}} >
                
          <Grid item xs={6} style={{ marginBottom:"-1rem"}}>
              
              <Box margin={2} border="none" Width={1000} style={{ marginBottom:"-1rem"}}>
                <Button
                /*margin={10}*/
                variant="contained"
                component="label"
                color="button"
                sx={{fontFamily: "aleph", '&:hover':{color: 'white'}}}
              >
                לוגו
                <input
                  type="file"
                  label =""
                  name="logo_picture"
                  onChange={handleChangePhotoLogo}
                />
              </Button>
            </Box>
            <Box margin={2} marginTop={2.4}>

            </Box>
          </Grid>
          <Grid item xs={6} style={{ marginBottom:"-1.5rem"}}>
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
                מוצרי המשק
                <input
                  type="file"
                  label =""
                  name = "image"
                  multiple
                  onChange={handleChangePhotoProducts}
                />
              </Button>
            </Box>
            <Box margin={2} marginTop={2.4}>

            </Box>
          </Grid>
          <Grid item xs={6} style={{ marginBottom:"-1rem"}}>
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
                תמונות המשק
                <input
                  type="file"
                  label =""
                  name = "farm_photo"
                  multiple
                  onChange={handleChangePhotoFarm}
                />
              </Button>
            </Box>
            <Box margin={2} marginTop={2.4}>

            </Box>
          </Grid>
            <Grid item xs={6} style={{ marginBottom:"-1rem"}}>
              <Box marginBottom ={2.8}>
                <Button type="submit">  בדיקה</Button> 
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