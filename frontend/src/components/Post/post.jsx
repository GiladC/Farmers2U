import React, { useState } from 'react'
import './post.css'
import {AccessTime, EventNote, LocalOffer, LocationOn, MoreVert} from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import BusinessCard from './businessCard'

// this is how 'business' should look like in line 28
const dummyBusiness = { 
    name: 'משק הגולן',
    location: 'רמת הגולן' ,
    phone: '0725437433',
    mail: 'golanFarm@gmail.com',
    about: 'המשק קיים מזה 20 שנה והוא משק משפחתי שעובר מדור לדור. המטרה שלנו היא להביא את הירקות האיכותיים ביותר, במחירים הגונים. \
    אנו מגדלים את הירקות שלנו בתנאים הטובים ביותר, על מנת להבטיח לכם את הטוב ביותר. \
    הירקות שלנו גדלים תחת אוויר הרי גולן הפסטורליים, וצוות החקלאים שלנו משתמש בטכנולוגיה החדשנית ביותר בתחום.',
    whatsApp: '0547984551',
    instagram: 'golan_farm20',
    facebook: 'משק הגולן'
};


/* 

Post objects:
{
    farmName: ?,        the name of the farm
    profilePicture: ?,  the profile image
    photo: ?,           the photo to be used in the post, might exist and might not
    desc: ?,            the free text of the post
    posted: ?,          how long ago it was posted
    date: ?,            the date when the event happens
    price: ?,           the price range. Will be deleted
    location: ?,        the location of the specified event
    time: ?,            the time range (in hours) of the event
}
*/

export default function Post({post}) {
    const [open, setOpen] = useState(false)

  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                        <Button onClick={e=>setOpen(true)}>
                            <img className= 'Img' src={post.profilePicture} object-fit = 'cover' alt="" />
                        </Button>
                        <Button onClick={e=>setOpen(true)}>
                            <Typography variant='h5'color={'black'}>{post.farmName}</Typography>
                        </Button>
                        <BusinessCard image={post.profilePicture}
                        business={dummyBusiness} open={open} close={()=>setOpen(false)} />
                    <span className="postDate">{post.posted}</span> 
                </div>
                <div className="postTopRight">
                    <MoreVert /> 
                </div>
            </div>
            <div className="postCenter">
            <div className="details">
                    <Box sx={{
                        flex: 5,
                        background: '#E8AA42',
                        width: 50,
                        height: 55,
                        textAlign: 'center',
                    }}>
                        <Typography><LocationOn /></Typography> 
                        <Typography>{post.location}</Typography>
                    </Box>
                    <Box sx={{
                        flex: 2,
                        background: '#E8AA42',
                        mr: '15px',
                        width: 50,
                        height: 55,
                        textAlign: 'center'
                    }}>
                       <Typography><EventNote /></Typography> 
                       <Typography>{post.date}</Typography>
                    </Box>
                    <Box sx={{
                        flex: 3,
                        background: '#E8AA42',
                        mr: '15px',
                        width: 50,
                        height: 55,
                        textAlign: 'center'
                    }}>
                        <Typography><AccessTime /></Typography>
                        <Typography>{post.time}</Typography>
                    </Box>
                    <Box sx={{
                        flex: 4,
                        background: '#E8AA42',
                        mr: '15px',
                        width: 50,
                        height: 55,
                        textAlign: 'center'
                    }}>
                        <Typography><LocalOffer /></Typography>
                        <Typography>{post.price}</Typography> 
                    </Box>
                </div>
                <Box sx={{
                    mt: '20px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                }}>
                    <Typography sx={{
                        align: 'right'
                    }}>{post.desc}</Typography>
                </Box>
                <div className="imgWrapper">
                <img className='postImg' 
                src={`Board_images/${post?.photo}`} alt="" />
                    
                </div>
            </div>
            <div className="postBottom">
                
                <div className="postBottomRight">
                    
                </div>
            </div>
        </div>
    </div>
  )
}

