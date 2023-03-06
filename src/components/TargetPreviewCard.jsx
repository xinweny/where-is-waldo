import React from 'react';
import { ref, deleteObject } from 'firebase/storage';

import { storage } from '../utils/firebase-config';

import '../styles/TargetPreviewCard.css';

function TargetPreviewCard({
  target,
  setTargets,
}) {
  return (
    <div className="target-preview-card">
      <div className="target-preview">
        <div className="target-img-container">
          <img
            src={target.imgUrl}
            alt={target.name}
            title={`x(${target.xRange.join(', ')}) y(${target.yRange.join(', ')})`}
          />
        </div>
        <p>{target.name}</p>
      </div>
      <button
        type="button"
        onClick={async () => {
          setTargets((prevTargets) => prevTargets.filter((t) => t.id !== target.id));

          const imgUrl = target.imgUrl.split('?')[0];
          const imgRef = ref(storage, imgUrl);

          await deleteObject(imgRef);
        }}
      >
        x
      </button>
    </div>
  );
}

export default TargetPreviewCard;
