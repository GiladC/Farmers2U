import React, { useState, useEffect } from 'react'
import './adsPage.css'
import Post from '../../components/Post/post'
import AddPost from '../../components/Post/AddPost'
import axios from 'axios'
import AdsFilter from '../../components/newFilterPanel/adsFilter'
import Typography from '@mui/material/Typography';
import noResults from '../../assets/noResults.png';
import { Box } from '@mui/material'



  function AdsPage({ token }) {
    const [filteredPosts, setFilteredPosts] = useState([]);


    useEffect(() => {
      axios
        .get('http://127.0.0.1:5000/api/getposts')
        .then((response) => {
          setFilteredPosts(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

  const boardClassName = filteredPosts.length === 0 ? 'board flex-center' : 'board';

  return (
      <div className='adsLayer'>
          <div className={boardClassName}>
              <div className="boardWrapper">
                {filteredPosts.length == 0 ? (
                  <>
                  <div className='noResults'>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <img className='noResultsImage' src={noResults} style={{ width: '100%'}}/>
                    </Box>
                    <Typography sx={{ 
                      textAlign: 'center', fontSize: '36px', color: '#1d3c45', display: 'flex', 
                      justifyContent: 'center'}}>...לא נמצאו תוצאות</Typography>
                    <Typography sx={{textAlign: 'center', fontSize: '15px', 
                    color: 'rgb(141, 141, 138)',display: 'flex', justifyContent: 'center'}}>
                      {'כדאי לנסות להסיר מסנני חיפוש'}
                    </Typography>
                  </div>
                  </>  
                ) : (
                  filteredPosts.map(p=> (
                    <Post key={p.id} post={p} token={token}/>
                  ))
                )} 
              </div>
          </div>
          <div className="rightbar">
          <div className='header' style={{padding: '1rem 0rem'}}>
            <Typography variant='h4' sx={{textAlign: 'center', paddingBottom: '5px', color: '#030443'}}>סינון מתקדם</Typography>
            <Typography width='300spx' sx={{textAlign: 'center', color: 'rgb(141, 141, 138)', direction: 'rtl'}}>לחצו על כפתור 'הפעלת סינון'.</Typography>
          </div>
          <Box className='adsFilter' flex='1' sx={{'&::-webkit-scrollbar': { display: 'none' }, direction: 'rtl',borderLeft: 'solid 0.5px #1d3c45',overflowY:'scroll', height: '70vh'}}>
              <AdsFilter filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts}/>  
            </Box>
          </div>
      <div className="addPostWrapper" dir='rtl'>
      {token && (
                  <>
        <AddPost vert={{ bottom: 30 }}/>
        </>
      )}
      </div>
      </div>
  )
}
export default AdsPage
