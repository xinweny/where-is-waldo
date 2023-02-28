import React, { useRef, useState } from 'react';
import uniqid from 'uniqid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { storage } from '../utils/firebase-config';

function TargetForm({
  xRange,
  yRange,
  setStartPos, setEndPos,
  setTargets,
  levelId,
}) {
  const targetNameRef = useRef();
  const targetImgFileRef = useRef();

  const [targetImgFile, setTargetImgFile] = useState(null);

  const isSubmissionValid = () => (
    targetNameRef.current.value !== ''
      && targetImgFileRef.current.files.length === 1
      && xRange.some((x) => x !== 0)
      && yRange.some((y) => y !== 0)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmissionValid()) {
      const id = uniqid();
      const imgPath = `levels/${levelId}/targets/${id}.${targetImgFile.name.split('.').pop()}`;

      const targetImgRef = ref(storage, imgPath);

      await uploadBytes(targetImgRef, targetImgFile);
      const targetImgUrl = await getDownloadURL(targetImgRef);

      setTargets((prevTarget) => [...prevTarget, {
        id,
        name: targetNameRef.current.value,
        imgUrl: targetImgUrl,
        xRange,
        yRange,
      }]);

      targetNameRef.current.value = '';
      targetImgFileRef.current.value = '';

      setStartPos([0, 0]);
      setEndPos([0, 0]);
    }
  };

  return (
    <form>
      <label htmlFor="target-name">
        Target name
        <input type="text" id="target-name" ref={targetNameRef} />
      </label>
      <label htmlFor="target-image">
        Target Image
        <input
          type="file"
          id="target-image"
          ref={targetImgFileRef}
          accept="image/*"
          multiple={false}
          required
          onChange={(e) => setTargetImgFile(e.target.files[0])}
        />
      </label>
      <div>
        <p>{`x(${xRange.join(', ')})`}</p>
        <p>{`y(${yRange.join(', ')})`}</p>
      </div>
      <button type="submit" onClick={handleSubmit}>Add</button>
    </form>
  );
}

export default TargetForm;
