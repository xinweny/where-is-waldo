import React from 'react';

function LevelInfoModal({ title, description, handleStart }) {
  return (
    <div className="level-info-modal">
      <h2>{title}</h2>
      <p>{description}</p>
      <button type="button" onClick={handleStart}>Start</button>
    </div>
  );
}

export default LevelInfoModal;
