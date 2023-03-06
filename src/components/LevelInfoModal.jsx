import React from 'react';

function LevelInfoModal({ title, description, handleStart }) {
  return (
    <div className="modal level-info-modal">
      <h2>{title}</h2>
      <p className="level-description">{description}</p>
      <button type="button" onClick={handleStart}>Start</button>
    </div>
  );
}

export default LevelInfoModal;
