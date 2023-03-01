import React, { useState } from 'react';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import {
  doc,
  updateDoc,
  Timestamp,
  deleteDoc,
} from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';

import { useImagePreview } from '../utils/hooks';
import { db, storage } from '../utils/firebase-config';

import LevelForm from '../components/LevelForm';
import LevelImagePreview from '../components/LevelImagePreview';
import WarningModal from '../components/WarningModal';

function EditLevelPage() {
  const { level } = useLocation().state;

  const [title, setTitle] = useState(level.title);
  const [difficulty, setDifficulty] = useState(level.difficulty);
  const [imgFile, setImgFile] = useState(null);
  const [description, setDescription] = useState(level.description);
  const [preview, setPreview] = useState(level.imgUrl);
  const [targets, setTargets] = useState(level.targets);
  const [showWarningModal, setShowWarningModal] = useState(false);

  useImagePreview(imgFile, setPreview);
  const navigate = useNavigate();

  const editLevel = async (e) => {
    e.preventDefault();

    if (title !== '' && targets.length > 0) {
      let imgUrl;

      if (imgFile) {
        const imgPath = `levels/${level.id}/${level.id}.${imgFile.name.split('.').pop()}`;

        const levelImgRef = ref(storage, imgPath);

        await uploadBytes(levelImgRef, imgFile);
        imgUrl = await getDownloadURL(levelImgRef);
      }

      await updateDoc(doc(db, 'levels', level.id), {
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

  const deleteLevel = async (e) => {
    e.preventDefault();

    await Promise.all(targets.map(async (target) => {
      const imgRef = ref(storage, target.imgUrl.split('?')[0]);
      await deleteObject(imgRef);
    }));

    await deleteObject(ref(storage, level.imgUrl.split('?')[0]));

    await deleteDoc(doc(db, 'levels', level.id));

    navigate('/');
  };

  return (
    <main className="edit-level-page">
      <div style={(showWarningModal) ? {
        opacity: '50%',
        pointerEvents: 'none',
      } : {
        opacity: '100%',
        pointerEvents: 'auto',
      }}
      >
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
            levelId={level.id}
          />
          <button
            type="submit"
            onClick={editLevel}
          >
            Edit
          </button>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setShowWarningModal(true);
          }}
        >
          Delete
        </button>
      </div>
      {(showWarningModal) ? (
        <WarningModal
          setShow={setShowWarningModal}
          header={`Delete level ${level.title}?`}
          message="WARNING: This action cannot be reversed."
          action={deleteLevel}
        />
      ) : null}
    </main>
  );
}

export default EditLevelPage;
