import React from 'react'
import './post.css'
import {MoreVert} from '@mui/icons-material'
import Rating from './rating.jsx'
import {Users} from '../../DummyData/dummyData'

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
                <span className="postText">{post.desc}</span>
                <div className="details">
                    <div className="location">{post.location}</div>
                    <div className="date">{post.date}</div>
                    <div className="time">שעות: {post.time}</div>
                    <div className="price">{post.price}</div>
                    <div className="time"></div>
                </div>
                <div className="imgWrapper">
                    <img className='postImg' src={post?.photo} alt="" />
                    {/* <img className= 'postImg' src="assets/cucumbers.webp" alt="" /> */}
                </div>
            </div>
            <div className="postBottom">
                <div className="postCommentText"> {post.comment} תגובות</div>
                <div className="postBottomRight">
                    <div className="RatingWrapper"><Rating /></div>
                <span className="score"> ציון ממוצע: {post.avgScore} </span>
                </div>
            </div>
        </div>
    </div>
  )
}
