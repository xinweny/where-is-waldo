import React from 'react';
import { Link } from 'react-router-dom';

import HeaderNav from './HeaderNav';

import '../styles/Header.css';

function Header({ isAdmin, handleSignOut }) {
  return (
    <header>
      <h1><Link to="/">Hidden in Plain Sight</Link></h1>
      <HeaderNav isAdmin={isAdmin} handleSignOut={handleSignOut} />
    </header>
  );
}

export default Header;
