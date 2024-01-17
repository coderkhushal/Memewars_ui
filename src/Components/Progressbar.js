import React from 'react'
import "../styles/progressbar.css"
const Progressbar = (props) => {
  const {left, right}= props
  return (
    <div id='progressbar'>
      <div id='left' style={{width:`${left}%`}}></div>
      <div id='right' style={{width:`${right}%`}}></div>
    </div>
  )
}

export default Progressbar