import { useEffect } from 'react';

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

      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setter(data);
    };

    fetchDocs();

    return () => new AbortController().abort();
  }, deps);
};

export {
  useImagePreview,
  useWindowResize,
  useFetchDocs,
};
