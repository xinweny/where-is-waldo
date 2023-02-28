import React from 'react';

function LevelInfoModal({ info, handleStart }) {
  return (
    <div className="level-info-modal">
      <p>{info}</p>
      <button type="button" onClick={handleStart}>Start</button>
    </div>
  );
}

export default LevelInfoModal;
