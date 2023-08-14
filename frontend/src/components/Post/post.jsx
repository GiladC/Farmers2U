import React, { useEffect, useState } from 'react'
import './post.css'
import {AccessTime, EventNote, LocationOn, MoreVert} from '@mui/icons-material'
import { Box, Button, Menu, MenuItem, Typography, Dialog,
    DialogTitle, DialogContent, DialogActions } from '@mui/material'
import BusinessCard from './businessCard'
import axios from 'axios'; 
import EditPostWrapper from '../edit_post/wrapper';



export default function Post({post, token, disabled}) {
    const storedEmail = localStorage.getItem('email');
    const profileEmail = token?.profile_email || storedEmail || '';
    const showMenu = profileEmail === post.email;
    let postEmail = null;
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [ShowDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [openEditPost, setOpenEditPost] = useState(false);


    const logo = post.profilePicture;
    const business = {
        farm_name: post.farmName,
        location: post.farm_address,
        phone: post.phone,
        mail: post.email,
        about: post.about,
        products: post.prices,
        delivery_details: post.delivery_details,
        farm_images_list: post.farm_images_list,
        products_images_list: post.products_images_list,
        whatsapp: post.whatsapp,
        instagram: post.instagram,
        facebook: post.facebook,
        farm_site: post.farm_site,
        opening_hours: post.opening_hours,
        closing_hours: post.closing_hours
    }

    const handleMoreClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(post.desc)
    };

    const handleMoreClose = () => {
        setAnchorEl(null);
    }

    const handleDeleteConfirmation = () => {
        setShowDeleteConfirmation(true);
        setAnchorEl(null);
    }

    const handleDeleteCancel = () => {
        setShowDeleteConfirmation(false);
    }

    const handleOpenEditMode = () => {
        setAnchorEl(null);
        setOpenEditPost(true);
    }



    const handleDeleteConfirm = () => {
        const id = new FormData();
        id.append('postId', post.id);
        axios
          .post('http://127.0.0.1:5000/api/delete_post', id)
          .then((response) => {
            console.log('Post deleted successfully');
            window.location.reload();
          })
          .catch((error) => {
            console.error('Error deleting post:', error);
            window.location.reload();
          });    
    };

  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                        <Button disabled = {disabled? true : false} onClick={e=>setOpen(true)}>
                            <img className= 'Img' src = {'/Form_images/Logo_image/'.concat(logo)}  alt="" />
                        </Button>
                        <Button disabled = {disabled? true : false} onClick={e=>setOpen(true)}>
                            <Typography variant='h5'color={'black'}>{post.farmName}</Typography>
                        </Button>
                        <BusinessCard image={'/Form_images/Logo_image/'.concat(logo)}
                        business={business} open={open} close={()=>setOpen(false)} />
                    <span className="postDate">{post.posted}</span> 
                </div>
                <div className="postTopRight">
                  {showMenu && (
                    <div className="menuContainer">
                    <MoreVert onClick={handleMoreClick} className="moreVertButton" /> 
                      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)}
                        onClose={handleMoreClose} anchorOrigin={{
                          vertical: 'top', horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top', horizontal: 'left',
                        }}
                        PaperProps={{
                          style: {
                              position: 'absolute',
                              top: '0',
                              right: '100%',
                              borderRadius: '8px',
                              background: 'linear-gradient(to bottom, #E8AA42, #f0b148)',
                              color: 'white',
                              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                              width: '150px',
                          },
                        }}>
                        <MenuItem onClick={handleDeleteConfirmation}> מחיקת הפוסט </MenuItem>
                        <MenuItem onClick={handleOpenEditMode}> עריכת הפוסט</MenuItem>
                        </Menu>
                    </div>
                  )}
                </div>
            </div>
            <div className="postCenter">
            <div className="details">
                    <Box sx={{
                        flex: 4,
                        background: '#E8AA42',
                        width: 50,
                        height: 55,
                        textAlign: 'center',
                        overflowY: 'scroll',
                        
                        '&::-webkit-scrollbar': {
                            width: '0.6em',
                            border: 'none',
                            backgroundColor: 'transparent'
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: 'transparent'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(158, 85, 11, 0.6)',
                            borderRadius: '20px',
                            border: '4px solid transparent'
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: 'rgb(158, 85, 11)'
                        }
                       
                    }}>
                        <Typography><LocationOn /></Typography> 
                        <Typography sx={{position: 'relative', width: '100%', height: "100%"}}>{post.location}</Typography>
                    </Box>
                    <Box sx={{
                        flex: 4,
                        background: '#E8AA42',
                        mr: '15px',
                        width: 50,
                        height: 55,
                        textAlign: 'center',

                        overflowY: 'scroll',
                        
                        '&::-webkit-scrollbar': {
                            width: '0.6em',
                            border: 'none',
                            backgroundColor: 'transparent'
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: 'transparent'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(158, 85, 11, 0.6)',
                            borderRadius: '20px',
                            border: '4px solid transparent'
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: 'rgb(158, 85, 11)'
                        }
                    }}>
                       <Typography><EventNote /></Typography> 
                       <Typography>{post.date}</Typography>
                    </Box>
                    <Box sx={{
                        flex: 4,
                        background: '#E8AA42',
                        mr: '15px',
                        width: 50,
                        height: 55,
                        textAlign: 'center',

                        overflowY: 'scroll',
                        
                        '&::-webkit-scrollbar': {
                            width: '0.6em',
                            border: 'none',
                            backgroundColor: 'transparent'
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: 'transparent'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(158, 85, 11, 0.6)',
                            borderRadius: '20px',
                            border: '4px solid transparent'
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: 'rgb(158, 85, 11)'
                        }
                    }}>
                        <Typography><AccessTime /></Typography>
                        <Typography>{post.time}</Typography>
                    </Box>
                </div>
                <Box sx={{
                    mt: '20px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                }}>
                    <Typography 
                    sx={{
                        align: 'right',
                        whiteSpace: 'pre-line'
                    }}
                    >
                        {post.desc}
                    </Typography>
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
        <Dialog open={ShowDeleteConfirmation} onClose={handleDeleteCancel}>
            <DialogTitle> האם אתה בטוח? </DialogTitle>
            <DialogContent>
                <Typography> בעת לחיצה על "כן" המודעה תימחק לצמיתות</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteCancel}>
                    לא
                </Button>
                <Button onClick={handleDeleteConfirm}>
                    כן
                </Button>
            </DialogActions>
        </Dialog>
        <EditPostWrapper open={openEditPost} onClose={() => setOpenEditPost(false)} original_post={post}/>
    </div>
  )
}

