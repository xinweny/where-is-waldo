import React, { useState } from 'react';

function SelectTargetButton({
  id,
  coords,
  xRange,
  yRange,
  name,
  setFoundTargets,
  setTargetWindowStyle,
}) {
  const [style, setStyle] = useState({});

  const checkSelection = (e) => {
    e.stopPropagation();
    if (coords[0] >= xRange[0]
      && coords[0] <= xRange[1]
      && coords[1] >= yRange[0]
      && coords[1] <= yRange[1]
    ) {
      setFoundTargets((prev) => [...prev, id]);
      setStyle((prev) => ({ ...prev, display: 'none' }));
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
      {name}
    </button>
  );
}

export default SelectTargetButton;
