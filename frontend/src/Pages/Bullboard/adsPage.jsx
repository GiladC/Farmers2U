import React, { useState, useEffect } from 'react'
import './adsPage.css'
import Post from '../../components/Post/post'
import {Posts} from '../../DummyData/dummyData'
import AddPost from '../../components/Post/AddPost'
import Filter from '../../components/newFilterPanel/filter'
import axios from 'axios'



  // const handleChangeChecked=(id)=>{
  //   const areasStateList=areas;
  //   const changeCheckedAreas=areasStateList.map((item) =>
  //   item.id===id?{...item,checked: !item.checked}:item
  //   );
  //   setAreas(changeCheckedAreas);
  // };
  function AdsPage({ token }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      axios
        .get('http://127.0.0.1:5000/api/getposts')
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    
  return (
      <div className='adsLayer'>
          <div className='leftBar'>

          </div>
          <div className="board">
              <div className="boardWrapper">
                 {posts.map(p=> (
                    <Post key={p.id} post={p} />
                ))}  
                {/*  {posts.map(p=> (
                    <Post post={p} />
                ))}   */}
              </div>
          </div>
          <div className="rightbar">
            <Filter />
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
