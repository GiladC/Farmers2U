import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../../components/Post/post'
import { Box } from '@mui/material';

const UserPosts = ({ width, height, position, email }) => {
  const [posts, setPosts] = useState([]);
  const storedEmail = localStorage.getItem('email');


  useEffect(() => {
    const mail = new FormData();
    mail.append('email', email)
    axios
      .post('http://127.0.0.1:5000/api/getuserposts', mail)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const containerStyle = {
    width: `${width}px`,
    height: `${height}px`,
    position: 'sticky',
    ...position,
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '10px',
      border: 'none',
      backgroundColor: 'transparent'
  },
  '&::-webkit-scrollbar-track': {
      backgroundColor: '#1d3c45',
      border: '10 px #1d3c45',
      borderRadius: '0px'
  },
  '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(244, 168, 92, 0.7)',
      borderRadius: '30px',
      border: '4px solid transparent'
  },
  '&::-webkit-scrollbar-thumb:hover': {
      background: 'rgb(244, 168, 92)'
  },
    zIndex: 1, // Ensures the component stays above other content
  };

  return (
    <Box
      sx={containerStyle}
    >
      {posts.map((p) => (
        <Post key={p.id} post={p} disabled={true} />
      ))}
    </Box>
  );
};

export default UserPosts;