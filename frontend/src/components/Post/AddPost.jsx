import styled from '@emotion/styled'
import { AccessTime, Add, AddLocation, AddPhotoAlternate, AttachFile, DateRange, EmojiEmotions, LocalOffer, VideoLibrary } from '@mui/icons-material'
import { Avatar, Box, Button, ButtonGroup, Fab, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput, Radio, RadioGroup, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider, TimeField, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import React, { useState } from 'react'

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

const AddPost = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));
  const [value2, setValue2] = React.useState(dayjs('2022-04-17T15:30'));
  const inputProps = {
    step: 0.01,
    min: 0
  };
  return (
    <div>
        <Tooltip onClick={e=>setOpen(true)} title="פרסום מודעה" sx={{position: "fixed", bottom: 20, left: 40}}>
            <Fab color="primary" aria-label="add">
                <Add />
            </Fab>
        </Tooltip>
        <StyledModal
        open={open}
        onClose={e=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box width={400} height={480} bgcolor="white" p={3} borderRadius={1} sx={{direction: 'ltr', overflowY: 'scroll'}}>
                <Typography variant='h6' color='gray' textAlign='center'>ערוך מודעה</Typography>
                <UserBox>
                    <Avatar
                        src='/Board_images/farmer1.jpg'
                        sx={{width: 30, height: 30}}
                    />
                    <Typography fontWeight={500} variant='span'>דוד כהן</Typography>
                </UserBox>
                <TextField
                    sx={{width:'100%', direction: 'rtl'}}
                    id="standard-multiline-static"
                    multiline
                    rows={4}
                    placeholder="מה תרצה לפרסם?"
                    variant="standard"
                />
                <TextField placeholder='כתובת/מיקום' sx={{width: '100%', paddingTop: '15px', direction: 'rtl'}}/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box display= 'flex' paddingTop={2} justifyContent= 'center'>
                        <DatePicker label={'תאריך '} views={['day']} sx={{direction: 'ltr'}} />
                    </Box>
                    <Box display= 'flex' gap={2} paddingTop={2}>
                        <TimeField label= 'שעת התחלה' format='HH:mm' 
                        value={value} onChange={(newValue) => setValue(newValue)}/>
                        <TimeField label= 'שעת סיום' format='HH:mm' 
                        value={value} onChange={(newValue) => setValue(newValue)}/>
                    </Box>
                </LocalizationProvider>
                <Box display= 'flex' gap={3} paddingTop={2} sx={{direction: 'rtl'}}>
                    <TextField type='number' inputProps={inputProps} placeholder='מחיר' helperText= 'המחיר הנמוך ביותר בטווח' />
                    <TextField type='number' inputProps={inputProps} placeholder='מחיר' helperText= 'המחיר הגבוה ביותר בטווח' /> 
                </Box>
                <FormLabel id="radio-buttons-group-label" sx={{display: 'flex', justifyContent: 'center'}}>:המחירים הינם</FormLabel>
                <Box display= 'flex' sx={{direction: 'rtl', justifyContent: 'center', right: '500px'}}>
                    <RadioGroup
                            row
                            aria-labelledby="radio-buttons-group-label"
                            defaultValue='בש"ח לק"ג'
                            name="row-radio-buttons-group"
                            sx={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}
                        >
                            <FormControlLabel value='בש"ח' control={<Radio />} label='בש"ח' />
                            <FormControlLabel value='בש"ח לק"ג' control={<Radio />} label='בש"ח לק"ג' />
                    </RadioGroup>
                </Box>
                
                <Box display= 'flex' paddingTop= {2} gap={15} sx={{direction: 'rtl'}}>
                    <IconButton aria-label="העלה תמונה" color='primary'>
                        <AddPhotoAlternate />
                    </IconButton>
                    <Button variant='contained' sx={{direction: 'rtl'}}>פרסם</Button>
                </Box>
                {/* <Stack direction='row' gap={1} mt={2} nb={3}>
                    <EmojiEmotions color='secondary'/>
                    <AddPhotoAlternate color='primary'/>
                    <VideoLibrary color='success'/>
                    <AttachFile color='black'/>
                </Stack> */}
                {/* <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
                    <Button><AddLocation/></Button>
                    <Button><DateRange/></Button>
                    <Button><AccessTime/></Button>
                    <Button><LocalOffer/></Button>
                </ButtonGroup> */}

            </Box>
        </StyledModal>
    </div>
  )
}

export default AddPost