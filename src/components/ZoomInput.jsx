import React from 'react';

import '../styles/ZoomInput.css';

function ZoomInput({ scale, setScale }) {
  return (
    <label htmlFor="zoom-input" className="zoom-input">
      <input
        id="zoom-input"
        type="range"
        min="0.1"
        max="2.5"
        step="0.01"
        value={scale}
        onChange={(e) => setScale(Number(e.target.value))}
      />
      <p>{`${Math.round(scale * 100)}%`}</p>
    </label>
  );
}

export default ZoomInput;
