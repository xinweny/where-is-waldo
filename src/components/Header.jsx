import React from 'react';
import { Link } from 'react-router-dom';

import DropdownMenu from './DropdownMenu';

function Header({ isAdmin, handleSignOut }) {
  return (
    <header>
      <h1><Link to="/">Hidden in Plain Sight</Link></h1>
      <nav>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <DropdownMenu>
          {isAdmin ? null : <Link to="/login">Admin</Link>}
          {isAdmin ? (<button type="button" onClick={handleSignOut}>Sign Out</button>) : null}
        </DropdownMenu>
      </nav>
    </header>
  );
}

export default Header;
