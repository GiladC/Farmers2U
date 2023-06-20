import { Box, Button, Container, FormControlLabel, InputBase, Stack, Switch, TextField, Typography, colors } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './profileSettings.css'
import { AccessTime, AssignmentInd, Badge, Email, Facebook, Home, Instagram, Language, Person2, Phone, WhatsApp } from '@mui/icons-material'
import farm from '../../assets/Board_images/farm1.jpeg'
import AddPost from '../../components/Post/AddPost'
import WorkingHours from '../../components/Settings/workingHours'
import axios from 'axios'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import {styled} from '@mui/material/styles'
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

const ProfileSettings = (props) => {
    const [profileData, setProfileData] = useState(null);
    const [farmName, setFarmName] = useState("");
    const [email, setEmail] = useState("");
    const [about, setAbout] = useState("");
    const [whatsApp, setWhatsapp] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
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
    const [farmerName, setFarmerName] = useState("");
    const [prices, setPrices] = useState("");
    const [shipping, setShipping] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [website, setWebsite] = useState("");
    const [isShipping, setIsShipping] = useState(false)

    const handleSwitch = (event) => {
        setIsShipping(event.target.checked);
      };
    
      

    useEffect(() => {
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
            setFarmName(res.farmName);
            setEmail(profileEmail);
            setAbout(res.about);
            setWhatsapp(res.phoneNumber1);
            setPhone(res.phoneNumber2);
            setAddress(res.address);
            setAbout(res.about);
            setPrices(res.prices);
            setFacebook(res.facebook);
            setInstagram(res.instagram);
            setWebsite(res.website);
            setProfileData({
              profile_farmName: res.farmName,
              profile_email: res.email,
              profile_about: res.about,
              profile_phoneNumber1: res.phoneNumber1,
              profile_phoneNumber2: res.phoneNumber2,
              profile_address: res.address,
              profile_city: res.city,
              profile_farmerName: res.farmerName,
              profile_prices: res.prices,
              profile_products: res.products,
              profile_facebook: res.facebook,
              profile_instagram: res.instagram,
            });
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
    
        axios({
            method: "PUT",
            url: `http://127.0.0.1:5000/settings/${profileEmail}`,
            headers: {
                Authorization: 'Bearer ' + props.token,
              },
            data:{
            farmName: farmName,
            email: email,
            about: about,
            phoneNumber1: whatsApp,
            phoneNumber2: phone,
            address: address,
            facebook: facebook,
            instagram: instagram,
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

  return (
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
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label className='inputLabel'>שם משתמש:</label>
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
                    <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label className='inputLabel'>כתובת/מיקום:</label>
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
                        color: 'white',
                        backgroundColor: suggestion.active ? "#1d3c45" : "#E8AA42",
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
                            <WorkingHours day = 'ראשון' />
                            <WorkingHours day = 'שני' />
                            <WorkingHours day = 'שלישי' />
                            <WorkingHours day = 'רביעי' />
                            <WorkingHours day = 'חמישי' />
                            <WorkingHours day = 'שישי' />
                            <div className="lastHour">
                                <WorkingHours day = 'שבת' />
                            </div>
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
                            />
                        </Box>
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem', flex: 4
                    }}>
                        <label className='inputLabel'>מייל:</label>
                        <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                        alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                            <Box fontSize='2rem' bgcolor= '#1d3c45' padding= '0.5rem 1rem'
                            color='white' display= 'grid' cursor='pointer'>
                                <Email />
                            </Box>
                            <TextField
                            InputProps={{ disableUnderline: true }}
                            variant='standard'
                            width= '100%'
                            type='text'
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
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
                            <label className='inputLabel'>וואטסאפ:</label>
                            <Box width= '100%' border='2px solid #1d3c45' borderRadius='1rem'
                            alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                                <Box fontSize='2rem' bgcolor= '#1d3c45' padding= '0.5rem 1rem'
                                color='white' display= 'grid' cursor='pointer'>
                                    <WhatsApp />
                                </Box>
                                <TextField
                                InputProps={{ disableUnderline: true }}
                                type='text'
                                variant='standard'
                                value={whatsApp}
                                onChange={(event) => {
                                    setWhatsapp(event.target.value);
                                }}
                                className='Form_box_input'
                                sx={{justifyContent:'center' ,width:'100%', border: '0', bgcolor: 'transparent', outline:'none', height: '30px'}}
                                />
                            </Box>
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem', flex: 4
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
                            value={contactPerson}
                            onChange={(event) => {
                                setContactPerson(event.target.value);
                            }}
                            className='Form_box_input'
                            />
                        </Box>
                    </Box>
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label className='inputLabel'>אתר:</label>
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
                            defaultValue=''
                            value={website}
                            onChange={(event) => {
                                setWebsite(event.target.value);
                            }}
                            className='Form_box_input'
                            />
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
                        <label className='inputLabel'>מחירון:</label>
                        <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={8}
                        fullwidth
                        width= '100%'
                        value= {prices}
                        onChange={(event) => {
                            setPrices(event.target.value);
                        }}
                        sx={{
                            width: '100%'
                        }} />
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <Stack direction='row' gap={5} alignItems="center" display='flex' justifyContent='center'>
                            <Typography fontSize= '20px' color= 'rgb(23, 23, 91)'>העסק עושה משלוחים?</Typography>
                            <IOSSwitch checked = {isShipping} onChange= {handleSwitch}/>
                        </Stack>
                    </Box>
                    {isShipping? <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label className='inputLabel'>מדיניות משלוחים:</label>
                        <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={8}
                        fullwidth
                        width= '100%'
                        defaultValue= 'משלוחים רק בצפון, החל ממחיר הזמנה של 120 ש"ח.
ניתן לעשות הזמנות מראש ולקחת באיסוף עצמי.'
                        sx={{
                            width: '100%'
                        }} />
                    </Box>: null}
                    <Box gap={3} sx={{display: 'flex'}}>
                        <Box gap= {1}  sx={{
                            mt: '2rem', flex: 4
                        }}>
                            <label className='inputLabel'>אינסטגרם:</label>
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
                                sx={{justifyContent:'center' ,width:'100%', border: '0', bgcolor: 'transparent', outline:'none', height: '30px'}}
                                />
                            </Box>
                        </Box>
                        <Box gap= {1}  sx={{
                            mt: '2rem', flex: 4
                        }}>
                            <label className='inputLabel'>פייסבוק:</label>
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
                                sx={{justifyContent:'center' ,width:'100%', border: '0', bgcolor: 'transparent', outline:'none', height: '30px'}}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box display= 'flex' mt={5} mb={5} justifyContent='center' sx={{color: '#1d3c45'}}>
                    <Button variant='contained' color= 'success' onClick={handleSave} sx={{justifyContent: 'center'}}>שמירת פרטים</Button>
                    </Box>
                </form>
            </Container>
            <Container>
                <Box gap={10} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Box className='account_box_img' sx={{
                        mt: '2rem',
                        cursor: 'pointer',
                        position: 'relative',
                        textAlign: 'center'
                    }}>
                        <img 
                        src = {farm}
                        width= {150}
                        height= {150}
                        className= 'profileImg'
                        />
                        <Typography className='account_box_img_para' sx={{
                        fontWeight: '700',
                        fontSize: '1.2rem',
                        lineHeight: '0',
                        mt: '10px',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        alignContent: 'center'
                        }}>החלפת תמונה</Typography>
                    </Box>
                    <Box className='account_box_img' sx={{
                        mt: '2rem',
                        cursor: 'pointer',
                        position: 'relative',
                        textAlign: 'center'
                    }}>
                        <img 
                        src = {farm}
                        width= {150}
                        height= {150}
                        className='profileImg'
                        />
                        <Typography className='account_box_img_para' sx={{
                        fontWeight: '700',
                        fontSize: '1.2rem',
                        lineHeight: '0',
                        mt: '10px',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        alignContent: 'center'
                        }}>החלפת לוגו</Typography>
                    </Box>
                </Box>
                <Container sx={{paddingTop: '30px', display: 'flex', justifyContent: 'center'}}>
                           {/* <Typography>מקום לתמונות</Typography>*/}
                </Container>
            </Container>
            <AddPost />
        </Box>
    </Box>
  )
}

export default ProfileSettings;