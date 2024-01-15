import React from 'react'
import "../styles/singleuser.css"
const SingleUser = (props) => {
  const {colour}= props
  return (
    <div id='singleuser'>
      <div id='singleuserusermeme'><img src="" alt="usermeme" /></div>
      <h3 id='singleusertagline'>Meme Tagline</h3>
      <button id='singleuservotingbtn' style={{backgroundColor:`${colour}`}}>Vote</button>      
    </div>
  )
}

export default SingleUser