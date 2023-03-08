import React from 'react';

import TargetStatus from './TargetStatus';
import Timer from './Timer';
import ZoomInput from './ZoomInput';

import '../styles/GamePanel.css';

function GamePanel({
  targets,
  foundTargets,
  duration,
  scale, setScale,
}) {
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
      <ZoomInput scale={scale} setScale={setScale} />
    </div>
  );
}

export default GamePanel;
