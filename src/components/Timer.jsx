import React from 'react';

import { formatMs } from '../utils/helpers';

function Timer({ duration }) {
  return (
    <div className="timer">
      {formatMs(duration)}
    </div>
  );
}

export default Timer;
