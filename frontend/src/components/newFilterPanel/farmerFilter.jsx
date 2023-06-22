import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import { useState } from 'react';
import { Autocomplete, Box, Button, Checkbox, Container, Slider, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const shipping_policy = [
    {
      id: 1,
      label: 'משלוחים'
    },
    {
      id: 2,
      label: 'איסוף עצמי'
    },
  ]

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 50,
      label: '50',
    },
    {
      value: 100,
      label: '100',
    },
    {
      value: 150,
      label: '150',
    },
  ];


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cpath fill="currentColor" d="M3 4a2 2 0 0 0-2 2v11h2a3 3 0 0 0 3 3a3 3 0 0 0 3-3h6a3 3 0 0 0 3 3a3 3 0 0 0 3-3h2v-5l-3-4h-3V4m-7 2l4 4l-4 4v-3H4V9h6m7 .5h2.5l1.97 2.5H17M6 15.5A1.5 1.5 0 0 1 7.5 17A1.5 1.5 0 0 1 6 18.5A1.5 1.5 0 0 1 4.5 17A1.5 1.5 0 0 1 6 15.5m12 0a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5Z"%2F%3E%3C%2Fsvg%3E')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#E8AA42' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#E8AA42',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cpath fill="currentColor" fill-rule="evenodd" d="M9 8a3 3 0 1 1 6 0H9ZM7 8a5 5 0 0 1 10 0h3a1 1 0 0 1 .996 1.09l-.835 9.182A3 3 0 0 1 17.174 21H6.826a3 3 0 0 1-2.987-2.728L3.004 9.09A1 1 0 0 1 4 8h3Z" clip-rule="evenodd"%2F%3E%3C%2Fsvg%3E')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const PrettoSlider = styled(Slider)({
    width:'90%',
    alignSelf:'center',
    color: '#E8AA42',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#E8AA42',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });

const products = [
    {
      id: 1,
      label: 'ירקות'
    },
    {
      id: 2,
      label: 'פירות'
    },
    {
      id: 3,
      label: 'גבינות ומוצרי חלב'
    },
    {
      id: 4,
      label: 'ביצים'
    },
    {
      id: 5,
      label: 'דבש'
    },
    {
      id: 6,
      label: 'צמחים'
    },
    {
      id: 7,
      label: 'יינות ושמן זית'
    },
    {
      id: 8,
      label: 'תבלינים'
    },
    {
      id: 9,
      label: 'דגנים'
    },
  ]
  
  const special = [
    {
      id: 1,
      label: 'אורגני'
    },
    {
      id: 2,
      label: 'טבעוני'
    },
  ]
  
  const extraSpecial = [
    {
      id: 2,
      label: 'דבש טהור'
    },
    {
      id: 3,
      label: 'ביצי חופש'
    },
    {
      id: 4,
      label: 'גידול מקומי'
    },
  ]
  
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const FarmerFilter = () => {
    const [address, setAddress] = React.useState("")

    const [coordintes,setCoordinates] = useState({
        lat: null,
        lng: null
      })
    
    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value)
        // setFormValue("address",value)
        setCoordinates(latLng);
      };

    const [isShipping, setIsShipping] = useState(true)

    const handleSwitch = (event) => {
        setIsShipping(event.target.checked);
      };

    const [distance, setDistance] = useState(5)
    const handleDistanceChange = (event, newValue) => {
        setDistance(newValue);
      };

    const [categories, setCategories] = useState([])
    
    const [organic, setOrganic] = useState(false)
    const handleOrganic = (event) => {
        setOrganic(event.target.checked);};
    
    const [vegan, setVegan] = useState(false)
    const handleVegan = (event) => {
        setVegan(event.target.checked);};
    
    return (
      <div style={{paddingLeft:'8px'}}>
        <FormGroup display='flex' justifyContent='center' sx={{display: 'flex', flexDirection:'column', justifyContent:'center'}}>
            <Typography sx={{ fontSize: '20px', color: '#1d3c45', display: 'flex', justifyContent: 'center'}}>אפשרויות צריכה</Typography>
        <Stack direction="row" spacing={1} alignItems="center" display='flex' justifyContent='center'>
            <Typography>משלוחים</Typography>
            <MaterialUISwitch sx={{ m: 1 }} checked = {isShipping} onChange= {handleSwitch}/>
            <Typography>איסוף עצמי</Typography>
        </Stack>
        {/* נקודת מוצא */}
        <Typography sx={{paddingTop: '5%', fontSize: '20px', color: '#1d3c45', display: 'flex', justifyContent: 'center'}}>
            {isShipping? 'יעד המשלוח' : ' מיקום נוכחי'}
        </Typography>
        <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Typography sx={{fontSize: '15px', color: 'rgb(141, 141, 138)',display: 'flex', justifyContent: 'center'}}>
               {isShipping?' זוהי הכתובת אליה תרצה שיגיע המשלוח' : ' זוהי הכתובת ממנה תרצה להגיע לבית העסק'}
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
        {/* מרחק מבית העסק בק"מ*/}
        {isShipping ? null :
        <Stack>
             <Typography sx={{ fontSize: '20px', color: '#1d3c45', display: 'flex', justifyContent: 'center', paddingTop: '5%'}}>מרחק מבית העסק (בק"מ)</Typography>
             <PrettoSlider
        aria-label="distance"
        defaultValue={5}
        value = {distance}
        onChange={handleDistanceChange}
        // getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={5}
        marks = {marks}
        min={0}
        max={150}
      />
             </Stack>}
        {/* מוצרים */}
        <Typography sx={{ fontSize: '20px', color: '#1d3c45', display: 'flex', justifyContent: 'center', paddingTop: '5%'}}>סינון לפי מוצרי העסק</Typography>
        <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      value={categories}
      onChange={(event, newValue) => {
        setCategories([
          ...newValue
        ]);
      }}
      options={products}
      disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      renderOption={(props, option, { selected }) => (
        <li {...props} style={{direction: 'rtl', backgroundColor:'#E8AA42', color: 'white', fontSize: '18px'}}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            sx={{direction: 'rtl'}}
          />
          {option.label}
        </li>
      )}
      style={{ width: '100%' }}
      renderInput={(params) => (
        <TextField {...params} placeholder="סוגי מוצרים"  direction= 'rtl'/>
      )}
      sx={{paddingTop:'0%'}}
    />
        {/* אורגני,טבעוני */}
        <Container sx={{display:'flex', mt:'0px', justifyContent:'center'}}>
                <FormControlLabel control={<Checkbox checked={organic} onChange={handleOrganic} sx={{'&.Mui-checked':{color: "#E8AA42"}}} />} label={<Typography 
                  sx={{fontSize: '1rem'}}>אורגני</Typography>}
                  sx={{
                    width:'100%',
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft:0,
                    direction: 'rtl'
                }} />
                <FormControlLabel control={<Checkbox checked={vegan} onChange={handleVegan} sx={{'&.Mui-checked':{color: "#E8AA42"}}} />} label={<Typography 
                  sx={{fontSize: '1rem'}}>טבעוני</Typography>}
                  sx={{
                    width:'100%',
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft:0,
                    direction: 'rtl'
                }} />
        </Container>
        </FormGroup>
        <Box display= 'flex' justifyContent='center' paddingBottom= '5px' paddingTop= '5%'>
            <Button sx={{backgroundColor: '#E8AA42', color: 'black',
            ":hover": {
            bgcolor: "#1d3c45",
            color: "white"
            }, display: 'flex', alignSelf: 'center'
            }}>הפעל סינון</Button>
        </Box>
        
      </div>
    )
  }
  
  export default FarmerFilter