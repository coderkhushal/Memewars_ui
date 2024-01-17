import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/joinroom.css"
import { socket } from '../libs/socket'

const JoinRoom = () => {
    const[roomid,setroomid]= useState()
    const navigation = useNavigate()
    const handleonclick=()=>{
        socket.emit("joinroom",roomid)
        navigation(roomid)
    }
    
  return (
    <>
    <div className="heading">

        <h1 className='primary-h'>Welcome To Memewars</h1>
    </div>
    <div id='roomcontainer'>
        <input id="roominput" value={roomid} placeholder='Enter Room Id' onChange={(e)=>{setroomid(e.target.value)}}/>
        <br />
        <button className='btn' onClick={handleonclick}>
            <Link id='joinroombtn' >Join Room </Link>
        </button>
    </div>
    </>
  )
}

export default JoinRoom