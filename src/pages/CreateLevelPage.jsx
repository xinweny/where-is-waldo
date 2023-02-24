import React, { useState } from 'react';
import uniqid from 'uniqid';

import useImagePreview from '../hooks';

import LevelPreCreateForm from '../components/LevelPreCreateForm';
import AddTargetForm from '../components/AddTargetForm';
import LevelImagePreview from '../components/LevelImagePreview';
import TargetPreviewCard from '../components/TargetPreviewCard';

function CreateLevelPage() {
  const [imgFile, setImgFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [targets, setTargets] = useState([]);
  const [xRange, setXRange] = useState([0, 0]);
  const [yRange, setYRange] = useState([0, 0]);

  useImagePreview(imgFile, setPreview);

  return (
    <main className="create-level-page">
      <div>
        <LevelPreCreateForm handleChange={setImgFile} />
        <div>
          <h3>Targets</h3>
          {targets.map((target) => <TargetPreviewCard key={uniqid()} target={target} />)}
        </div>
      </div>
      {preview ? (
        <div>
          <AddTargetForm xRange={xRange} yRange={yRange} handleSubmit={setTargets} />
          <LevelImagePreview
            imgUrl={preview}
            setXRange={setXRange}
            setYRange={setYRange}
          />
          <button type="submit">Create Level</button>
        </div>
      )
        : null}
    </main>
  );
}

export default CreateLevelPage;
