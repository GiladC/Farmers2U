import { Email, Facebook, FormatQuote, Home, Instagram, Language, Phone, WhatsApp } from '@mui/icons-material'
import { Box, Container, IconButton, Modal, Stack, styled, Typography } from '@mui/material'
import React from 'react'

import Price from '../../components/prices/prices'
import Shipping from '../../components/shipping/shipping'
import Slider from '../../Pages/ShowFarmerProfile/ImageSlider'



import Work from '../days/work'
import dayjs from 'dayjs'
import UserPosts from '../../Pages/Settings/userPosts'

import './newBusinessCard.css'

const StyledModal = styled(Modal)({
    direction: 'rtl',
    display: 'block',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginRight: '13em',
    marginTop: '7em'
})


export default function NewBusinessCard({ image, business, open, close }) {
    function addZero(val) {
        const ret = val < 10 ? "0" + val : val;
        return ret;
    }

    function hoursFormat(start, end) {
        if (start === "none" || end === "none ") {
            return "סגור";
        }
        else {
            return addZero(dayjs(end).hour()) + ":" + addZero(dayjs(end).minute()) + " - " + addZero(dayjs(start).hour()) + ":" + addZero(dayjs(start).minute())
        }
    }
    const sunday = hoursFormat(business.opening_hours[0], business.closing_hours[0])
    const monday = hoursFormat(business.opening_hours[1], business.closing_hours[1])
    const tuesday = hoursFormat(business.opening_hours[2], business.closing_hours[2])
    const wednesday = hoursFormat(business.opening_hours[3], business.closing_hours[3])
    const thursday = hoursFormat(business.opening_hours[4], business.closing_hours[4])
    const friday = hoursFormat(business.opening_hours[5], business.closing_hours[5])
    const saturday = hoursFormat(business.opening_hours[6], business.closing_hours[6])

    const days = {
        sunday: sunday,
        monday: monday,
        tuesday: tuesday,
        wednesday: wednesday,
        thursday: thursday,
        friday: friday,
        saturday: saturday
    }
    return (
        <div>
            <StyledModal
                open={open}
                onClose={close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                display='flex'
            >
                <div className='modalWrapper'>
                    <div className='top'>
                        {/* <div></div> */}
                        <div className='nameAndContact'>
                            <h1 style={{fontFamily: 'secular one'}}>{business.farm_name}</h1>
                            <div>
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    gap={1}>
                                    <Home />
                                    <Typography variants='body1' marginLeft={3}>{business.location}</Typography>
                                </Stack>
                                <Stack
                                    paddingTop={2}
                                    direction='row'
                                    alignItems='center'
                                    gap={1}>
                                    <Phone />
                                    <Typography variants='body1' sx={{ direction: 'ltr' }}>{business.phone}</Typography>
                                </Stack>
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    paddingTop={2}
                                    gap={1}
                                    sx={{ flex: '5' }}>
                                    <Email />
                                    <Typography variants='body1'>{business.mail}</Typography>
                                </Stack>
                                {business.whatsapp?
                                    <>
                                    <Stack
                                        paddingTop={2}
                                        direction='row'
                                        alignItems='center'
                                        gap={0.1}>
                                        <Typography>לפניות ב-Whatsapp:</Typography>
                                        <IconButton onClick={() => window.open("https://wa.me/972" + business.whatsapp , "_blank")}>
                                            <WhatsApp />
                                        </IconButton>
                                        {/* <Typography variants='body1' sx={{ direction: 'ltr' }}>{business.whatsapp}</Typography> */}
                                        {business.farmer_name?<Typography variants='body1'>{business.farmer_name}</Typography> 
                                        : null}
                                    </Stack>
                                    </>
                                : null
                                }
                                {business.about? <Typography sx={{justifySelf: 'center', border: '1px black', paddingTop: 2, whiteSpace: 'pre-line'}}>{business.about}</Typography>
                                : null}
                            </div>
                        </div>
                        <img className='profileImage' src={image} alt="" />
                    </div>
                    <div className='center'>
                        <div className="drawerContainer">
                                    <Work days={days} />
                                    <Price prices={business.products}/>
                                    <Shipping policy={business.delivery_details} />
                        </div>
                        {business.farm_images_list 
                        ? <div className='placeImages'>
                            <Typography variant='h6'>תמונות של המקום:</Typography>
                            <Slider slides={business.farm_images_list} farm={true}/>
                        </div>
                        : null}
                        
                        {business.products_images_list
                        ? <div className='productsImages'>
                            <Typography variant= 'h6'>תמונות של המוצרים:</Typography>
                            <Slider slides={business.products_images_list} farm={false} />
                        </div>
                        : null}
                        
                        <Typography  sx={{fontWeight: '600', fontSize: '30px',textAlign: 'center', color: '#1d3c45'}}>מודעות שפורסמו</Typography>
                        <div className='userPosts' style={{border: '5px solid #1d3c45',
                                direction: 'ltr'}}>
                                <UserPosts email={business.mail} width="100%" height={450}/>
                        </div>
                        <div className="social">
                        {/* {!business.whatsapp ? null :
                            <Stack
                            direction= 'row'
                            alignItems= 'center'
                            gap= {1}>
                                 <IconButton onClick={() => window.open("https://wa.me/972" + business.whatsapp , "_blank")}>
                                    <WhatsApp />
                                 </IconButton>
                            </Stack>
                        } */}
                        {
                            !business.instagram ? null :
                            <Stack
                            direction= 'row'
                            alignItems= 'center'
                            gap= {1}>
                                <IconButton onClick={() => window.open(business.instagram, "_blank")}>
                                    <Instagram />
                                </IconButton>
                                {/* <Typography variants= 'body1'>{business.instagram}</Typography> */}
                            </Stack>
                        }
                        {!business.facebook ? null :
                            <Stack
                            direction= 'row'
                            alignItems= 'center'
                            gap= {1}>
                                <IconButton onClick={() => window.open(business.facebook,"_blank")}>
                                    <Facebook />
                                </IconButton>
                                {/* <Typography variants= 'body1'>{business.facebook}</Typography> */}
                            </Stack>
                        }
                        {!business.farm_site ? null : 
                            <Stack
                            direction= 'row'
                            alignItems= 'center'
                            gap= {1}>
                                <IconButton onClick={() => window.open(business.farm_site,"_blank")}>
                                    <Language />
                                </IconButton>
                                {/* <Typography variants= 'body1'>{business.facebook}</Typography> */}
                        </Stack>
                        }
                    </div>
                    </div>
                </div>
            </StyledModal>
        </div>
    )
}
