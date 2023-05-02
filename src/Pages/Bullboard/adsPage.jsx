import React from 'react'
import './adsPage.css'
import Post from '../../components/Post/post'
import {Posts} from '../../DummyData/dummyData'
import AddPost from '../../components/Post/AddPost'

function adsPage() {
  return (
    <div className="adsPageContainer">
      <div className='adsLayer'>
          <div className='leftBar'> </div>
          <div className="board">
              <div className="boardWrapper">
                  {Posts.map(p=> (
                    <Post key={p.id} post={p} />
                  ))}
              </div>
          </div>
          <div className="rightbar"> </div>
      </div>
      <div className="addPostWrapper" dir='rtl'>
        <AddPost />
      </div>
    </div>
  )
}

export default adsPage