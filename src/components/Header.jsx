import React from 'react';
import { Link } from 'react-router-dom';

import HeaderNav from './HeaderNav';

import '../styles/Header.css';

function Header({ isAdmin, handleSignOut }) {
  return (
    <header>
      <Link to="/">
        <h1>
          <span>Hidden</span>
          <span className="fade-in"> in Plain Sight</span>
        </h1>
      </Link>
      <HeaderNav isAdmin={isAdmin} handleSignOut={handleSignOut} />
    </header>
  );
}

export default Header;
