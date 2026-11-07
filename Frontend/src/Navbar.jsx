import React, { useEffect, useState } from 'react'

function Navbar() {
  const location = window.location.href;
  const [inMeeting,setInMeeting] = useState(location.search('room'));
  useEffect(()=>{
    setInMeeting(location.search('room'));
  },[window.location.href])
  console.log('meet',inMeeting)
  return (
    inMeeting < 0 ?  
      <div className='relative'>
      <nav className="navBar " style={{ width: '100%',}}>
        <div className="logoText">Ve<span>x</span></div>
        <div className="navMid">
          <a href="#">Product</a>
          <a href="#">Enterprise</a>
          <a href="#">Pricing</a>
          <a href="#">Changelog</a>
          <a href="#">Docs</a>
        </div>
        <div className="navRight">
          <button className="nBtn nGhost">Sign in</button>
          <a to={"/"} className="nBtn nSolid">Get started</a >
        </div>
      </nav>
    </div>  : (<div >
    </div> )
  )
}

export default Navbar
