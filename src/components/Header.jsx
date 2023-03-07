import React from 'react';
import { Link } from 'react-router-dom';

import HeaderNav from './HeaderNav';

import logo from '../assets/vision.png';

import '../styles/Header.css';

function Header({ isAdmin, handleSignOut }) {
  return (
    <header>
      <Link to="/">
        <div className="site-branding">
          <img src={logo} alt="Hidden in Plain Sight" />
          <h1>
            <span>Hidden</span>
            <span className="fade-in"> in Plain Sight</span>
          </h1>
        </div>
      </Link>
      <HeaderNav isAdmin={isAdmin} handleSignOut={handleSignOut} />
    </header>
  );
}

export default Header;
