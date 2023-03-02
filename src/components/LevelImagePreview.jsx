import React, { useState, useEffect, useRef } from 'react';

import { scalePos, unscalePos, convertRelativePos } from '../utils/helpers';

import { useWindowResize } from '../utils/hooks';

function LevelImagePreview({
  imgUrl,
  size,
  scale,
  start, end,
  set,
  children,
}) {
  const imgRef = useRef();
  const containerRef = useRef();

  const [startPos, setStartPos] = useState([0, 0]);
  const [endPos, setEndPos] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);

  useWindowResize(imgRef, set.scale);

  useEffect(() => {
    set.start(unscalePos(startPos, scale).map((pos) => Math.round(pos)));
    set.end(unscalePos(endPos, scale).map((pos) => Math.round(pos)));
  }, [startPos, endPos]);

  useEffect(() => {
    if (size.every((s) => s > 0)) {
      const { style } = imgRef.current;

      const width = size[0] * scale;
      style.width = `${width}px`;

      const height = size[1] * scale;
      style.height = `${height}px`;
    }

    setStartPos(scalePos(start, scale));
    setEndPos(scalePos(end, scale));
  }, [scale]);

  return (
    <div className="level-img-preview">
      <div className="img-preview-container" ref={containerRef}>
        <img
          className="level-img"
          ref={imgRef}
          src={imgUrl}
          draggable={false}
          alt="Level"
          onLoad={() => {
            setStartPos([0, 0]);
            setEndPos([0, 0]);

            set.size([
              imgRef.current.naturalWidth,
              imgRef.current.naturalHeight,
            ]);

            set.scale(window.innerWidth / imgRef.current.naturalWidth);
          }}
          onMouseDown={(e) => {
            setIsDragging(true);
            setStartPos(convertRelativePos(e));
            setEndPos(convertRelativePos(e));
          }}
          onMouseMove={(e) => { if (isDragging) setEndPos(convertRelativePos(e)); }}
          onMouseUp={() => setIsDragging(false)}
        />
        {children}
      </div>
    </div>
  );
}

export default LevelImagePreview;
