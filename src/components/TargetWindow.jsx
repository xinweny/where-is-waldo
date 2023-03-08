import React, { useState, useRef, useEffect } from 'react';

import SelectTargetButton from './SelectTargetButton';

import '../styles/TargetWindow.css';

function TargetWindow({
  level,
  scale,
  coords, fixedCoords,
  foundTargets, setFoundTargets,
  imgRef,
}) {
  const targetWindowRef = useRef();

  const [style, setStyle] = useState({});

  useEffect(() => {
    if (fixedCoords.every((c) => c !== 0)) setStyle((s) => ({ ...s, display: 'block' }));
  }, [fixedCoords]);

  useEffect(() => {
    if (fixedCoords.every((coord) => coord !== 0)) {
      const [x, y] = fixedCoords.map((c) => c * scale);

      const imgWidth = imgRef.current.offsetWidth;
      const imgHeight = imgRef.current.offsetHeight;

      const endX = targetWindowRef.current.offsetWidth + x;
      const endY = targetWindowRef.current.offsetHeight + y;

      setStyle((s) => {
        const pos = {
          left: '',
          right: '',
          top: '',
          bottom: '',
        };

        if (endX < imgWidth && endY < imgHeight) {
          pos.left = `${x}px`; pos.top = `${y}px`;
        } else if (endX > imgWidth && endY < imgHeight) {
          pos.right = `${imgWidth - x}px`; pos.top = `${y}px`;
        } else if (endX < imgWidth && endY > imgHeight) {
          pos.left = `${x}px`; pos.bottom = `${imgHeight - y}px`;
        } else {
          pos.right = `${imgWidth - x}px`; pos.bottom = `${imgHeight - y}px`;
        }

        return { ...s, ...pos };
      });
    }
  }, [coords]);

  return (
    <div ref={targetWindowRef} className="target-window" style={style}>
      {level.targets.map((target) => (
        <SelectTargetButton
          key={target.id}
          target={target}
          coords={fixedCoords}
          foundTargets={foundTargets}
          setFoundTargets={setFoundTargets}
          setTargetWindowStyle={setStyle}
        />
      ))}
    </div>
  );
}

export default TargetWindow;
