import React from 'react';
import { Link } from 'react-router-dom';

import DropdownMenu from './DropdownMenu';

import trophyIcon from '../assets/trophy.png';

import '../styles/HeaderNav.css';

function HeaderNav({ isAdmin, handleSignOut }) {
  return (
    <nav>
      <Link to="/leaderboard">
        <img className="icon" src={trophyIcon} title="Leaderboard" alt="Leaderboard" />
      </Link>
      <DropdownMenu>
        {isAdmin ? null : <Link to="/login">Login</Link>}
        {isAdmin ? (
          <>
            <button type="button">
              <Link to="/level/create">Create level</Link>
            </button>
            <button type="button" onClick={handleSignOut}>Sign out</button>
          </>
        ) : null}
      </DropdownMenu>
    </nav>
  );
}

export default HeaderNav;
