import React, { useState, useEffect, useRef } from 'react';

import LevelImagePreview from '../components/LevelImagePreview';

function CreateLevelPage() {
  const [imgFile, setImgFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [targetImgFile, setTargetImgFile] = useState(null);
  const [targets, setTargets] = useState([]);
  const [xRange, setXRange] = useState([0, 0]);
  const [yRange, setYRange] = useState([0, 0]);

  const targetNameRef = useRef();

  useEffect(() => {
    if (!imgFile) {
      setPreview(undefined);
      return () => {};
    }

    const imgUrl = URL.createObjectURL(imgFile);
    setPreview(imgUrl);

    return () => URL.revokeObjectURL(imgUrl);
  }, [imgFile]);

  return (
    <main className="create-level-page">
      <form>
        <label htmlFor="level-title">
          Title
          <input type="text" id="level-title" required />
        </label>
        <label htmlFor="level-image">
          Image
          <input
            type="file"
            id="level-image"
            accept="image/*"
            multiple={false}
            required
            onChange={(e) => setImgFile(e.target.files[0])}
          />
        </label>
      </form>
      {preview ? (
        <div>
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
                console.log(targets);
                setTargets((prevTarget) => [...prevTarget, {
                  name: targetNameRef.current.value,
                  imgUrl: targetImgFile,
                  xRange,
                  yRange,
                }]);
              }}
            >
              Add
            </button>
          </form>
          <LevelImagePreview
            imgUrl={preview}
            setXRange={setXRange}
            setYRange={setYRange}
          />
        </div>
      )
        : null}
    </main>
  );
}

export default CreateLevelPage;
