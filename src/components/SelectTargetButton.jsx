import React, { useState, useEffect } from 'react';

import '../styles/SelectTargetButton.css';

function SelectTargetButton({
  coords,
  target,
  setFoundTargets,
  foundTargets,
  setTargetWindowStyle,
}) {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const display = (foundTargets.includes(target.id) ? 'none' : 'block');

    setStyle((prev) => ({ ...prev, display }));
  }, [foundTargets]);

  const checkSelection = (e) => {
    e.stopPropagation();
    if (coords[0] >= target.xRange[0]
      && coords[0] <= target.xRange[1]
      && coords[1] >= target.yRange[0]
      && coords[1] <= target.yRange[1]
    ) {
      setFoundTargets((prev) => [...prev, target.id]);
    }

    setTargetWindowStyle((prev) => ({ ...prev, display: 'none' }));
  };

  return (
    <button
      className="target-select-btn"
      type="button"
      style={style}
      onClick={checkSelection}
    >
      <div>
        <div className="target-img-container">
          <img src={target.imgUrl} alt="" />
        </div>
        <p>{target.name}</p>
      </div>
    </button>
  );
}

export default SelectTargetButton;
