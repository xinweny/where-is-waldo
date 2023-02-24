import React, { useState, useEffect, useRef } from 'react';

import {
  scalePos,
  unscalePos,
  convertRelativePos,
  styleSelectBox,
} from '../utils';

import '../styles/LevelImagePreview.css';

function LevelImagePreview({ imgUrl, setXRange, setYRange }) {
  const imgRef = useRef();
  const sizeRef = useRef([0, 0]);
  const startPosRef = useRef([0, 0]);
  const endPosRef = useRef([0, 0]);

  const [startPos, setStartPos] = useState([0, 0]);
  const [endPos, setEndPos] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState([1, 1]);

  useEffect(() => {
    const handleResize = () => {
      const newSize = [imgRef.current.offsetWidth, imgRef.current.offsetHeight];

      setScale([
        newSize[0] / sizeRef.current[0],
        newSize[1] / sizeRef.current[1],
      ]);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    startPosRef.current = unscalePos(startPos, scale).map((pos) => Math.round(pos));
    endPosRef.current = unscalePos(endPos, scale).map((pos) => Math.round(pos));

    const start = startPosRef.current;
    const end = endPosRef.current;

    setXRange([start[0], end[0]].sort((a, b) => a - b));
    setYRange([start[1], end[1]].sort((a, b) => a - b));
  }, [startPos, endPos]);

  useEffect(() => {
    setStartPos(scalePos(startPosRef, scale));
    setEndPos(scalePos(endPosRef, scale));
  }, [scale]);

  return (
    <div className="level-img-preview">
      <img
        className="level-img"
        ref={imgRef}
        src={imgUrl}
        draggable={false}
        alt="Preview"
        onLoad={() => {
          setStartPos([0, 0]);
          setEndPos([0, 0]);
          setScale([1, 1]);

          sizeRef.current = [
            imgRef.current.offsetWidth,
            imgRef.current.offsetHeight,
          ];
        }}
        onMouseDown={(e) => {
          setIsDragging(true);
          convertRelativePos(e, setStartPos);
          convertRelativePos(e, setEndPos);
        }}
        onMouseMove={(e) => { if (isDragging) convertRelativePos(e, setEndPos); }}
        onMouseUp={() => setIsDragging(false)}
      />
      <div
        className="target-select"
        style={styleSelectBox(startPos, endPos, scale, sizeRef)}
      />
    </div>
  );
}

export default LevelImagePreview;
