import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import '../styles/LevelImagePreview.css';

function LevelImagePreview({ imgUrl }) {
  const imgRef = useRef();
  const originalSizeRef = useRef([0, 0]);
  const originalStartPosRef = useRef([0, 0]);
  const originalEndPosRef = useRef([0, 0]);

  const [startPos, setStartPos] = useState([0, 0]);
  const [endPos, setEndPos] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState([1, 1]);
  const [selectSize, setSelectSize] = useState([0, 0]);

  useEffect(() => {
    const handleResize = () => {
      const newSize = [imgRef.current.offsetWidth, imgRef.current.offsetHeight];

      setScale([
        newSize[0] / originalSizeRef.current[0],
        newSize[1] / originalSizeRef.current[1],
      ]);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const unscalePos = (pos) => pos.map((p, i) => p / scale[i]);

    originalStartPosRef.current = unscalePos(startPos);
    originalEndPosRef.current = unscalePos(endPos);

    setSelectSize([
      Math.abs(endPos[0] - startPos[0]),
      Math.abs(endPos[1] - startPos[1]),
    ]);
  }, [startPos, endPos]);

  useEffect(() => {
    const scalePos = (ref) => ref.current.map((p, i) => p * scale[i]);

    setStartPos(scalePos(originalStartPosRef));
    setEndPos(scalePos(originalEndPosRef));
  }, [scale]);

  const convertRelativePos = (e, setter) => {
    const offset = e.target.getBoundingClientRect();

    const newPos = [
      e.clientX - offset.left,
      e.clientY - offset.top,
    ];

    setter(newPos);
  };

  const styleSelectBox = (start, end, size, sc) => {
    const style = {
      width: `${size[0]}px`,
      height: `${size[1]}px`,
      border: size.every((dim) => dim !== 0) ? '1px solid black' : 'none',
    };

    if (end[0] > start[0]) {
      style.left = `${start[0]}px`;
    } else {
      style.right = `${(originalSizeRef.current[0] * sc[0]) - start[0]}px`;
    }

    if (end[1] > start[1]) {
      style.top = `${start[1]}px`;
    } else {
      style.bottom = `${(originalSizeRef.current[1] * sc[1]) - start[1]}px`;
    }

    return style;
  };

  return (
    <div className="level-img-preview">
      <img
        className="level-img"
        ref={imgRef}
        src={imgUrl}
        draggable={false}
        alt="Preview"
        onLoad={() => {
          originalSizeRef.current = [
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
        style={styleSelectBox(startPos, endPos, selectSize, scale)}
      />
    </div>
  );
}

export default LevelImagePreview;
