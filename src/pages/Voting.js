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
  let {roomid}= useParams()
  
  const setProgressBar=async()=>{
    
    let res= await fetch("http://localhost:4000/"+roomid)
    let responseData= await res.json()
    if(responseData.success){
      
      setleft(responseData.user1.score)
      setright(responseData.user2.score)
    }
  }

  useEffect(()=>{
    setProgressBar()
    socket.on("voting",(data)=>{
      // if no change in this room then dont update
      if(left!=data.user1.score){

        setleft(data.user1.score)
        setright(data.user2.score)
      }
      })
    return ()=>{socket.off("voting")}
})
  return (
    <>
    {(left && right)  ? <div>
      <div id='header'>

        <div id='user'><img src={anonymous} alt="user1img" /></div>
        <div id='topmiddle'>
          {left && right && <Progressbar left={left} right={right} />}
          <h5 className='secondary-h'>Topic</h5>
          <h1 className='primary-h'>Cats</h1>
        </div>
        <div id='user'><img src={anonymous} alt="user2img" /></div>
        
      </div>

      <div id="mainContainer">
          <SingleUser colour={"blue"} user={"user1"}/>
          <div id="partition"></div>
          <SingleUser colour={"red"} user={"user2"}/>
      </div>


    </div>: <div id='notfound'>
      Room not found
    </div>}
    
    </>
  )
}

export default Voting   