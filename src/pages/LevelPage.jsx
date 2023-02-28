import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import GamePanel from '../components/GamePanel';
import GameWindow from '../components/GameWindow';
import LevelInfoModal from '../components/LevelInfoModal';
import GameEndModal from '../components/GameEndModal';

function LevelPage() {
  const { level } = useLocation().state;
  const [foundTargets, setFoundTargets] = useState([]);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(0);

  const timerFunc = useRef(null);

  useEffect(() => {
    if (startTime) {
      timerFunc.current = setInterval(() => setDuration((new Date()).valueOf() - startTime), 100);

      return () => clearInterval(timerFunc.current);
    }

    return () => {};
  }, [startTime]);

  useEffect(() => {
    if (level.targets.length === foundTargets.length) setIsGameEnd(true);
  }, [foundTargets]);

  useEffect(() => {
    if (isGameEnd) clearInterval(timerFunc.current);
  }, [isGameEnd]);

  return (
    <div className="game-page">
      <GamePanel
        targets={level.targets}
        foundTargets={foundTargets}
        duration={duration}
      />
      <div>
        <GameWindow
          level={level}
          setFoundTargets={setFoundTargets}
          foundTargets={foundTargets}
          isGameInProgress={startTime && !isGameEnd}
        />
        {(startTime) ? null : (
          <LevelInfoModal
            info={level.description}
            handleStart={() => setStartTime((new Date()).valueOf())}
          />
        )}
        {(isGameEnd) ? (
          <GameEndModal
            title={level.title}
            duration={duration}
            handleRestart={() => {
              setStartTime((new Date()).valueOf());
              setFoundTargets([]);
              setIsGameEnd(false);
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default LevelPage;
