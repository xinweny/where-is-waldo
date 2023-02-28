import React, { useState, useRef } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';

import { useImagePreview } from '../utils/hooks';
import { db, storage } from '../utils/firebase-config';

import LevelForm from '../components/LevelForm';
import LevelImagePreview from '../components/LevelImagePreview';

function EditLevelPage() {
  const { level } = useLocation().state;

  const [title, setTitle] = useState(level.title);
  const [difficulty, setDifficulty] = useState(level.difficulty);
  const [imgFile, setImgFile] = useState(null);
  const [description, setDescription] = useState(level.description);
  const [preview, setPreview] = useState(level.imgUrl);
  const [targets, setTargets] = useState(level.targets);

  const id = useRef(level.id);

  useImagePreview(imgFile, setPreview);
  const navigate = useNavigate();

  const editLevel = async (e) => {
    e.preventDefault();

    if (title !== '' && targets.length > 0) {
      let imgUrl;

      if (imgFile) {
        const imgPath = `levels/${id.current}/${id.current}.${imgFile.name.split('.').pop()}`;

        const levelImgRef = ref(storage, imgPath);

        await uploadBytes(levelImgRef, imgFile);
        imgUrl = await getDownloadURL(levelImgRef);
      }

      await updateDoc(doc(db, 'levels', id.current), {
        title,
        difficulty,
        imgUrl: imgUrl || preview,
        description,
        targets,
        createdAt: level.createdAt,
        updatedAt: Timestamp.now(),
      });

      navigate('/');
    }
  };

  return (
    <main className="edit-level-page">
      <LevelForm
        title={title}
        setTitle={setTitle}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        description={description}
        setDescription={setDescription}
        setImgFile={setImgFile}
      />
      <div>
        <LevelImagePreview
          imgUrl={preview}
          targets={targets}
          setTargets={setTargets}
          levelId={id.current}
        />
        <button
          type="submit"
          onClick={editLevel}
        >
          Edit
        </button>
      </div>
      <button type="submit">Delete</button>
    </main>
  );
}

export default EditLevelPage;
