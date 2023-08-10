import React, { useState, useEffect } from 'react'
import './adsPage.css'
import Post from '../../components/Post/post'
import AddPost from '../../components/Post/AddPost'
import axios from 'axios'
import AdsFilter from '../../components/newFilterPanel/adsFilter'
import Typography from '@mui/material/Typography';



  function AdsPage({ token }) {
    const [filteredPosts, setFilteredPosts] = useState([]);


    useEffect(() => {
      axios
        .get('http://127.0.0.1:5000/api/getposts')
        .then((response) => {
          setFilteredPosts(response.data);
          console.log(response.data.length)
          let i;
          for (i = 0; i < filteredPosts.length; i++){
            console.log(filteredPosts[i].post_products)
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    
  return (
      <div className='adsLayer'>
          <div className='leftBar'></div>
          <div className="board">
              <div className="boardWrapper">
                {filteredPosts.length == 0 ? (
                  <>
                    <img src="/other_images/results_no_found.png" style={{ width: '100%'}}/>
                    <Typography sx={{ 
                      marginRight: '95px', fontSize: '36px', color: '#1d3c45', display: 'flex', 
                      justifyContent: 'center'}}>...לא נמצאו תוצאות</Typography>
                    <Typography sx={{ marginRight: '95px', fontSize: '15px', 
                    color: 'rgb(141, 141, 138)',display: 'flex', justifyContent: 'center'}}>
                      {'כדאי לנסות להסיר מסנני חיפוש'}
                    </Typography>
                  </>  
                ) : (
                  filteredPosts.map(p=> (
                    <Post key={p.id} post={p} token={token}/>
                  ))
                )} 
              </div>
          </div>
          <div className="rightbar">
            <AdsFilter filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts}/>
          </div>
      <div className="addPostWrapper" dir='rtl'>
      {token && (
                  <>
        <AddPost />
        </>
      )}
      </div>
      </div>
  )
}
export default AdsPage
