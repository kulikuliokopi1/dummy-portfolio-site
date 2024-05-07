// Header.js

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faBars } from '@fortawesome/free-solid-svg-icons';
import '../css/Header.css'; // Optional: CSS file for styling

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="header">
      <NavLink exact to='/'>
      <div className="logo">
        <img src="/assets/images/logo.png" alt='company logo' />
        <h4><span>Dummy-Portfolio</span><span>site</span></h4>
      </div>
      </NavLink>
      
      <div className="menu">
      <div className="hamburger-icon" onClick={() => setShowMenu(!showMenu)}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        
        <div className="menu-list">
        <nav>
          <ul>
            <li><NavLink exact to='/' activeClassName="active">Home</NavLink></li>
            <li><NavLink to='/about' activeClassName="active">About</NavLink></li>
            <li><NavLink to='/contact' activeClassName="active">Contact</NavLink></li>
          </ul>
        </nav>
      </div>
      <div className={`small-menu-list ${showMenu ? 'show-menu' : ''}`}>
        <nav>
          <ul>
            <li><NavLink exact to='/' activeClassName="active">Home</NavLink></li>
            <li><NavLink to='/about' activeClassName="active">About</NavLink></li>
            <li><NavLink to='/contact' activeClassName="active">Contact</NavLink></li>
          </ul>
        </nav>
      </div>
      <div className='login-button'>
      <Link to='/login'>
        <nav>
          <ul>
            <li><span><FontAwesomeIcon icon={faLock} /></span><span>LogIn</span></li>
          </ul>
        </nav>
      </Link>
      </div>
      </div>

      
    </header>
  );
}

export default Header;
