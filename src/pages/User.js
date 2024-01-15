import React from 'react'
import "../styles/user.css"
const User = (props) => {
  const {colour}= props
  return (
    <>
    <div id='topbar' >
    <h5 className='secondary-h'>Topic</h5>
    <h1 className='primary-h'>Cats</h1>
    </div>
    <div id='user'>
      <div id='usermeme'><img src="" alt="usermeme" /></div>

      <h3 id='tagline'>Meme Tagline</h3>
      <button id='uploadbtn' style={{backgroundColor:`${colour}`}}>Vote</button>      
    </div>
    </>
  )
}

export default User