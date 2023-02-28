import React from 'react';

import TargetStatus from './TargetStatus';
import Timer from './Timer';

function GamePanel({ targets, foundTargets, duration }) {
  return (
    <div className="game-panel">
      <div>
        {targets.map((target) => (
          <TargetStatus key={target.id} id={target.id} foundTargets={foundTargets}>
            <img src={target.imgUrl} alt={target.name} />
            <p>{target.name}</p>
          </TargetStatus>
        ))}
      </div>
      <Timer duration={duration} />
    </div>
  );
}

export default GamePanel;
