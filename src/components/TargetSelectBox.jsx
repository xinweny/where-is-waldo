import React from 'react';

import { styleSelectBox } from '../utils/helpers';

import '../styles/TargetSelectBox.css';

function TargetSelectBox({
  start,
  end,
  scale,
  imgSize,
  name,
  color,
}) {
  return (
    <div
      className="target-select"
      style={styleSelectBox(start, end, scale, imgSize, color)}
    >
      <p>{name}</p>
    </div>
  );
}

export default TargetSelectBox;
