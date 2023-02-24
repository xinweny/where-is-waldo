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
  const [selectSize, setSelectSize] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState([1, 1]);

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
    originalStartPosRef.current = startPos.map((p, i) => p / scale[i]);
  }, [startPos]);

  useEffect(() => {
    setSelectSize([
      endPos[0] - startPos[0],
      endPos[1] - startPos[1],
    ]);
    originalEndPosRef.current = endPos.map((p, i) => p / scale[i]);
  }, [endPos]);

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
        style={{
          width: `${selectSize[0]}px`,
          height: `${selectSize[1]}px`,
          left: `${startPos[0]}px`,
          top: `${startPos[1]}px`,
          border: selectSize.every((dim) => dim !== 0) ? '1px solid black' : 'none',
        }}
      />
    </div>
  );
}

export default LevelImagePreview;
