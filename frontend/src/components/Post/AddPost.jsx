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
import React, { useState, useRef } from 'react'


const productsType = [
  { title: 'pab' },
  { title: 'adad' },
  { title: 'cdd' },
  { title: 'aaaaa' }
];

const Areas = [
  { title: 'אשדוד והסביבה', year: 1994 },
  { title: 'גבעת זאב, בית חורון והסביבה', year: 1972 },
  { title: 'הרצליה פיתוח ונוף הים', year: 1974 },
  { title: 'הרצליה רחבי העיר', year: 2008 },
  { title: 'חולון, בת ים', year: 1957 },
  { title: "חיפה וחוף הכרמל", year: 1993 },
  { title: 'חשמונאים מודיעין עילית והסביבה', year: 1994 },
  {
    title: 'יקנעם, טבעון והסביבה',
    year: 2003,
  },
  { title: 'ירושלים והסביבה', year: 1966 },
  {
    title: 'כוכב יאיר,סלעית, גוש חורשים והסביבה',
    year: 2001,
  },
  {
    title: 'עמק חפר, חדרה, פרדס חנה ועד זיכרון יעקב',
    year: 1980,
  },
  { title: 'עפולה, כפר תבור והסביבה', year: 1994 },
  {
    title: 'צפון תל אביב ורמת השרון',
    year: 2002,
  },
  { title: "קריות וצפונה", year: 1975 },
  { title: 'קריית אונו, יהוד, שוהם והסביבה', year: 1990 },
  { title: 'רמת גן, גבעתיים והסביבה', year: 1999 },
  { title: 'ראשון לציון, רחובות והסביבה', year: 1954 },
  {
    title: 'תל אביב מרכז + יפו',
    year: 1977,
  },
  { title: 'תל אביב - צפון ישן', year: 2002 },
  { title: 'אין משלוחים', year: 2002 }
];


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
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [postData, setPostData] = useState({
    isOrganic: false,
    isVegan: false,
  });  
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);
  const storedEmail = localStorage.getItem('email');


    const handleProductChange = (event, value) => {
    setSelectedProducts(value);
  };


  const handleAreaChange = (event, value) => {
    setSelectedAreas(value);
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


  const handlePost = () => { /* The actual object to extract to the backend */
    const formData = new FormData();
    formData.append('text', postData.text);
    formData.append('location', postData.location);
    formData.append('date', value.format('YYYY-MM-DD'));
    formData.append('startTime', value2.format('HH:mm'));
    formData.append('endTime', value3.format('HH:mm'));
    formData.append('lowPrice', postData.lowPrice);
    formData.append('highPrice', postData.highPrice);
    formData.append('image', image);
    formData.append('email', storedEmail);
    formData.append('isVegan', postData.isVegan);
    formData.append('isOrganic', postData.isOrganic);

    if (selectedProducts && selectedProducts.length > 0) {
      const products = selectedProducts.map((p) => p.title);
      formData.append('products', products);
    }    

  
    if (selectedAreas) {
      const area = selectedAreas.title
      formData.append('area', area);
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
            <Avatar src="/Board_images/farmer1.jpg" sx={{ width: 30, height: 30 }} />
            <Typography fontWeight={500} variant="span">
              דוד כהן
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
          <TextField
            placeholder="כתובת/מיקום"
            sx={{ width: '100%', paddingTop: '15px', direction: 'rtl' }}
            name="location"
            value={postData.location || ''}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display="flex" paddingTop={2} justifyContent="center">
              <DatePicker label={'תאריך '} views={['day']} 
              value={value} onChange={(newValue) => setValue(newValue)} />
            </Box>
            <Box display="flex" gap={2} paddingTop={2}>
              <TimeField label="שעת התחלה" format="HH:mm" value={value2} 
              onChange={(newValue) => setValue2(newValue)} />
              <TimeField label="שעת סיום" format="HH:mm" value={value3} 
              onChange={(newValue) => setValue3(newValue)} />
            </Box>
          </LocalizationProvider>
          <Box display="flex" gap={3} paddingTop={2} sx={{ direction: 'rtl' }}>
          <Autocomplete
            multiple
            id="areas-autocomplete"
            options={productsType}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  dir="rtl"
                  style={{ marginRight: 8 }}
                  checked={selected}
                  />
                {option.title}
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
              <Autocomplete
                id="products-autocomplete"
                options={Areas}
                getOptionLabel={(option) => option.title}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Radio
                      {...props}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.title}
                  </li>
                )}
                style={{ width: 239 }}
                value={selectedAreas}
                onChange={handleAreaChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="אזורים"
                    helperText="האזור הרלוונטי למודעה"
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


