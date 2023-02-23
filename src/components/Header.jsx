import React from 'react';
import { Link } from 'react-router-dom';

import AdminDropdownMenu from './AdminDropdownMenu';

function Header({ isAdmin, handleSignOut }) {
  return (
    <header>
      <h1><Link to="/">Hidden in Plain Sight</Link></h1>
      <nav>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <AdminDropdownMenu>
          {isAdmin ? null : <Link to="/login">Admin</Link>}
          {isAdmin ? (<button type="button" onClick={handleSignOut}>Sign Out</button>) : null}
        </AdminDropdownMenu>
      </nav>
    </header>
  );
}

export default Header;
