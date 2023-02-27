import React, { useRef, useState } from 'react';

import useImagePreview from '../utils/hooks';

function AddTargetForm({
  xRange,
  yRange,
  setXRange,
  setYRange,
  setTargets,
}) {
  const targetNameRef = useRef();
  const targetImgFileRef = useRef();

  const [targetImgFile, setTargetImgFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useImagePreview(targetImgFile, setPreview);

  const isSubmissionValid = () => (
    targetNameRef.current.value !== ''
      && targetImgFileRef.current.files.length === 1
      && (xRange.some((x) => x !== 0) && yRange.some((y) => y !== 0))
  );

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
      <p>{`x(${xRange.join(', ')})`}</p>
      <p>{`y(${yRange.join(', ')})`}</p>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();

          if (isSubmissionValid()) {
            setTargets((prevTarget) => [...prevTarget, {
              name: targetNameRef.current.value,
              img: preview,
              xRange,
              yRange,
            }]);

            targetNameRef.current.value = '';
            targetImgFileRef.current.value = '';
            setXRange([0, 0]);
            setYRange([0, 0]);
          }
        }}
      >
        Add
      </button>
    </form>
  );
}

export default AddTargetForm;
