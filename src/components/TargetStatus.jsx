import React, { useState, useEffect } from 'react';

function TargetStatus({ id, foundTargets, children }) {
  const [style, setStyle] = useState('');

  useEffect(() => {
    setStyle(foundTargets.includes(id) ? 'found' : '');
  }, [foundTargets]);

  return (
    <div className={`target-status ${style}`}>
      {children}
    </div>
  );
}

export default TargetStatus;
