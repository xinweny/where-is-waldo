import React from 'react';

function TargetPreviewCard({ target, handleDelete }) {
  return (
    <div>
      <div>
        <p>{target.name}</p>
        <img src={target.preview} alt={target.name} />
        <p>{`x${target.xRange}`}</p>
        <p>{`y${target.yRange}`}</p>
      </div>
      <button type="button" onClick={() => handleDelete(target.id)}>x</button>
    </div>
  );
}

export default TargetPreviewCard;
