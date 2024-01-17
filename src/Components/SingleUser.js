import React from 'react'
import "../styles/singleuser.css"
import { socket } from '../libs/socket'
import { useParams } from 'react-router-dom'

const SingleUser = (props) => {
  const {roomid}= useParams()
  const {user}= props
  const handlevote =(user)=>{
    socket.emit("vote",{user,roomid})
  }
  const {colour}= props
  return (
    <div id='singleuser'>
      <div id='singleuserusermeme'><img src="" alt="usermeme" /></div>
      <h3 id='singleusertagline'>Meme Tagline</h3>
      <button id='singleuservotingbtn' style={{backgroundColor:`${colour}`}} onClick={()=>{handlevote(user)}}>Vote</button>      
    </div>
  )
}

export default SingleUser