import React, { useState, useEffect, useRef } from 'react';

import gearIcon from '../assets/gear.svg';

import '../styles/DropdownMenu.css';

function DropdownMenu({ children }) {
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);
  console.log(children);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        setShowMenu(!showMenu);
      }
    };

    if (showMenu) document.addEventListener('click', pageClickEvent);

    return () => document.removeEventListener('click', pageClickEvent);
  }, [showMenu]);

  return (
    <div className="dropdown-menu">
      <button
        type="button"
        ref={dropdownRef}
        onClick={() => setShowMenu(!showMenu)}
      >
        <img className="icon-small" src={gearIcon} alt="Admin dropdown" />
      </button>
      {showMenu ? (
        <div className="dropdown-content">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default DropdownMenu;
