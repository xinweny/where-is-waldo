import React, { useState, useEffect } from 'react';

function Timer() {
  const [time, setTime] = useState();

  useEffect(() => {
    const timerFunc = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(timerFunc);
  }, []);

  return (
    <div className="timer">
      {time}
    </div>
  );
}

export default Timer;
