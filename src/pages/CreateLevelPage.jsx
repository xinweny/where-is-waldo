import React, { useState, useRef } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import uniqid from 'uniqid';
import { useNavigate } from 'react-router-dom';

import useImagePreview from '../utils/hooks';
import { db, storage } from '../utils/firebase-config';

import LevelPreCreateForm from '../components/LevelPreCreateForm';
import AddTargetForm from '../components/AddTargetForm';
import LevelImagePreview from '../components/LevelImagePreview';
import TargetPreviewCard from '../components/TargetPreviewCard';

function CreateLevelPage() {
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [imgFile, setImgFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [targets, setTargets] = useState([]);
  const [xRange, setXRange] = useState([0, 0]);
  const [yRange, setYRange] = useState([0, 0]);

  const id = useRef(uniqid());

  useImagePreview(imgFile, setPreview);
  const navigate = useNavigate();

  const deleteTarget = (targetId) => {
    setTargets((prevTargets) => prevTargets.filter((target) => target.id !== targetId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title !== '' && targets.length > 0) {
      const imgUrl = `levels/${id.current}/${id.current}.${imgFile.name.split('.').pop()}`;

      const levelImgRef = ref(storage, imgUrl);

      await uploadBytes(levelImgRef, imgFile);

      await Promise.all(
        targets.map(async (target) => {
          const targetImgRef = ref(storage, target.imgUrl);

          return uploadBytes(targetImgRef, target.imgFile);
        }),
      );

      const fTargets = targets.map((target) => ({
        id: target.id,
        name: target.name,
        imgUrl: target.imgUrl,
        xRange: target.xRange,
        yRange: target.yRange,
      }));

      await setDoc(doc(db, 'levels', id.current), {
        title,
        difficulty,
        imgUrl,
        targets: fTargets,
      });

      navigate('/');
    }
  };

  return (
    <main className="create-level-page">
      <div>
        <LevelPreCreateForm
          setTitle={setTitle}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          setImgFile={setImgFile}
        />
        <div>
          <h3>Targets</h3>
          {targets.map((target) => (
            <TargetPreviewCard
              key={target.id}
              target={target}
              handleDelete={deleteTarget}
            />
          ))}
        </div>
      </div>
      {preview ? (
        <div>
          <AddTargetForm
            xRange={xRange}
            yRange={yRange}
            setXRange={setXRange}
            setYRange={setYRange}
            setTargets={setTargets}
            levelId={id.current}
          />
          <LevelImagePreview
            imgUrl={preview}
            xRange={xRange}
            yRange={yRange}
            setXRange={setXRange}
            setYRange={setYRange}
          />
          <button
            type="submit"
            onClick={handleSubmit}
          >
            Create Level
          </button>
        </div>
      )
        : null}
    </main>
  );
}

export default CreateLevelPage;
