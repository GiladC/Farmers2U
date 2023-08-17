import { Box, Button, Checkbox, Container, FormControlLabel, Grid, InputAdornment, InputBase, Menu, MenuItem, Stack, Switch, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './profileSettings.css'
import { Add, AssignmentInd, Facebook, Home, Instagram, Language, Person2, Phone, Remove, WhatsApp } from '@mui/icons-material'
import AddPost from '../../components/Post/AddPost'
import WorkingHours from '../../components/Settings/workingHours'
import axios from 'axios'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import {createTheme, styled} from '@mui/material/styles'
import Slider from '../../Pages/ShowFarmerProfile/ImageSlider'
import dayjs from 'dayjs'
import UserPosts from './userPosts'
import './userPosts.css'
import {ValidateAddress, ValidateFacebook, ValidateInstagram, ValidatePhone, ValidateWebsite, ValidateWhatsapp} from '../../components/validations'

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: '80px',
    height: '28px',
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: "1px",
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: "translateX(51px) !important",
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: '#E8AA42',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: "25px",
      height: "25px",
      margin: "1px"
    },
    '& .MuiSwitch-track': {
      borderRadius: '20px',
      backgroundColor: '#1d3c45',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
      "&:after, &:before": {
        color: "white",
        fontSize: "18px",
        position: "absolute",
        top: "3px"
      },
      '&:after': {
        content: '"כן"',
        left: 8,
      },
      '&:before': {
        content: '"לא"',
        right: 5,
      },
    },
  }));

const {palette} = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });


function CheckboxMenu(props) {
    return (
      <div>
        <Button disableRipple variant="outlined" onClick={props.handleClick}
         style={{
          width: "580px",
          height: "50px",
          border: "1px solid #bdbdbd", 
          overflowX: "scroll", 
          whiteSpace: "nowrap", 
          display: "flex", 
          alignItems: "center", 
         justifyContent: "flex-start", 
        //  background: "#FFFFFF",
         '&:hover': {
          color: 'initial',
          backgroundColor: 'initial !important'
         }, 
         }}>
  
        {Boolean(props.anchorEl) ? <Remove /> : <Add />}
        <Typography style={{ color: '#37474f', fontSize: '15px', fontFamily: 'aleph'}}>
        {props.selectedItems.length > 0 ? 
            <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
              {props.selectedItems.map((item, index) => (
                <div key={index} style={{ backgroundColor: '#f5f5f5', margin: '5px', padding: '5px' }}>
                  {item }
                  <span style={{ cursor: 'pointer', marginRight: '10px' }} onClick={(event) => props.handleRemove(event,item)}>
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
          anchorEl={props.anchorEl}
          keepMounted
          variant='outlined'
          dir="rtl"
          open={Boolean(props.anchorEl)}
          onClose={props.handleClose}
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
        {props.labels.map((label, i) => (
            <Grid item xs={4} key={i}>
            <MenuItem  onClick={(event) => event.stopPropagation()}>
              <FormControlLabel
                control={<Checkbox checked={props.checked[i]} onChange={() => props.handleToggle(i)} color={props.checked[i] ? 'default' : 'default'}/>}
                label={label}
  
              />
            </MenuItem>
            </Grid>
          ))}
              </Grid>
      <div style={{ borderTop: '1px solid #ccc', marginTop: '10px', paddingTop: '10px' }}>
        {props.selectedItems.join(', ')}
      </div>
        </Menu>
      </div>
  
    );
  }

const ProfileSettings = (props) => {

    const [newLogo, setNewlogo] = useState("");
    const [newProductsImages, setNewProductsImages] = useState("");
    const [newFarmImages, setNewFarmImages] = useState("");
    const [farmName, setFarmName] = useState("");
    const [email, setEmail] = useState("");
    const [about, setAbout] = useState("");
    const [whatsApp, setWhatsapp] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [menu,setMenu] = useState("");
    const [coordintes,setCoordinates] = useState({
        lat: 'none',
        lng: 'none'
      })
    
    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value)
        setCoordinates(latLng);
      };
    const [farmer, setFarmer] = useState("");
    const [delivery, setDelivery] = useState('');
    const [shipping_distance, setShippingDist] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [website, setWebsite] = useState("");
    const [isShipping, setIsShipping] = useState(false)
    const [logo, setLogo] = useState("");
    const [farmImages, setFarmImages] = useState([]);
    const [productsImages, setProductsImages] = useState([]);
    const [sundayOpening, setSundayOpening] = useState(null);
    const [sundayClosing, setSundayClosing] = useState(null);
    const [mondayOpening, setMondayOpening] = useState(null);
    const [mondayClosing, setMondayClosing] = useState(null);
    const [tuesdayOpening, setTuesdayOpening] = useState(null);
    const [tuesdayClosing, setTuesdayClosing] = useState(null);
    const [wednesdayOpening, setWednesdayOpening] = useState(null);
    const [wednesdayClosing, setWednesdayClosing] = useState(null);
    const [thursdayOpening, setThursdayOpening] = useState(null);
    const [thursdayClosing, setThursdayClosing] = useState(null);
    const [fridayOpening, setFridayOpening] = useState(null);
    const [fridayClosing, setFridayClosing] = useState(null);
    const [saturdayOpening, setSaturdayOpening] = useState(null);
    const [saturdayClosing, setSaturdayClosing] = useState(null);
    const labels = ["ירקות", "פירות", "גבינות ומוצרי חלב", "ביצים", "דבש", "צמחים", "יינות ושמן זית", "תבלינים", "דגנים"];
    const [anchorEl, setAnchorEl] = useState(null);
    const [checked, setChecked] = useState(
      Array(9).fill(false) // Initial state for 9 checkboxes
    );
    const [selectedItems, setSelectedItems] = useState([]);
    const [validPhone, setValidPhone] = useState(true);
    const [validWhatsapp, setValidWhatsapp] = useState(true);
    const [validWebsite, setValidWebsite] = useState(true);
    const [validFacebook, setValidFacebook] = useState(true);
    const [validInstagram, setValidInstagram] = useState(true);
    const [validAddress, setValidAddress] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);

    const [validSunday, setValidSunday] = useState(true);
    const [validMonday, setValidMonday] = useState(true);
    const [validTuesday, setValidTuesday] = useState(true);
    const [validWednesday, setValidWednesday] = useState(true);
    const [validThursday, setValidThursday] = useState(true);
    const [validFriday, setValidFriday] = useState(true);
    const [validSaturday, setValidSaturday] = useState(true);

    const validDays = validSunday && validMonday && validTuesday && validWednesday && validThursday && validFriday && validSaturday;
    const validForm = validPhone && validWhatsapp && validWebsite && validFacebook && validInstagram && validDays && validAddress;
  
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

    const handleSwitch = (event) => {
        const val = event.target.checked;
        setIsShipping(val);
        if(val === false){
            setShippingDist("");
        }
        
      };
    
    function checkNull(val , alternative, format) {
        if (format === true){
            const ret1 = val != null? val.format() : alternative;
            return(ret1)
        }
        else{
            const ret2 = val != "none"? dayjs(val) : alternative;
            return (ret2);
        }

    }

    function put_hours(open){
        if(open === true){
            const res1 = checkNull(sundayOpening, "none", true) + "," 
            + checkNull(mondayOpening, "none", true) + ","
            + checkNull(tuesdayOpening, "none", true) + ","
            + checkNull(wednesdayOpening, "none", true) + ","
            + checkNull(thursdayOpening, "none", true) + ","
            + checkNull(fridayOpening, "none", true) + ","
            + checkNull(saturdayOpening, "none", true);
            return res1;
        }
        else{
            const res2 = checkNull(sundayClosing, "none", true) + "," 
            + checkNull(mondayClosing, "none", true) + ","
            + checkNull(tuesdayClosing, "none", true) + ","
            + checkNull(wednesdayClosing, "none", true) + ","
            + checkNull(thursdayClosing, "none", true) + ","
            + checkNull(fridayClosing, "none", true) + ","
            + checkNull(saturdayClosing, "none", true);
            return res2;
        }
    }

    useEffect(() => {
        setIsInitialized(false);
        getUsers();
      }, [props.token, props.profileEmail]);
    
      const storedEmail = localStorage.getItem('email');
      const profileEmail = props.token?.profile_email || storedEmail || '';

    
      function getUsers() {
        axios({
          method: 'GET',
          url: `http://127.0.0.1:5000/settings/${profileEmail}`,
          headers: {
            Authorization: 'Bearer ' + props.token,
          },
        })
          .then((response) => {
            console.log(response);
            const res = response.data;
            res.access_token && props.setToken(res.access_token);
            setFarmName(res.farm_name);
            setEmail(profileEmail);
            setAbout(res.about);
            setWhatsapp(res.phone_number_whatsapp);
            setPhone(res.phone_number_official);
            setAddress(res.address);
            setAbout(res.about);
            setFacebook(res.facebook);
            setInstagram(res.instagram);
            setWebsite(res.farm_site);
            setMenu(res.products);
            setIsShipping(parseInt(res.is_shipping));
            setShippingDist(res.shipping_distance);
            setDelivery(res.delivery_details);
            setFarmer(res.farmer_name);
            
            setLogo(res.logo_picture);
            setFarmImages(res.farm_images_list);
            setProductsImages(res.products_images_list);

            
            const open = res.opening_hours.split(",");

            setSundayOpening(checkNull(open[0], null, false));
            setMondayOpening(checkNull(open[1], null, false));
            setTuesdayOpening(checkNull(open[2], null, false));
            setWednesdayOpening(checkNull(open[3], null, false));
            setThursdayOpening(checkNull(open[4], null, false));
            setFridayOpening(checkNull(open[5], null, false));
            setSaturdayOpening(checkNull(open[6], null, false));


            const close = res.closing_hours.split(",");
            setSundayClosing(checkNull(close[0], null, false));
            setMondayClosing(checkNull(close[1], null, false));
            setTuesdayClosing(checkNull(close[2], null, false));
            setWednesdayClosing(checkNull(close[3], null, false));
            setThursdayClosing(checkNull(close[4], null, false));
            setFridayClosing(checkNull(close[5], null, false));
            setSaturdayClosing(checkNull(close[6], null, false));

            const products_list = res.types_of_products.split(',');
            let types = null;
            if(res.types_of_products === ''){
                types = [];
            }
            else{
                types = products_list;
            }
            const indexes = types.map(t => labels.indexOf(t));
            const newArr = Array(9).fill(false).map((a,index) => {
                if(indexes.includes(index)){
                    return true;
                }
                else{
                    return a;
                }
            });

            setChecked(newArr);
            setSelectedItems(types);

            setIsInitialized(true);

          })

          .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
          });
      }

      const handleSave = (data) => {
        data.preventDefault();
        const data_update = new FormData(); 
        data_update.append("jsonData", JSON.stringify({
          //email: "golan@gmail.com",
          email: email,
          //google_name: values.google_name,
          //google_family_name: values.google_family_name,
          //google_profile_picture: values.google_profile_picture,
          shipping_distance: shipping_distance,
          is_shipping: isShipping,
          opening_hours: put_hours(true),
          closing_hours: put_hours(false),
          farm_name: farmName,
          about: about,
          phone_number_official: phone,
          phone_number_whatsapp: whatsApp,
          phone_number_telegram: "0",
          address: address,
          types_of_products: selectedItems.join(),
          farmer_name: farmer,
          delivery_details: delivery,
          products: menu,
          farm_site: website,
          facebook: facebook,
          instagram: instagram

        }))
        if (newLogo){
          //alert(newLogo)
          for (let i = 0; i < newLogo.length; i++) {
            //alert(logo[i])
            console.log(newLogo)
            data_update.append("files[]", newLogo[i]);
            data_update.append("labels[]", "1");
          }
        }
        if (newProductsImages){
          for (let i = 0; i < newProductsImages.length; i++) {
            console.log(newProductsImages)
            data_update.append("files[]", newProductsImages[i]);
            data_update.append("labels[]", "2");
          }
        }
        if (newFarmImages){
          for (let i = 0; i < newFarmImages.length; i++) {
            console.log(newFarmImages)
            data_update.append("files[]", newFarmImages[i]);
            data_update.append("labels[]", "3");
          }
        }
          
          axios.put(`http://127.0.0.1:5000/settings/${profileEmail}`, data_update, {
            headers: {
              Authorization: 'Bearer ' + props.token,
            }
          })
          .then(function (response) {
            //handle success
            console.log(response)
            alert('המשתמש עודכן בהצלחה.'); 
            window.location.href = '/settings'
      })
      .catch(function (response) {
        //handle error
        console.log(response)
        if (response.status === 400) {
            alert("שגיאה");
        }
    });
    }

    const handleChangePhotoLogo = (e) => {
      if (e.target.files.length > 0) {
        const selectedPhotos = e.target.files;

        for (let i = 0; i < selectedPhotos.length; i++) {
          if (!fileValidate(selectedPhotos[i])) {
            e.target.value = null; // Clear the input field
            alert("מותר לצרף תמונות בפורמט PNG, JPEG או JPG בלבד.");
            return;
          }
        }
        setNewlogo(selectedPhotos);
        console.log(selectedPhotos);
      }
    };
    const handleChangeProductsImages = (e) => {
      if (e.target.files.length > 0) {
        const selectedPhotos = e.target.files;
    
        for (let i = 0; i < selectedPhotos.length; i++) {
          if (!fileValidate(selectedPhotos[i])) {
            alert("מותר לצרף תמונות בפורמט PNG, JPEG או JPG בלבד.");
            e.target.value = null; // Clear the input field
            return;
          }
        }
    
        // All selected photos are in the correct format, proceed with setting state
        setNewProductsImages(selectedPhotos);
        console.log(selectedPhotos);
      }
    };
    const handleChangeFarmImages = (e) => {
      if (e.target.files.length > 0) {
        const selectedPhotos = e.target.files;
    
        for (let i = 0; i < selectedPhotos.length; i++) {
          if (!fileValidate(selectedPhotos[i])) {
            alert("מותר לצרף תמונות בפורמט PNG, JPEG או JPG בלבד.");
            e.target.value = null; // Clear the input field
            return;
          }
        }
    
        // All selected photos are in the correct format, proceed with setting state
        setNewFarmImages(selectedPhotos);
        console.log(selectedPhotos);
      }
    };

    const fileValidate = (file) => {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg"
      ) {
        return false;
      }
      return true;
    };

    

  return (
    // <ThemeProvider theme={themeForButton}>
    <Box sx={{
        direction: 'rtl'
    }}>
        <Typography mt={4} fontFamily="aleph" fontWeight="bold" variant='h2' sx={{
        display: 'flex',
        justifyContent: 'center',
        }}>אזור אישי</Typography>
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: '3fr 4fr'
        }}>
            <Container sx={{
                flex: 5,
                width: '100%',
            }}>
                <form>
                <Box gap={3} sx={{display: 'flex'}}>
                <Box gap= {1}  sx={{
                        mt: '2rem', flex: 4
                    }}>
                        <label className='inputLabel'>שם העסק:</label>
                        <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                        alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                            <Box fontSize='2rem' bgcolor= '#1d3c45' padding= '0.5rem 1rem'
                            color='white' display= 'grid' cursor='pointer'>
                                <Person2/>
                            </Box>
                            <TextField
                            InputProps={{ disableUnderline: true }}
                            variant='standard'
                            width= '100%'
                            type='text'
                            value= {farmName}
                            onChange={(event) => {
                                setFarmName(event.target.value);
                            }}
                            className='Form_box_input'
                            />
                        </Box>
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem', flex: 3
                    }}>
                        <label className='inputLabel'>שם איש קשר:</label>
                        <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                        alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                            <Box fontSize='2rem' bgcolor= '#1d3c45' padding= '0.5rem 1rem'
                            color='white' display= 'grid' cursor='pointer'>
                                <AssignmentInd />
                            </Box>
                            <TextField
                            InputProps={{ disableUnderline: true }}
                            variant='standard'
                            width= '100%'
                            type='text'
                            value={farmer}
                            onChange={(event) => {
                                setFarmer(event.target.value);
                            }}
                            className='Form_box_input'
                            />
                        </Box>
                    </Box>
                    </Box>
                    <Box gap={3} sx={{display: 'flex'}}>
                    <Box gap= {1}  sx={{
                        mt: '2rem', flex: 2.5
                    }}>
                        <label className='inputLabel'>טלפון:</label>
                        <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                        alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                            <Box fontSize='2rem' bgcolor= '#1d3c45' padding= '0.5rem 1rem'
                            color='white' display= 'grid' cursor='pointer'>
                                <Phone />
                            </Box>
                            <TextField
                            InputProps={{ disableUnderline: true }}
                            variant='standard'
                            width= '100%'
                            type='text'
                            value={phone}
                            onChange={(event) => {
                                setPhone(event.target.value);
                            }}
                            className='Form_box_input'
                            sx={{direction : 'ltr', paddingLeft: '8%'}}
                            />
                        </Box>
                        <ValidatePhone phone={phone} setValidFlag={setValidPhone}/>
                    </Box>
                    <Box gap= {1}  sx={{
                            mt: '2rem', flex: 2.5
                        }}>
                            <label className='inputLabel'>וואטסאפ:</label>
                            <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                            alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                                <Box fontSize='2rem' bgcolor= '#1d3c45' padding= '0.5rem 1rem'
                                color='white' display= 'grid' cursor='pointer'>
                                    <WhatsApp />
                                </Box>
                                <TextField
                                InputProps={{ disableUnderline: true, style: { textAlign: 'center' } }}
                                type='text'
                                variant='standard'
                                value={whatsApp}
                                onChange={(event) => {
                                    setWhatsapp(event.target.value);
                                }}
                                className='Form_box_input'
                                sx={{paddingLeft: '8%',width:'100%', border: '0', bgcolor: 'transparent', outline:'none', height: '30px', direction: 'ltr'}}
                                />
                            </Box>
                            <ValidateWhatsapp whatsapp={whatsApp} setValidFlag={setValidWhatsapp}/>
                    </Box>
                    </Box>
                    <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
            searchOptions={{
                types: ['address'],
                region: 'il',
                language: 'iw',
              }}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label className='inputLabel'>כתובת/מיקום:</label>
                        <ValidateAddress address={address} setValidFlag={setValidAddress} isInitialized={isInitialized}/>
                        <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                        alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                            <Box fontSize='2rem' bgcolor= '#1d3c45' padding= '0.5rem 1rem'
                            color='white' display= 'grid' cursor='pointer'>
                                <Home/>
                            </Box>
                <InputBase
                inputProps={{disableUnderline:true, ...getInputProps({
                    disableUnderline: true,
                    className: 'underline',
                    direction: 'rtl',
                  })}}
                  variant='standard'
                  width= '100%'
                  type='text'
                  disableUnderline= {true}
                  height= '100%'
                  sx={{
                    direction: 'rtl',
                    WebkitTextUnderlinePosition: 'none',
                    width: '100%',
                    position: 'relative',
                    fontSize: '16px',
                    border: 'none'
                }}
                />
                </Box>
                    </Box>
                <div className="autocomplete-dropdown-container">
                  {loading && <div>טוען...</div>}
                  {suggestions.map((suggestion, index) => {
                    const style = {
                        //position: 'absolute',
                        //zIndex: '1000',
                        width: '90%',
                        color: 'black',
                        backgroundColor: suggestion.active ? "#E8AA42" : "white",
                        cursor: 'pointer',
                        padding: '10px',                      
                      };
                    return ( 
                        <div
                        {...getSuggestionItemProps(suggestion, { style })}
                        key={index}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label className='inputLabel'>ימי ושעות עבודה:</label>
                        <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                        alignItems='center' display= 'flex' flexDirection= 'column' gap='1rem' overflow='hidden'>
                            <WorkingHours day = 'ראשון' setValidFlag = {setValidSunday} opening = {sundayOpening} closing = {sundayClosing} setOpening = {setSundayOpening} setClosing={setSundayClosing}/>
                            <WorkingHours day = 'שני' setValidFlag = {setValidMonday} opening = {mondayOpening} closing = {mondayClosing} setOpening = {setMondayOpening} setClosing={setMondayClosing}/>
                            <WorkingHours day = 'שלישי' setValidFlag = {setValidTuesday} opening = {tuesdayOpening} closing = {tuesdayClosing} setOpening = {setTuesdayOpening} setClosing={setTuesdayClosing}/>
                            <WorkingHours day = 'רביעי' setValidFlag = {setValidWednesday} opening = {wednesdayOpening} closing = {wednesdayClosing} setOpening = {setWednesdayOpening} setClosing={setWednesdayClosing}/>
                            <WorkingHours day = 'חמישי' setValidFlag = {setValidThursday} opening = {thursdayOpening} closing = {thursdayClosing} setOpening = {setThursdayOpening} setClosing={setThursdayClosing}/>
                            <WorkingHours day = 'שישי' setValidFlag = {setValidFriday} opening = {fridayOpening} closing = {fridayClosing} setOpening = {setFridayOpening} setClosing={setFridayClosing}/>
                            <div className="lastHour">
                            <WorkingHours day = 'שבת' setValidFlag = {setValidSaturday} opening = {saturdayOpening} closing = {saturdayClosing} setOpening = {setSaturdayOpening} setClosing={setSaturdayClosing}/>
                            </div>
                        </Box>
                    </Box>
                    <Box  gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label className='inputLabel'>תיאור:</label>
                        <TextField 
                        id="outlined-multiline-static"
                        multiline
                        rows={8}
                        fullwidth
                        width= '100%'
                        value= {about}
                        onChange={(event) => {
                            setAbout(event.target.value);
                        }}
                        sx={{
                            width: '100%'
                        }} />
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label className='inputLabel'>סוגי מוצרים:</label>
                        <CheckboxMenu handleClick={handleClick} anchorEl={anchorEl} selectedItems={selectedItems} handleRemove={handleRemove} handleClose={handleClose} labels={labels} checked={checked} handleToggle={handleToggle}/>
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label className='inputLabel'>מחירון:</label>
                        <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={8}
                        fullwidth
                        width= '100%'
                        value= {menu}
                        onChange={(event) => {
                            setMenu(event.target.value);
                        }}
                        sx={{
                            width: '100%'
                        }} />
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <Stack direction='row' gap={3} alignItems="center" display='flex' justifyContent='center'>
                            <Typography fontSize= '20px' color= 'rgb(23, 23, 91)'>העסק עושה משלוחים?</Typography>
                            <IOSSwitch checked = {isShipping} onChange= {handleSwitch}/>
                        </Stack>
                    </Box>
                    
                    {isShipping? 
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <Box display='flex' justifyContent='center'>
                            <TextField
                            label='טווח משלוחים'
                            type = 'number'
                            sx={{alignSelf:'center',direction: 'ltr', m: 1, width: '12ch', 
                            "& label":{left: "unset",
                            right: "1.75rem",
                            transformOrigin: "right"},
                            "& legend": {
                            textAlign: "right",
                            }}}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">ק"מ</InputAdornment>,
                                inputProps: { min: "0", max: "150", step: "1" }
                            }}
                            value = {shipping_distance}
                            onChange={(event) => {
                                setShippingDist(event.target.value);
                            }}
                            />
                        </Box>
                    </Box>: null}
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label className='inputLabel'>מדיניות משלוחים והזמנות:</label>
                        <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={8}
                        fullwidth
                        width= '100%'
                        value = {delivery}
                        onChange={(event) => {
                            setDelivery(event.target.value);
                        }}
                        sx={{
                            width: '100%',
                        }} />
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label className='inputLabel'>קישור לאתר:</label>
                        <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                        alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                            <Box fontSize='2rem' bgcolor= '#1d3c45' padding= '0.5rem 1rem'
                            color='white' display= 'grid' cursor='pointer'>
                                <Language />
                            </Box>
                            <TextField
                            InputProps={{ disableUnderline: true }}
                            variant='standard'
                            width= '100%'
                            type='text'
                            value={website}
                            onChange={(event) => {
                                setWebsite(event.target.value);
                            }}
                            sx={{direction: 'ltr',  paddingLeft: '4%'}}
                            className='Form_box_input'
                            />
                        </Box>
                        <ValidateWebsite url={website} setValidFlag={setValidWebsite}/>
                    </Box>
                    <Box gap= {1}  sx={{
                            mt: '2rem', flex: 4
                        }}>
                            <label className='inputLabel'>קישור לפייסבוק:</label>
                            <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                            alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                                <Box fontSize='2rem' bgcolor= '#1d3c45' padding= '0.5rem 1rem'
                                color='white' display= 'grid' cursor='pointer'>
                                    <Facebook/>
                                </Box>
                                <TextField
                                InputProps={{ disableUnderline: true }}
                                type='text'
                                variant='standard'
                                value= {facebook}
                                onChange={(event) => {
                                    setFacebook(event.target.value);
                                }}
                                className='Form_box_input'
                                sx={{direction: 'ltr',justifyContent:'center' ,width:'100%', border: '0', bgcolor: 'transparent', outline:'none', height: '30px',  paddingLeft: '4%'}}
                                />
                            </Box>
                            <ValidateFacebook facebook={facebook} setValidFlag={setValidFacebook}/>
                        </Box>
                    <Box gap= {1}  sx={{
                            mt: '2rem', flex: 4
                        }}>
                            <label className='inputLabel'>קישור לאינסטגרם:</label>
                            <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                            alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                                <Box fontSize='2rem' bgcolor= '#1d3c45' padding= '0.5rem 1rem'
                                color='white' display= 'grid' cursor='pointer'>
                                    <Instagram />
                                </Box>
                                <TextField
                                InputProps={{ disableUnderline: true }}
                                type='text'
                                variant='standard'
                                value = {instagram}
                                onChange={(event) => {
                                    setInstagram(event.target.value);
                                }}
                                className='Form_box_input'
                                sx={{direction: 'ltr',justifyContent:'center' ,width:'100%', border: '0', bgcolor: 'transparent', outline:'none', height: '30px',  paddingLeft: '4%'}}
                                />
                            </Box>
                            <ValidateInstagram instagram={instagram} setValidFlag={setValidInstagram}/>
                        </Box>
                    <Box display= 'flex' mt={5} mb={5} justifyContent='center' sx={{color: '#1d3c45'}}>
                    <Button disabled = {!validForm} variant='contained' color= 'success' onClick={handleSave} sx={{justifyContent: 'center'}}>שמירת פרטים</Button>
                    </Box>
                </form>
            </Container>
            <Container>
                <Box gap={10} sx={{display: 'grid',gridTemplate: '1fr', justifyContent: 'center'}}>
                    <Box className='account_box_img' sx={{
                        mt: '2rem',
                        cursor: 'pointer',
                        position: 'relative',
                        textAlign: 'center'
                    }}>
                        <img 
                        src = {logo}
                        width= {150}
                        height= {150}
                        className= 'profileImg'
                        />
                        <Typography  sx={{
                        fontWeight: '700',
                        fontSize: '1.2rem',
                        lineHeight: '0',
                        mt: '10px',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        marginBottom: '10px',
                        alignContent: 'center',
                        color: '#1d3c45',
                        }}>החלפת תמונה</Typography>
                        <Button
                        /*margin={10}*/
                        disableRipple
                        variant="contained"
                        component="label"
                        style={{color: '#1d3c45', backgroundColor: 'transparent'}}
                        //color="addPicture"
                        sx={{   display: 'flex', marginRight: '150px', 
                        justifyContent: 'center',width:"450px",fontFamily: "aleph", boxShadow: 'none !important', '&:hover , &:active, &:focus':{color: 'initial',
                        backgroundColor: 'initial', 
                        boxShadow: 'none !important', opacity: 1,}}}
                      >
                        <input
                          type="file"
                          label =""
                          name="logo_picture"
                          onChange={handleChangePhotoLogo}
                        />
              </Button>
                    </Box>
                    <Box sx={{
                            width: '580px',
                            height: '300px',
                            marginBottom: '80px'
                        }}>
                    <Box display= 'flex' justifyContent='center'>
                    <Typography  sx={{fontWeight: '600', fontSize: '30px',justifySelf: 'center', color: '#1d3c45'}}>תמונות המקום</Typography>
                    </Box>
                    
                    <Slider slides={farmImages} farm={true} />
                    <Button
                    /*margin={10}*/
                    disableRipple
                    variant="contained"
                    component="label"
                    style={{color: '#1d3c45', backgroundColor: 'transparent'}}
                    //color="addPicture"
                    sx={{   display: 'flex', marginRight: '190px', paddingTop: '40px',
                    justifyContent: 'space-between',width:"450px",fontFamily: "aleph", boxShadow: 'none !important', '&:hover , &:active, &:focus':{color: 'initial',
                    backgroundColor: 'initial', 
                    boxShadow: 'none !important', opacity: 1,}}}
                  >
                    <input
                      type="file"
                      label =""
                      name="farm_images"
                      multiple
                      onChange={handleChangeFarmImages}
                    />
                    </Button>
                    </Box>
                    <Box sx={{
                                width: '580px',
                                height: '300px',
                                marginBottom: '80px'
                            }}>
                        <Box display= 'flex' justifyContent='center'>
                        <Typography sx={{fontWeight: '600', fontSize: '30px',justifySelf: 'center', color: '#1d3c45'}}>תמונות מוצרי העסק</Typography>
                        </Box>
                        <Slider slides={productsImages} farm={false} />
                        <Button
                    /*margin={10}*/
                    disableRipple
                    variant="contained"
                    component="label"
                    style={{color: '#1d3c45', backgroundColor: 'transparent'}}
                    //color="addPicture"
                    sx={{   display: 'flex', marginRight: '190px', paddingTop: '40px',
                    justifyContent: 'space-between',width:"450px",fontFamily: "aleph", boxShadow: 'none !important', '&:hover , &:active, &:focus':{color: 'initial',
                    backgroundColor: 'initial', 
                    boxShadow: 'none !important', opacity: 1,}}}
                  >
                    <input
                      type="file"
                      label =""
                      name="product_images"
                      multiple
                      onChange={handleChangeProductsImages}
                    />
                    </Button>
                    </Box>
                    <Box sx={{
                                width: '580px',
                                height: '380px',
                                marginBottom: '80px',
                                marginLeft: '10%',
                            }}>
                                <Box display= 'flex' justifyContent='center'>
                                    <Typography  sx={{fontWeight: '600', fontSize: '30px',justifySelf: 'center', color: '#1d3c45'}}>מודעות שפורסמו</Typography>
                                </Box>
                                <Box sx={{border: '5px solid #1d3c45',
                                direction: 'ltr'}}>
                                    <UserPosts width={580} height={660} email={storedEmail}/>
                                </Box>
                            </Box>
                </Box>
                <Container sx={{paddingTop: '30px', display: 'flex', justsifyContent: 'center'}}>
                           {/* <Typography>מקום לתמונות</Typography>*/}
                </Container>
            </Container>
            <AddPost />
        </Box>
    </Box>
    // </ThemeProvider>
  )
}

export default ProfileSettings;