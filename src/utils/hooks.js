import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { ref, listAll, deleteObject } from 'firebase/storage';

import { db, storage } from './firebase-config';

const useImagePreview = (imgFile, setPreview) => {
  useEffect(() => {
    if (!imgFile) return () => {};

    const imgUrl = URL.createObjectURL(imgFile);
    setPreview(imgUrl);

    return () => URL.revokeObjectURL(imgUrl);
  }, [imgFile]);
};

const useWindowResize = (imgRef, sizeRef, setScale) => {
  useEffect(() => {
    const handleResize = () => {
      const newSize = [imgRef.current.offsetWidth, imgRef.current.offsetHeight];

      setScale([
        newSize[0] / sizeRef.current[0],
        newSize[1] / sizeRef.current[1],
      ]);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
};

const useFetchDocs = (getter, setter, deps) => {
  useEffect(() => {
    const fetchDocs = async () => {
      const snapshot = await getter();

      const data = [];

      snapshot.forEach((d) => {
        data.push({ id: d.id, ...d.data() });
      });

      setter(data);
    };

    fetchDocs();

    return () => new AbortController().abort();
  }, deps);
};

const useCleanupTargetImgs = (levelId) => {
  useEffect(() => async () => {
    const levelSnap = await getDoc(doc(db, 'levels', levelId));
    const targetImgRefs = (await listAll(ref(storage, `/levels/${levelId}/targets`))).items;

    if (levelSnap.exists()) {
      const targetIds = levelSnap.data().targets.map((t) => t.id);

      const refsToDelete = targetImgRefs.filter((r) => !targetIds.includes(r.name.split('.')[0]));
      if (refsToDelete.length > 0) refsToDelete.forEach(async (r) => deleteObject(r));
    } else if (targetImgRefs.length > 0) {
      targetImgRefs.forEach(async (r) => deleteObject(r));
    }
  }, []);
};

export {
  useImagePreview,
  useWindowResize,
  useFetchDocs,
  useCleanupTargetImgs,
};
