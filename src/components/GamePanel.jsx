import React from 'react';

import TargetStatus from './TargetStatus';
import Timer from './Timer';

function GamePanel({ targets, foundTargets }) {
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
      <Timer />
    </div>
  );
}

export default GamePanel;
