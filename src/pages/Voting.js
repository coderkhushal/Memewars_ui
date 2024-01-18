import React, {  useEffect, useState } from 'react'
import anonymous from "../assets/anonymous.PNG"
import "../styles/voting.css"
import "../styles/index.css"
import Progressbar from '../Components/Progressbar'
import SingleUser from '../Components/SingleUser'
import { socket } from '../libs/socket'
import { useParams } from 'react-router-dom'
const Voting = () => {
  const [left, setleft]= useState()
  const [right, setright] = useState()
  const [time, settime]= useState(0)
  const [topic, settopic]= useState("")
  const [isVoting, setisVoting]= useState(false)
  let {roomid}= useParams()
  
  const setProgressBar=async()=>{
    socket.emit("joinroom",roomid)  
    let res= await fetch("http://localhost:4000/"+roomid)
    let responseData= await res.json()
    if(responseData.success){
      settopic(responseData.topic)
      setleft(responseData.user1.score)
      setright(responseData.user2.score)
    }
  }

  useEffect(()=>{
    setProgressBar()
    socket.on("voting",(data)=>{
      // if no change in this room then dont update
      if(left!==data.user1.score){

        setleft(data.user1.score)
        setright(data.user2.score)
      }
      })

      socket.on("timer",(data)=>{
        settime(data.time)
        setisVoting(data.timer)
      })


    return ()=>{socket.off("voting")
    socket.off('timer')
  }
})
  return (
    <>
    {(left && right)  ? <div>
      <div id='header'>

        <div id='user'><img src={anonymous} alt="user1img" /></div>
        <div id='topmiddle'>
          <div className='timer'>Time Left: {time}s</div>
          {left && right && <Progressbar left={left} right={right} />}
          <h5 className='secondary-h'>Topic</h5>
          <h1 className='primary-h'>{topic}</h1>
        </div>
        <div id='user'><img src={anonymous} alt="user2img" /></div>
        
      </div>

      <div id="mainContainer">
          <SingleUser colour={"blue"} user={"user1"} isVoting={isVoting}/>
          <div id="partition"></div>
          <SingleUser colour={"red"} user={"user2"} isVoting={isVoting}/>
      </div>


    </div>: <div id='notfound'>
      Room not found
    </div>}
    
    </>
  )
}

export default Voting   