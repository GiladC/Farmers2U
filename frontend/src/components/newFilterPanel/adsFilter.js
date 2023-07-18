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
import { Autocomplete, Box, Button, Checkbox, Container, ListItem, Slider, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import axios from 'axios'
import PropTypes from 'prop-types';
import products from "../../assets/lists"





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

  function Tag(props) {
    const { label, onDelete, ...other } = props;
    return (
      <div {...other}>
        <span>{label}</span>
        <Close onClick={onDelete} />
      </div>
    );
  }
  
  Tag.propTypes = {
    label: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  const StyledTag = styled(Tag)(
    ({ theme }) => `
    display: flex;
    color: ${'black'};
    align-items: center;
    height: 24px;
    margin: 2px;
    line-height: 22px;
    background-color: ${
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#E8AA42'
    };
    border: 1.5px solid ${theme.palette.mode === 'dark' ? '#1d3c45' : '#1d3c45'};
    border-radius: 22px;
    box-sizing: content-box;
    padding: 0 4px 0 10px;
    outline: 0;
    overflow: hidden;
  
    &:focus {
      border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
      background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    }
  
    & span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: '#E8AA42';
    }

    & svg {
      font-size: 12px;
      cursor: pointer;
      padding: 4px;
    }
 
  `,
  );

  
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const AdsFilter = ({filteredPosts, setFilteredPosts}) => {
    const [address, setAddress] = React.useState("")
    const [startDate, setStartDate] = useState(dayjs().startOf('day'));
    const defaultEndDate = dayjs('2030-01-01')
    const [endDate, setEndDate] = useState(defaultEndDate);



    const [isRealAddress, setIsRealAddress] = useState(false);
    const [coordinates,setCoordinates] = useState({
      lat: null,
      lng: null
    })    
    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);

        setAddress(value);
        if (latLng && latLng.lat && latLng.lng){
          setIsRealAddress(true);
          setCoordinates(latLng)
        }
        else{
          setIsRealAddress(true);
          //setIsRealAddress(false);
        }
      };

    const [distance, setDistance] = useState(5);
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

        
  const handleFilter = () => { /* The actual object to extract to the backend */
    const formData = new FormData();

    if (categories && categories.length > 0) {
      const products = categories.map((p) => p.label);
      formData.append('products', products);
    }    
    formData.append('isVegan', vegan);
    formData.append('isOrganic', organic);
    formData.append('distance', distance);
    formData.append('startDate', startDate.format('YYYY-MM-DD'));
    formData.append('endDate', endDate.format('YYYY-MM-DD'));
    formData.append('isRealAddress', isRealAddress);
    formData.append('latitude', coordinates.lat);
    formData.append('longitude', coordinates.lng);
    formData.append('address', address)

    


    const handleRequest = () => {
      axios
        .post("http://127.0.0.1:5000/api/filter_posts", formData)
        .then((response) => {
            console.log(response.data)
            setFilteredPosts(response.data)
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
      <div style={{marginRight:"5%", borderLeft: 'solid 0.5px #1d3c45', paddingLeft:'8px', paddingTop: '40px'}}>
        <FormGroup display='flex' justifyContent='center' sx={{display: 'flex', flexDirection:'column', justifyContent:'center'}}>
            <Typography sx={{marginTop:"-8%", fontFamily:'aleph', fontSize: '36px', color: '#1d3c45', display: 'flex', justifyContent: 'center'}}>סינון מתקדם</Typography>
        
       {/* טווח תאריכים */}
        <Typography sx={{fontFamily:'aleph',paddingTop: '5%', fontSize: '20px', color: '#1d3c45', display: 'flex', justifyContent: 'center'}}>
            {'טווח תאריכים'}
        </Typography>
        <Typography sx={{fontFamily:'aleph',fontSize: '13px', color: 'rgb(141, 141, 138)',display: 'flex', justifyContent: 'center'}}>
               {'יוצגו רק המודעות שנמצאות בטווח התאריכים הזה (כולל)'}
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display="flex" paddingTop={2} justifyContent="center">
              <Box style={{width: '50%', marginRight: '19px'}}>
              <DatePicker label={'תאריך סיום'} views={['day']} defaultValue={endDate.toDate()}
              value={endDate} onChange={(newValue) => setEndDate(dayjs(newValue))} /> </Box>
              <Box style={{width: '50%'}}>
              <DatePicker label={'תאריך התחלה'} views={['day']} 
              value={startDate} onChange={(newValue) => setStartDate(newValue)} /> </Box>
            </Box>
            
          </LocalizationProvider>


        {/* נקודת מוצא */}
        <Typography sx={{fontFamily:'aleph',paddingTop: '5%', fontSize: '20px', color: '#1d3c45', display: 'flex', justifyContent: 'center'}}>
            {'מיקום נוכחי'}
        </Typography>
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
            <Typography sx={{fontFamily:'aleph',fontSize: '15px', color: 'rgb(141, 141, 138)',display: 'flex', justifyContent: 'center'}}>
               {'זוהי הכתובת ממנה המרחק יחושב'}
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
                    color: 'black',
                    backgroundColor: suggestion.active ? "#E8AA42" : "white",
                    cursor: 'pointer',
                    padding: '10px',
                    direction: 'rtl'                     
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
        <Stack>
             <Typography sx={{fontFamily:'aleph', fontSize: '20px', color: '#1d3c45', display: 'flex', justifyContent: 'center', paddingTop: '5%'}}>מרחק ממיקום המודעה (בק"מ)</Typography>
             <PrettoSlider
        aria-label="distance"
        defaultValue={5}
        value = {distance}
        onChange={handleDistanceChange}
        // getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}
        marks = {marks}
        min={0}
        max={150}
      />
        </Stack>
        {/* מוצרים */}
        <Typography sx={{fontFamily:'aleph', fontSize: '20px', color: '#1d3c45', display: 'flex', justifyContent: 'center', paddingTop: '5%'}}>סינון לפי מוצרים</Typography>
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
      direction= 'rtl'
      disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      renderOption={(props, option, { selected }) => (
        <ListItem {...props} sx={{direction: 'rtl', fontSize: '18px',
        '&:hover': {backgroundColor: '#E8AA42!important'}, '&&.Mui-selected':{color: '#E8AA42!important'}}}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            sx={{direction: 'rtl', '&.Mui-checked':{color: "black"}}}
          />
          {option.label}
        </ListItem>
      )}
      style={{ width: '100%' }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <StyledTag label={option.label} {...getTagProps({ index })} />
      ))}
      renderInput={(params) => (
        <TextField {...params} placeholder="סוגי מוצרים"  direction= 'rtl'/>
      )}
      sx={{paddingTop:'0%', direction: 'rtl'}}
    />
        {/* אורגני,טבעוני */}
        <Container sx={{display:'flex', mt:'11px', justifyContent:'center'}}>
                <FormControlLabel control={<Checkbox checked={organic} onChange={handleOrganic} sx={{fontFamily:'aleph','&.Mui-checked':{color: "#E8AA42"}}} />} label={<Typography 
                  sx={{fontSize: '1.25rem'}}>אורגני</Typography>}
                  sx={{
                    width:'100%',
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft:5,
                    direction: 'rtl'
                }} />
                <FormControlLabel control={<Checkbox checked={vegan} onChange={handleVegan} sx={{fontFamily:'aleph','&.Mui-checked':{color: "#E8AA42"}}} />} label={<Typography 
                  sx={{fontSize: '1.25rem'}}>טבעוני</Typography>}
                  sx={{
                    width:'100%',
                    display: 'flex',
                    alignItems: 'center',
                    marginRight:8,
                    direction: 'rtl'
                }} />
        </Container>
        </FormGroup>
        <Box display= 'flex' justifyContent='center' paddingBottom= '5px' paddingTop= '5%' gap= {3}>
            <Button /*onClick={handleClear}*/ sx={{fontFamily:'aleph',backgroundColor: '#1d3c45', color: 'white',
                ":hover": {
                bgcolor: "#1d3c45",
                color: "#E8AA42"
                }, 
                display: 'flex', alignSelf: 'center'
                }}>ניקוי
            </Button>
            <Button sx={{fontFamily:'aleph',backgroundColor: '#E8AA42', color: 'black',
            ":hover": {
            bgcolor: "#E8AA42",
            color: "white"
            }, display: 'flex', alignSelf: 'center'
            }} onClick={handleFilter}>הפעלת סינון</Button>
        </Box>
        
      </div>
    )
  }
  
  export default AdsFilter