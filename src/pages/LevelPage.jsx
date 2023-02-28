import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import GamePanel from '../components/GamePanel';
import GameWindow from '../components/GameWindow';
import LevelInfoModal from '../components/LevelInfoModal';

function LevelPage() {
  const { level } = useLocation().state;
  const [foundTargets, setFoundTargets] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    if (level.targets.length === foundTargets.length) setEndTime(new Date());
  }, [foundTargets]);

  return (
    <div className="game-page">
      (startTime) ? (
      <GamePanel
        targets={level.targets}
        foundTargets={foundTargets}
        startTime={startTime}
        endTime={endTime}
      />
      <GameWindow level={level} setFoundTargets={setFoundTargets} />
      ) : (
      <LevelInfoModal
        info={level.info}
        handleClick={setStartTime}
      />
      )
    </div>
  );
}

export default LevelPage;
