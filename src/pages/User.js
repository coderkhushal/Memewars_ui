import React, { useEffect, useState } from 'react'
import "../styles/user.css"
import { useParams } from 'react-router-dom'
const User = (props) => {
  const [userScore, setuserScore]= useState(0)
  const {number} =useParams()
  const fetchUserData=async()=>{
    let res= await fetch("http://localhost:4000")
    let resData= await res.json()
    setuserScore(resData[`user${number}`].score)
  }
  useEffect(()=>{
    fetchUserData()
  },[])
  return (
    <>
    <div id="scorebar">
      {userScore && <h2>Your Score: {userScore}</h2> }
    </div>
    <div id='topbar' >
    <h5 className='secondary-h'>Topic</h5>
    <h1 className='primary-h'>Cats</h1>
    </div>
    <div id='user'>
      <div id='usermeme'><img src="" alt="usermeme" /></div>

      <h3 id='tagline'>Meme Tagline</h3>
      <form id='uploadForm'>

      <input type="file" id='uploadbtn' style={{backgroundColor:`${number==2?"red":"blue"}`}}  placeholder='Upload'/>
      <button type="submit" id='uploadbtn' style={{backgroundColor:`${number==2?"red":"blue"}`}}  placeholder='Upload'>Upload</button>
      </form>
    </div>
    </>
  )
}

export default User