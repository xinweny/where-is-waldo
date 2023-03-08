import React, { useState, useRef, useEffect } from 'react';

import { useWindowResize } from '../utils/hooks';
import { convertRelativePos, scalePos, unscalePos } from '../utils/helpers';

import SelectTargetButton from './SelectTargetButton';
import LevelImageContainer from './LevelImageContainer';

import '../styles/GameWindow.css';

function GameWindow({
  level,
  setFoundTargets,
  foundTargets,
  isGameInProgress,
}) {
  const imgRef = useRef();

  const [fixedCoords, setFixedCoords] = useState([0, 0]);
  const [coords, setCoords] = useState([0, 0]);
  const [scale, setScale] = useState(1);
  const [size, setSize] = useState([0, 0]);
  const [targetWindowStyle, setTargetWindowStyle] = useState({});

  useWindowResize(imgRef, setScale);

  useEffect(() => { setCoords(scalePos(fixedCoords, scale)); }, [fixedCoords]);

  useEffect(() => {
    if (size.every((s) => s > 0)) {
      const { style } = imgRef.current;

      const width = size[0] * scale;
      style.width = `${width}px`;

      const height = size[1] * scale;
      style.height = `${height}px`;
    }

    setCoords(scalePos(fixedCoords, scale));
  }, [scale]);

  useEffect(() => {
    if (fixedCoords.every((coord) => coord !== 0)) {
      setTargetWindowStyle((prev) => ({
        ...prev,
        left: `${fixedCoords[0] * scale}px`,
        top: `${fixedCoords[1] * scale}px`,
      }));
    }
  }, [coords]);

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
              setTargetWindowStyle({ display: 'block' });
              setCoords(convertRelativePos(e));
              setFixedCoords(unscalePos(convertRelativePos(e), scale));
            }
          }}
        />
        <div className="target-window" style={targetWindowStyle}>
          {level.targets.map((target) => (
            <SelectTargetButton
              key={target.id}
              target={target}
              coords={fixedCoords}
              foundTargets={foundTargets}
              setFoundTargets={setFoundTargets}
              setTargetWindowStyle={setTargetWindowStyle}
            />
          ))}
        </div>
      </LevelImageContainer>
    </div>
  );
}

export default GameWindow;
