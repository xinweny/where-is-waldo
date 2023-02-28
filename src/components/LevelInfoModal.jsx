import React from 'react';

function LevelInfoModal({ description, handleStart }) {
  return (
    <div className="level-info-modal">
      <p>{description}</p>
      <button type="button" onClick={handleStart}>Start</button>
    </div>
  );
}

export default LevelInfoModal;
