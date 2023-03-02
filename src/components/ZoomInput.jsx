import React from 'react';

function ZoomInput({ zoom, setZoom }) {
  return (
    <label htmlFor="img-zoom">
      <p>{`${(zoom * 100).toFixed(0)}%`}</p>
      <input
        type="range"
        min="0.25"
        max="4.00"
        step="0.01"
        value={zoom}
        onChange={(e) => setZoom(Number(e.target.value))}
      />
    </label>
  );
}

export default ZoomInput;
