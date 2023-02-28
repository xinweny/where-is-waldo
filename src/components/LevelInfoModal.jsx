import React from 'react';

function LevelInfoModal({ info, setStartTime }) {
  return (
    <div className="level-info-modal">
      <p>{info}</p>
      <button type="button" onClick={() => setStartTime(new Date())}>Start</button>
    </div>
  );
}

export default LevelInfoModal;
