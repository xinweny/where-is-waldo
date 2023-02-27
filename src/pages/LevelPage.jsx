import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import GamePanel from '../components/GamePanel';
import GameWindow from '../components/GameWindow';

function LevelPage() {
  const { level } = useLocation().state;
  const [foundTargets, setFoundTargets] = useState([]);

  return (
    <div className="game-page">
      <GamePanel targets={level.targets} foundTargets={foundTargets} />
      <GameWindow level={level} setFoundTargets={setFoundTargets} />
    </div>
  );
}

export default LevelPage;
