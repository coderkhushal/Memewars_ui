import React from 'react'
import "../styles/singleuser.css"
import { socket } from '../libs/socket'
import { useParams } from 'react-router-dom'

const SingleUser = (props) => {
  const {roomid,}= useParams()
  
  const {user,colour, isVoting}= props
  const handlevote =(user)=>{
    socket.emit("vote",{user,roomid})
  }
  return (
    <div id='singleuser'>
      <div id='singleuserusermeme'><img src="" alt="usermeme" /></div>
      <h3 id='singleusertagline'>Meme Tagline</h3>
      {isVoting && <button id='singleuservotingbtn' className={`${!isVoting?"disabledbtn":""}`} style={{backgroundColor:`${colour}`}} onClick={()=>{handlevote(user)}} disabled={false}>Vote</button>}
      {!isVoting && <button id='singleuservotingbtn' className={`${!isVoting?"disabledbtn":""}`} style={{backgroundColor:`${colour}`}} onClick={()=>{handlevote(user)}} disabled={true}>Vote</button>}

    </div>
  )
}

export default SingleUser