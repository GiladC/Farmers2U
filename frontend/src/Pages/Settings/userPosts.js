import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../../components/Post/post'

const UserPosts = ({ width, height, position }) => {
  const [posts, setPosts] = useState([]);
  const storedEmail = localStorage.getItem('email');


  useEffect(() => {
    const mail = new FormData();
    mail.append('email', storedEmail)
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
    zIndex: 1, // Ensures the component stays above other content
  };

  return (
    <div
      style={containerStyle}
    >
      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  );
};

export default UserPosts;