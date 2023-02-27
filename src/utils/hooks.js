import { useEffect } from 'react';

const useImagePreview = (imgFile, setPreview) => {
  useEffect(() => {
    if (!imgFile) {
      setPreview(null);
      return () => {};
    }

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

export {
  useImagePreview,
  useWindowResize,
};
