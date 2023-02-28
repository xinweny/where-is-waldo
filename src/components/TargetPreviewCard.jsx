import React from 'react';
import { ref, deleteObject } from 'firebase/storage';

import { storage } from '../utils/firebase-config';

function TargetPreviewCard({
  target,
  setTargets,
  levelId,
}) {
  return (
    <div>
      <div>
        <p>{target.name}</p>
        <img src={target.imgUrl} alt={target.name} />
        <p>{`x${target.xRange}`}</p>
        <p>{`y${target.yRange}`}</p>
      </div>
      <button
        type="button"
        onClick={async () => {
          setTargets((prevTargets) => prevTargets.filter((t) => t.id !== target.id));

          const imgUrl = `levels/${levelId}/targets/${target.id}.${target.imgUrl.split('.').pop().split('?')[0]}`;
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
