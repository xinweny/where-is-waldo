import React, { useState, useEffect } from 'react';

function TargetStatus({ id, foundTargets, children }) {
  const [style, setStyle] = useState({});

  useEffect(() => {
    setStyle((prev) => (foundTargets.includes(id) ? {
      ...prev,
      color: 'green',
    } : {
      ...prev,
      color: 'black',
    }));
  }, [foundTargets]);

  return (
    <div className="target-status" style={style}>
      {children}
    </div>
  );
}

export default TargetStatus;
