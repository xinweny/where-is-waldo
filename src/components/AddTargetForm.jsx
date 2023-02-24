import React, { useRef, useState } from 'react';

import useImagePreview from '../hooks';

function AddTargetForm({ xRange, yRange, handleSubmit }) {
  const targetNameRef = useRef();

  const [targetImgFile, setTargetImgFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useImagePreview(targetImgFile, setPreview);

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
          accept="image/*"
          multiple={false}
          required
          onChange={(e) => setTargetImgFile(e.target.files[0])}
        />
      </label>
      <p>{`x(${xRange})`}</p>
      <p>{`y(${yRange})`}</p>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit((prevTarget) => [...prevTarget, {
            name: targetNameRef.current.value,
            img: preview,
            xRange,
            yRange,
          }]);
        }}
      >
        Add
      </button>
    </form>
  );
}

export default AddTargetForm;
