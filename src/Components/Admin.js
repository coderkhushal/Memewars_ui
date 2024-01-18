import React, { useState } from 'react'
import "../styles/admin.css"
import { socket } from '../libs/socket'

const Admin = () => {
    const [roomid, setroomid]= useState("")
    const starttimer=()=>{
        socket.emit("startroom",{roomid})
        
    }

    const stoptimer=()=>{
        socket.emit("stoproom",{roomid})
        
    }
    
  return (
    <div id='admincontainer'>


        <input id='roominput' type="text" placeholder="Enter Room Id" value={roomid} onChange={(e)=>{setroomid(e.target.value)}} />
        <button className='btn' onClick={starttimer}>Start Room</button>
        <button className='btn' onClick={stoptimer}>Reset Room</button>
    </div>
  )
}

export default Admin