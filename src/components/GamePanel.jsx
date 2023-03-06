import React from 'react';

import TargetStatus from './TargetStatus';
import Timer from './Timer';

import '../styles/GamePanel.css';

function GamePanel({ targets, foundTargets, duration }) {
  return (
    <div className="game-panel">
      <div className="target-overview">
        {targets.map((target) => (
          <TargetStatus key={target.id} id={target.id} foundTargets={foundTargets}>
            <div className="target-img-container">
              <img src={target.imgUrl} alt={target.name} />
            </div>
            <p>{target.name}</p>
          </TargetStatus>
        ))}
      </div>
      <Timer duration={duration} />
    </div>
  );
}

export default GamePanel;
