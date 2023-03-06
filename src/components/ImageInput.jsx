import React, { useRef } from 'react';

import '../styles/ImageInput.css';

function ImageInput({ id, setImgFile, SVGComponent }) {
  const imgInputRef = useRef();

  return (
    <label htmlFor={id} id="image-input">
      <SVGComponent
        alt="Upload button"
        title="Upload image button"
        fill={imgInputRef.current && imgInputRef.current.value ? '#00f2cd' : '#cfcfcf'}
      />
      <p>{imgInputRef.current && imgInputRef.current.value ? imgInputRef.current.files[0].name : 'No image uploaded.'}</p>
      <input
        ref={imgInputRef}
        type="file"
        id={id}
        accept="image/*"
        multiple={false}
        required
        onChange={(e) => setImgFile(e.target.files[0])}
      />
    </label>
  );
}

export default ImageInput;
