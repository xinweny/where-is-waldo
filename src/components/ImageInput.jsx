import React from 'react';

import '../styles/ImageInput.css';

const ImageInput = React.forwardRef(({
  id,
  setImgFile,
  SVGComponent,
}, ref) => (
  <label htmlFor={id} id="image-input">
    <SVGComponent
      alt="Upload button"
      title="Upload image button"
      fill={ref.current && ref.current.value ? '#00f2cd' : '#cfcfcf'}
    />
    <p>{ref.current && ref.current.value ? ref.current.files[0].name : 'Image required.'}</p>
    <input
      ref={ref}
      type="file"
      id={id}
      accept="image/*"
      multiple={false}
      required
      onChange={(e) => setImgFile(e.target.files[0])}
    />
  </label>
));

export default ImageInput;
