import React from 'react'
import anonymous from "../assets/anonymous.PNG"
import "../styles/voting.css"
import "../styles/index.css"

import Progressbar from '../Components/Progressbar'
import SingleUser from '../Components/SingleUser'
const Voting = () => {
  return (
    <div>
      <div id='header'>

        <div id='user'><img src={anonymous} alt="user1img" /></div>
        <div id='topmiddle'>
          <Progressbar left={50} right={50} />
          <h5 className='secondary-h'>Topic</h5>
          <h1 className='primary-h'>Cats</h1>
        </div>
        <div id='user'><img src={anonymous} alt="user2img" /></div>
        
      </div>

      <div id="mainContainer">
          <SingleUser colour={"blue"}/>
          <div id="partition"></div>
          <SingleUser colour={"red"}/>
      </div>


    </div>
  )
}

export default Voting   