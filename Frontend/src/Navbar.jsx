import React from 'react';
import { useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  if (location.pathname.startsWith('/room')) {
    return null;
  }

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
          <a to={"/home"} className="nBtn nSolid">Get started</a >
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
