import React, { useState, useRef, useEffect } from 'react';

import { useWindowResize } from '../utils/hooks';
import { convertRelativePos, scalePos, unscalePos } from '../utils/helpers';

import LevelImageContainer from './LevelImageContainer';
import TargetWindow from './TargetWindow';

import '../styles/GameWindow.css';

function GameWindow({
  level,
  scale, setScale,
  foundTargets, setFoundTargets,
  isGameInProgress,
}) {
  const imgRef = useRef();

  const [fixedCoords, setFixedCoords] = useState([0, 0]);
  const [coords, setCoords] = useState([0, 0]);
  const [size, setSize] = useState([0, 0]);

  useWindowResize(imgRef, setScale);

  useEffect(() => { setCoords(scalePos(fixedCoords, scale)); }, [fixedCoords]);

  useEffect(() => {
    if (size.every((s) => s > 0)) {
      const { style } = imgRef.current;

      const width = size[0] * scale;
      style.width = `${width}px`;

      style.height = 'auto';
    }

    setCoords(scalePos(fixedCoords, scale));
  }, [scale]);

  return (
    <div className={`game-window ${isGameInProgress ? '' : 'disabled'}`}>
      <LevelImageContainer>
        <img
          className="level-img"
          ref={imgRef}
          src={level.imgUrl}
          alt={level.title}
          draggable={false}
          onLoad={() => {
            setSize([
              imgRef.current.naturalWidth,
              imgRef.current.naturalHeight,
            ]);
            setScale(window.innerWidth / imgRef.current.naturalWidth);
          }}
          onClick={(e) => {
            if (isGameInProgress) {
              setCoords(convertRelativePos(e));
              setFixedCoords(unscalePos(convertRelativePos(e), scale));
            }
          }}
        />
        <TargetWindow
          coords={coords}
          fixedCoords={fixedCoords}
          level={level}
          scale={scale}
          foundTargets={foundTargets}
          setFoundTargets={setFoundTargets}
          imgRef={imgRef}
        />
      </LevelImageContainer>
    </div>
  );
}

export default GameWindow;
