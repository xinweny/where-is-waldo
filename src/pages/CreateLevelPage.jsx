import React, { useState, useRef } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import uniqid from 'uniqid';
import { useNavigate } from 'react-router-dom';

import { useImagePreview, useCleanupTargetImgs } from '../utils/hooks';
import { db, storage } from '../utils/firebase-config';

import LevelForm from '../components/LevelForm';
import LevelEditor from '../components/LevelEditor';

function CreateLevelPage() {
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [imgFile, setImgFile] = useState(null);
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState(null);
  const [targets, setTargets] = useState([]);

  const id = useRef(uniqid());

  useImagePreview(imgFile, setPreview);

  const navigate = useNavigate();

  useCleanupTargetImgs(id.current);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title !== '' && targets.length > 0) {
      const imgPath = `levels/${id.current}/${id.current}.${imgFile.name.split('.').pop()}`;

      const levelImgRef = ref(storage, imgPath);

      await uploadBytes(levelImgRef, imgFile);
      const imgUrl = await getDownloadURL(levelImgRef);

      await setDoc(doc(db, 'levels', id.current), {
        title,
        difficulty,
        imgUrl,
        description: description.replace('/\n/g', '\\n'),
        targets,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      navigate('/');
    }
  };

  return (
    <main className="create-level-page">
      <LevelForm
        title={title}
        setTitle={setTitle}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        description={description}
        setDescription={setDescription}
        imgFile={imgFile}
        setImgFile={setImgFile}
      />
      {preview ? (
        <div>
          <LevelEditor
            imgUrl={preview}
            targets={targets}
            setTargets={setTargets}
            levelId={id.current}
          />
          <button type="submit" onClick={handleSubmit}>
            Create
          </button>
        </div>
      )
        : null}
    </main>
  );
}

export default CreateLevelPage;
