import React from 'react';

function TargetPreviewCard({ target }) {
  return (
    <div>
      <p>{target.name}</p>
      <img src={target.img} alt={target.name} />
      <p>{`x${target.xRange}`}</p>
      <p>{`y${target.yRange}`}</p>
    </div>
  );
}

export default TargetPreviewCard;
