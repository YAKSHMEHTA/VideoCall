import React from 'react'

function Navbar() {
  return (
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
    </div>
  )
}

export default Navbar
