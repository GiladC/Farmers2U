import React, { useState } from 'react'
import './adsPage.css'
import Post from '../../components/Post/post'
import {Posts} from '../../DummyData/dummyData'
import AddPost from '../../components/Post/AddPost'
import FilterPanel from '../../components/FilterPanel/FilterPanel'
import Filter from '../../components/newFilterPanel/filter'



  // const handleChangeChecked=(id)=>{
  //   const areasStateList=areas;
  //   const changeCheckedAreas=areasStateList.map((item) =>
  //   item.id===id?{...item,checked: !item.checked}:item
  //   );
  //   setAreas(changeCheckedAreas);
  // };
  function adsPage({ token }) {
  return (
      <div className='adsLayer'>
          <div className='leftBar'>

          </div>
          <div className="board">
              <div className="boardWrapper">
                  {Posts.map(p=> (
                    <Post key={p.id} post={p} />
                  ))}
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
export default adsPage
