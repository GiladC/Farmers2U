import React from 'react'
import './post.css'
import {MoreVert} from '@mui/icons-material'
import {Users} from '../../DummyData/dummyData'
import { Box, Typography } from '@mui/material'

export default function Post({post}) {
  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <a href='farmerProfile'>
                        <img className= 'postProfileImg' src={Users.filter((u)=>u.id === post.userId)[0].profilePicture} alt="" />
                    </a>
                    <a href='farmerProfile'>
                        <span className="postUserName">{Users.filter((u)=>u.id === post.userId)[0].userName}</span>
                    </a>
                    <span className="postDate">{post.posted}</span> 
                </div>
                <div className="postTopRight">
                    <MoreVert /> 
                </div>
            </div>
            <div className="postCenter">
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                }}>
                    <Typography sx={{
                        align: 'right'
                    }}>{post.desc}</Typography>
                </Box>
                {/* <span className="postText">{post.desc}</span> */}
                <div className="details">
                    <Box sx={{
                        flex: 4,
                        background: '#f2fa07',
                        width: 50,
                        height: 50,
                        textAlign: 'center',
                    }}>
                        <Typography>מיקום:</Typography> 
                        <Typography>{post.location}</Typography>
                    </Box>
                    <Box sx={{
                        flex: 4,
                        background: '#f2fa07',
                        mr: '15px',
                        width: 50,
                        height: 50,
                        textAlign: 'center'
                    }}>
                       <Typography>תאריכים:</Typography> 
                       <Typography>{post.date}</Typography>
                    </Box>
                    <Box sx={{
                        flex: 4,
                        background: '#f2fa07',
                        mr: '15px',
                        width: 50,
                        height: 50,
                        textAlign: 'center'
                    }}>
                        <Typography>שעות:</Typography>
                        <Typography>{post.time}</Typography>
                    </Box>
                    <Box sx={{
                        flex: 4,
                        background: '#f2fa07',
                        mr: '15px',
                        width: 50,
                        height: 50,
                        textAlign: 'center'
                    }}>
                        <Typography>טווח מחירים:</Typography>
                        <Typography>{post.price}</Typography> 
                    </Box>
                    {/* <div className="location">{post.location}</div> */}
                    {/* <div className="date">{post.date}</div>
                    <div className="time">שעות: {post.time}</div>
                    <div className="price">{post.price}</div> */}
                </div>
                <div className="imgWrapper">
                    <img className='postImg' src={post?.photo} alt="" />
                    {/* <img className= 'postImg' src="assets/cucumbers.webp" alt="" /> */}
                </div>
            </div>
            <div className="postBottom">
                <div className="postCommentText"> {post.comment} תגובות</div>
                <div className="postBottomRight">
                    {/* <div className="RatingWrapper"><Rating /></div>
                    <span className="score"> ציון ממוצע: {post.avgScore} </span> */}
                </div>
            </div>
        </div>
    </div>
  )
}
