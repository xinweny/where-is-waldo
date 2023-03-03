import React from 'react';

import '../styles/LevelImageContainer.css';

function LevelImageContainer({ children }) {
  return (
    <div className="level-img-preview">
      <div className="img-preview-container">
        {children}
      </div>
    </div>
  );
}

export default LevelImageContainer;
