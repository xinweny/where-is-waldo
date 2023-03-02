import React, { useState, useRef, useEffect } from 'react';

import { useWindowResize } from '../utils/hooks';
import { convertRelativePos, unscalePos } from '../utils/helpers';

import SelectTargetButton from './SelectTargetButton';

import '../styles/GameWindow.css';

function GameWindow({
  level,
  setFoundTargets,
  foundTargets,
  isGameInProgress,
}) {
  const imgRef = useRef();
  const sizeRef = useRef(null);

  const [coords, setCoords] = useState([0, 0]);
  const [scale, setScale] = useState(1);
  const [targetWindowStyle, setTargetWindowStyle] = useState({});

  useWindowResize(sizeRef, setScale);

  useEffect(() => {
    if (coords.every((coord) => coord !== 0)) {
      setTargetWindowStyle((prev) => ({
        ...prev,
        display: 'block',
        left: `${coords[0] * scale}px`,
        top: `${coords[1] * scale}px`,
      }));
    }
  }, [coords]);

  useEffect(() => {
    setTargetWindowStyle((prev) => ({
      ...prev,
      left: `${coords[0] * scale}px`,
      top: `${coords[1] * scale}px`,
    }));
  }, [scale]);

  return (
    <div className="game-window">
      <img
        className="level-img"
        ref={imgRef}
        src={level.imgUrl}
        alt={level.title}
        draggable={false}
        onLoad={() => {
          sizeRef.current = [
            imgRef.current.naturalWidth,
            imgRef.current.naturalHeight,
          ];

          setScale(imgRef.current.offsetWidth / sizeRef.current[0]);
        }}
        onClick={(e) => {
          if (isGameInProgress) {
            setCoords(unscalePos(convertRelativePos(e), scale));
          }
        }}
      />
      <div
        className="target-window"
        style={targetWindowStyle}
      >
        {level.targets.map((target) => (
          <SelectTargetButton
            key={target.id}
            id={target.id}
            name={target.name}
            xRange={target.xRange}
            yRange={target.yRange}
            coords={coords}
            foundTargets={foundTargets}
            setFoundTargets={setFoundTargets}
            setTargetWindowStyle={setTargetWindowStyle}
          />
        ))}
      </div>
    </div>
  );
}

export default GameWindow;
