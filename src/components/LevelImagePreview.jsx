import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import '../styles/LevelImagePreview.css';

function LevelImagePreview({ imgUrl }) {
  const imgRef = useRef();

  const [startPos, setStartPos] = useState([0, 0]);
  const [endPos, setEndPos] = useState([0, 0]);
  const [size, setSize] = useState([0, 0]);
  const [selectSize, setSelectSize] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setSize([
        imgRef.current.offsetWidth,
        imgRef.current.offsetHeight,
      ]);

      console.log(size);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => setSelectSize([
    endPos[0] - startPos[0],
    endPos[1] - startPos[1],
  ]), [endPos]);

  const setRelativePos = (e, setter) => {
    const offset = e.target.getBoundingClientRect();
    setter([
      e.clientX - offset.left,
      e.clientY - offset.top,
    ]);
  };

  return (
    <div className="level-img-preview">
      <img
        className="level-img"
        ref={imgRef}
        src={imgUrl}
        draggable={false}
        alt="Preview"
        onLoad={() => setSize([
          imgRef.current.offsetWidth,
          imgRef.current.offsetHeight,
        ])}
        onMouseDown={(e) => {
          setIsDragging(true);
          setRelativePos(e, setStartPos);
          setRelativePos(e, setEndPos);
        }}
        onMouseMove={(e) => { if (isDragging) setRelativePos(e, setEndPos); }}
        onMouseUp={() => setIsDragging(false)}
      />
      <div
        className="target-select"
        style={{
          width: `${selectSize[0]}px`,
          height: `${selectSize[1]}px`,
          left: `${startPos[0]}px`,
          top: `${startPos[1]}px`,
          border: selectSize.every((dim) => dim === 0) ? 'none' : '1px solid black',
        }}
      />
    </div>
  );
}

export default LevelImagePreview;
