import React, { useState } from 'react';

function AdminDropdownMenu({ children }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <button type="button" className="admin-dropdown" onClick={() => setShowDropdown(!showDropdown)}>
      <img src="#" alt="Admin dropdown" />
      {showDropdown ? (
        <ul className="dropdown-content">
          {children}
        </ul>
      ) : null}
    </button>
  );
}

export default AdminDropdownMenu;
