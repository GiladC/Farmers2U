import styled from '@emotion/styled'
import { Add, AddPhotoAlternate } from '@mui/icons-material'
import { Avatar, Box, Button, 
    Fab, FormControlLabel, Radio,
    Checkbox, IconButton, 
    Modal, Autocomplete, 
    TextField, Tooltip, Typography, ThemeProvider, createTheme 
} from '@mui/material'
import { DatePicker, LocalizationProvider, 
    TimeField } from '@mui/x-date-pickers'
    import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useState, useRef, useEffect } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import products from "../../assets/lists"



const StyledModal = styled(Modal)({
  direction: 'rtl',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const UserBox = styled(Box)({
  direction: 'rtl',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  marginBottom: '10px'
})

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const {palette} = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const themeForButton = createTheme({
  palette: {
    button: createColor('#E8AA42'),
  },
});


const AddPost = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(dayjs().startOf('day'));
  const [value2, setValue2] = useState(dayjs('2022-04-17T15:30'));
  const [value3, setValue3] = useState(dayjs('2022-04-17T15:30'));
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [pfpAndName, setPfpAndName] = useState({
    profilePicture: null,
    profileName: null,
  })
  const [postData, setPostData] = useState({
    isOrganic: false,
    isVegan: false,
  });  
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);
  const storedEmail = localStorage.getItem('email');
  const [coordintes,setCoordinates] = useState({
    lat: null,
    lng: null
  })
  const [address, setAddress] = useState("")


const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value)
  };


    const handleProductChange = (event, value) => {
    setSelectedProducts(value);
  };


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'isOrganic' || name === 'isVegan') {
      const { checked } = event.target;
      const updatedValue = checked;
      setPostData({
        ...postData,
        [name]: updatedValue,
      })
    }
    else {
      setPostData({
        ...postData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    const mail = new FormData();
    mail.append('email', storedEmail)
    axios
      .post('http://127.0.0.1:5000/api/small_data', mail)
      .then((response) => {
        setPfpAndName(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const handlePost = () => { /* The actual object to extract to the backend */
    const formData = new FormData();
    formData.append('text', postData.text);
    formData.append('location', address);
    formData.append('date', value.format('YYYY-MM-DD'));
    formData.append('startTime', value2.format('HH:mm'));
    formData.append('endTime', value3.format('HH:mm'));
    formData.append('image', image);
    formData.append('email', storedEmail);
    formData.append('isVegan', postData.isVegan);
    formData.append('isOrganic', postData.isOrganic);

    if (selectedProducts && selectedProducts.length > 0) {
      const products = selectedProducts.map((p) => p.label);
      formData.append('products', products);
    }    



    const handleRequest = () => {
      axios
        .post("http://127.0.0.1:5000/api/posts", formData)
        .then((response) => {
            console.log(response.data)
            window.location.reload()
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.error) {
            const errorMessage = error.response.data.error;
            window.alert(errorMessage);
          } else {
            console.error(error);
          }
        })
    }
    handleRequest()
  }


  return (
    <div>
      <ThemeProvider theme={themeForButton}>
      <Tooltip onClick={() => setOpen(true)} title="פרסום מודעה" 
      sx={{ position: 'fixed', bottom: 20, left: 40 }}>
        <Fab color="button" aria-label="add">
          <Add />
        </Fab>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={400} height={530} bgcolor="white" p={3} borderRadius={1} 
        sx={{ direction: 'ltr', overflowY: 'scroll' }}>
          <Typography variant="h6" color="gray" textAlign="center">
            ערכו מודעה
          </Typography>
          <UserBox>
            <Avatar src={pfpAndName.profilePicture} sx={{ width: 30, height: 30 }} />
            <Typography fontWeight={500} variant="span">
              {pfpAndName.profileName}
            </Typography>
          </UserBox>
          <TextField
            sx={{ width: '100%', direction: 'rtl' }}
            id="standard-multiline-static"
            multiline
            rows={4}
            placeholder="מה תרצו לפרסם?"
            variant="standard"
            name="text"
            value={postData.text || ''}
            onChange={handleChange}
          />
        <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Typography sx={{fontSize: '15px', color: 'rgb(141, 141, 138)',display: 'flex', justifyContent: 'center'}}>
               {'זוהי הכתובת ממנה המרחק מחושב'}
                </Typography>
            <TextField
              {...getInputProps({
                placeholder:'כתובת',
                className: 'location-search-input',
                direction: 'rtl'
              })}
              sx={{
                direction: 'rtl',
                alignSelf:'center',
                width: '100%',
                position: 'relative',
                paddingTop: '5px',
                fontSize: '16px',}}
            />
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display="flex" paddingTop={2} justifyContent="center">
              <DatePicker label={'תאריך '} views={['day']} 
              value={value} onChange={(newValue) => setValue(newValue)} sx={{"& label":{left: "unset",
              right: "1.75rem",
              transformOrigin: "right"},
              "& legend": {
                textAlign: "right",
              }}} />
            </Box>
            <Box display="flex" gap={2} paddingTop={2}>
              <TimeField label="שעת התחלה" format="HH:mm" value={value2} 
              onChange={(newValue) => setValue2(newValue)} sx={{"& label":{left: "unset",
              right: "1.75rem",
              transformOrigin: "right"},
              "& legend": {
                textAlign: "right",
              }}}/>
              <TimeField label="שעת סיום" format="HH:mm" value={value3} 
              onChange={(newValue) => setValue3(newValue)} sx={{"& label":{left: "unset",
              right: "1.75rem",
              transformOrigin: "right"},
              "& legend": {
                textAlign: "right",
              }}}/>
            </Box>
          </LocalizationProvider>
          <Box display="flex" gap={3} paddingTop={2} sx={{ direction: 'rtl' }} justifyContent="center">
          <Autocomplete
            multiple
            id="areas-autocomplete"
            options={products}
            disableCloseOnSelect
            getOptionLabel={(option) => option.label}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  dir="rtl"
                  checked={selected}
                  />
                {option.label}
                </li>
            )}
            style={{ width: 239 }}
            value={selectedProducts}
            onChange={handleProductChange}
            renderInput={(params) => (
              <TextField
              {...params}
              placeholder="סוגי מוצרים"
              helperText="המוצרים הרלוונטיים למודעה"
              dir="rtl"
              />
              )}
              />
          </Box>
          <Box display="flex" sx={{ direction: 'rtl', justifyContent: 'center', right: '500px' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={postData.isVegan}
                  onChange={handleChange}
                  name="isVegan"
                  sx={{ transform: 'scale(1.3)' }}
                />
              }
              label={<Typography sx={{ fontSize: '1.1rem' }}>טבעוני?</Typography>}
              sx={{ marginLeft: '1.4rem' }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={postData.isOrganic}
                  onChange={handleChange}
                  name="isOrganic"
                  sx={{ transform: 'scale(1.3)' }}
                />
              }
              label={<Typography sx={{ fontSize: '1.1rem' }}>אורגני?</Typography>}
              sx={{ marginRight: '1.4rem' }}
            />
          </Box>
          <Box display="flex" paddingTop={2} gap={15} sx={{ direction: 'rtl' }}>
            <input type="file" 
            onChange={handleImageChange}
            style={{display: 'none'}}
            ref={inputRef} />
            <IconButton aria-label="העלה תמונה" color="primary"
            onClick={() => inputRef.current.click()}>
              <AddPhotoAlternate />
            </IconButton>
            <Button variant="contained" 
            sx={{ direction: 'rtl' }} onClick={handlePost}>
              פרסמו
            </Button>
          </Box>
        </Box>
      </StyledModal>
      </ThemeProvider>
    </div>
  )
}

export default AddPost


