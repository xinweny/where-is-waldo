import React from 'react';

import { styleSelectBox } from '../utils/helpers';

function TargetSelectBox({
  start,
  end,
  scale,
  size,
  name,
  color,
}) {
  return (
    <div
      className="target-select"
      style={styleSelectBox(start, end, scale, size, color)}
    >
      <p>{name}</p>
    </div>
  );
}

export default TargetSelectBox;
