import React, { useRef, useState } from 'react';
import uniqid from 'uniqid';

import { useImagePreview } from '../utils/hooks';

function AddTargetForm({
  xRange,
  yRange,
  setStartPos, setEndPos,
  setTargets,
  levelId,
}) {
  const targetNameRef = useRef();
  const targetImgFileRef = useRef();

  const [targetImgFile, setTargetImgFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useImagePreview(targetImgFile, setPreview);

  const isSubmissionValid = () => (
    targetNameRef.current.value !== ''
      && targetImgFileRef.current.files.length === 1
      && xRange.some((x) => x !== 0)
      && yRange.some((y) => y !== 0)
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmissionValid()) {
      setTargets((prevTarget) => {
        const id = uniqid();
        const imgPath = `levels/${levelId}/targets/${id}.${targetImgFile.name.split('.').pop()}`;

        return [...prevTarget, {
          id,
          name: targetNameRef.current.value,
          imgFile: targetImgFile,
          imgPath,
          preview,
          xRange,
          yRange,
        }];
      });

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

export default AddTargetForm;
