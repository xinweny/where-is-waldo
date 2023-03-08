import React, { useRef, useState } from 'react';
import uniqid from 'uniqid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { storage } from '../utils/firebase-config';

import ImageInput from './ImageInput';

import { ReactComponent as TargetImgUploadSVG } from '../assets/avatar-upload.svg';

import '../styles/TargetForm.css';

function TargetForm({
  xRange,
  yRange,
  setStartPos, setEndPos,
  setTargets,
  levelId,
}) {
  const targetNameRef = useRef();
  const targetImgFileRef = useRef();

  const [targetImgFile, setTargetImgFile] = useState('');

  const isSubmissionValid = () => (
    targetNameRef.current.value !== ''
      && targetImgFile
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
    <form className="target-form">
      <section>
        <label htmlFor="target-name">
          <p>Target Name</p>
          <input type="text" id="target-name" ref={targetNameRef} />
        </label>
        <div className="coords-preview">
          <p>{`x(${xRange.join(', ')})`}</p>
          <p>{`y(${yRange.join(', ')})`}</p>
        </div>
        <ImageInput id="target-image" ref={targetImgFileRef} setImgFile={setTargetImgFile} SVGComponent={TargetImgUploadSVG} />
      </section>
      <button className="add-target-btn" type="submit" onClick={handleSubmit}>Add</button>
    </form>
  );
}

export default TargetForm;
