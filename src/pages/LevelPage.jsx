import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import GamePanel from '../components/GamePanel';
import GameWindow from '../components/GameWindow';
import LevelInfoModal from '../components/LevelInfoModal';
import GameEndModal from '../components/GameEndModal';

import '../styles/LevelPage.css';

function LevelPage() {
  const { level } = useLocation().state;
  const [foundTargets, setFoundTargets] = useState([]);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [scale, setScale] = useState(1);

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
    <main className="level-page">
      <GamePanel
        targets={level.targets}
        foundTargets={foundTargets}
        duration={duration}
        scale={scale}
        setScale={setScale}
      />
      <div>
        <GameWindow
          level={level}
          setFoundTargets={setFoundTargets}
          foundTargets={foundTargets}
          scale={scale}
          setScale={setScale}
          isGameInProgress={startTime && !isGameEnd}
        />
        {(startTime) ? null : (
          <LevelInfoModal
            title={level.title}
            description={level.description}
            handleStart={() => setStartTime((new Date()).valueOf())}
          />
        )}
        {(isGameEnd) ? (
          <GameEndModal
            levelId={level.id}
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
    </main>
  );
}

export default LevelPage;
