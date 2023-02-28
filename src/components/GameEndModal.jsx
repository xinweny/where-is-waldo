import React from 'react';

import { formatMs } from '../utils/helpers';

function GameEndModal({ title, duration, handleRestart }) {
  return (
    <div className="game-end-modal">
      <h3>{title}</h3>
      <p>{`Congratulations! You found all targets in ${formatMs(duration)}.`}</p>
      <button type="button" onClick={handleRestart}>Restart</button>
    </div>
  );
}

export default GameEndModal;
