import React from 'react'
import './adsPage.css'
import Post from '../components/post'
import {Posts} from '../dummyData'
import AddPost from '../components/AddPost'

export default function adsPage() {
  return (
    <div className="adsPageContainer">
      <div className='adsLayer'>
          <div className='leftBar'> place for left bar</div>
          <div className="board">
              <div className="boardWrapper">
                  {Posts.map(p=> (
                    <Post key={p.id} post={p} />
                  ))}
              </div>
          </div>
          <div className="rightbar"> place for right bar</div>
      </div>
      <div className="addPostWrapper" dir='rtl'>
        <AddPost />
      </div>
    </div>
  )
}
