import React, { useState, useEffect, useRef } from 'react';

import {
  scalePos,
  unscalePos,
  convertRelativePos,
} from '../utils/helpers';
import { useWindowResize } from '../utils/hooks';

import TargetForm from './TargetForm';
import TargetPreviewCard from './TargetPreviewCard';
import TargetSelectBox from './TargetSelectBox';

import '../styles/LevelImagePreview.css';

function LevelImagePreview({
  imgUrl,
  targets,
  setTargets,
  levelId,
}) {
  const imgRef = useRef();
  const sizeRef = useRef([0, 0]);
  const startPosRef = useRef([0, 0]);
  const endPosRef = useRef([0, 0]);

  const [startPos, setStartPos] = useState([0, 0]);
  const [endPos, setEndPos] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState([1, 1]);
  const [selectColor, setSelectColor] = useState('#000000');

  useWindowResize(imgRef, sizeRef, setScale);

  useEffect(() => {
    startPosRef.current = unscalePos(startPos, scale).map((pos) => Math.round(pos));
    endPosRef.current = unscalePos(endPos, scale).map((pos) => Math.round(pos));
  }, [startPos, endPos]);

  useEffect(() => {
    setStartPos(scalePos(startPosRef.current, scale));
    setEndPos(scalePos(endPosRef.current, scale));
  }, [scale]);

  return (
    <div>
      <div>
        <TargetForm
          xRange={[startPosRef.current[0], endPosRef.current[0]].sort((a, b) => a - b)}
          yRange={[startPosRef.current[1], endPosRef.current[1]].sort((a, b) => a - b)}
          setTargets={setTargets}
          levelId={levelId}
          setStartPos={setStartPos}
          setEndPos={setEndPos}
        />
        <label htmlFor="select-color">
          <p>Color</p>
          <input
            type="color"
            name="select-color"
            id="select-color"
            value={selectColor}
            onChange={(e) => setSelectColor(e.target.value)}
          />
        </label>
      </div>
      <div>
        <h3>Targets</h3>
        {(targets.length > 0) ? targets.map((target) => (
          <TargetPreviewCard
            key={target.id}
            target={target}
            setTargets={setTargets}
            levelId={levelId}
          />
        )) : <p>No targets to show.</p>}
      </div>
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

            sizeRef.current = [
              imgRef.current.naturalWidth,
              imgRef.current.naturalHeight,
            ];

            setScale([
              imgRef.current.offsetWidth / sizeRef.current[0],
              imgRef.current.offsetHeight / sizeRef.current[1],
            ]);
          }}
          onMouseDown={(e) => {
            setIsDragging(true);
            setStartPos(convertRelativePos(e));
            setEndPos(convertRelativePos(e));
          }}
          onMouseMove={(e) => { if (isDragging) setEndPos(convertRelativePos(e)); }}
          onMouseUp={() => setIsDragging(false)}
        />
        {targets.map((target) => (
          <TargetSelectBox
            key={target.id}
            start={[target.xRange[0], target.yRange[0]]}
            end={[target.xRange[1], target.yRange[1]]}
            scale={scale}
            size={sizeRef.current}
            name={target.name}
            color={selectColor}
          />
        ))}
        <TargetSelectBox
          start={startPosRef.current}
          end={endPosRef.current}
          scale={scale}
          size={sizeRef.current}
          color={selectColor}
        />
      </div>
    </div>
  );
}

export default LevelImagePreview;
