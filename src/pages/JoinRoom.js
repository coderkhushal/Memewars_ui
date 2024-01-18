import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../styles/joinroom.css"

const JoinRoom = () => {
    const[roomid,setroomid]= useState()
    
    
  return (
    <>
    <div className="heading">

        <h1 className='primary-h'>Welcome To Memewars</h1>
    </div>
    <div id='roomcontainer'>
        <input id="roominput" value={roomid} placeholder='Enter Room Id' onChange={(e)=>{setroomid(e.target.value)}}/>
        <br />
        <button className='btn' >
            <Link to={`/${roomid}`} id='joinroombtn'>Join Room </Link>
        </button>
    </div>
    </>
  )
}

export default JoinRoom