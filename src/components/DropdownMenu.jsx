import React, { useState, useEffect, useRef } from 'react';
import uniqid from 'uniqid';

function DropdownMenu({ children }) {
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

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
    <div className="dropdown">
      <button
        type="button"
        ref={dropdownRef}
        onClick={() => setShowMenu(!showMenu)}
      >
        <img src="#" alt="Admin dropdown" />
      </button>
      {showMenu ? (
        <ul className="dropdown-content">
          {children.map((child) => <li key={uniqid()}>{child}</li>)}
        </ul>
      ) : null}
    </div>
  );
}

export default DropdownMenu;
