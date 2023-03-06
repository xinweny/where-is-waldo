import React from 'react';
import { ref, deleteObject } from 'firebase/storage';

import { storage } from '../utils/firebase-config';

import '../styles/TargetPreviewCard.css';

function TargetPreviewCard({
  target,
  setTargets,
}) {
  return (
    <div className="pos-relative">
      <div className="target-preview">
        <p>{target.name}</p>
        <img src={target.imgUrl} alt={target.name} />
        <p>{`x(${target.xRange.join(', ')})`}</p>
        <p>{`y(${target.yRange.join(', ')})`}</p>
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
