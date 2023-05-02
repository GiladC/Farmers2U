import styled from '@emotion/styled'
import { AccessTime, Add, AddLocation, AddPhotoAlternate, AttachFile, DateRange, EmojiEmotions, LocalOffer, VideoLibrary } from '@mui/icons-material'
import { Avatar, Box, Button, ButtonGroup, Fab, Modal, Stack, TextField, Tooltip, Typography } from '@mui/material'
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
            <Box width={400} height={280} bgcolor="white" p={3} borderRadius={5}>
                <Typography variant='h6' color='gray' textAlign='center'>ערוך מודעה</Typography>
                <UserBox>
                    <Avatar
                        src='/Board_images/farmer1.jpg'
                        sx={{width: 30, height: 30}}
                    />
                    <Typography fontWeight={500} variant='span'>דוד כהן</Typography>
                </UserBox>
                <TextField
                    sx={{width:'100%'}}
                    id="standard-multiline-static"
                    multiline
                    rows={3}
                    placeholder="מה תרצה לפרסם?"
                    variant="standard"
                />
                <Stack direction='row' gap={1} mt={2} nb={3}>
                    <EmojiEmotions color='secondary'/>
                    <AddPhotoAlternate color='primary'/>
                    <VideoLibrary color='success'/>
                    <AttachFile color='black'/>
                </Stack>
                <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
                    <Button><AddLocation/></Button>
                    <Button><DateRange/></Button>
                    <Button><AccessTime/></Button>
                    <Button><LocalOffer/></Button>
                </ButtonGroup>
                <Button>פרסם</Button>

            </Box>
        </StyledModal>
    </div>
  )
}

export default AddPost