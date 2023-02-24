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

export default useImagePreview;
